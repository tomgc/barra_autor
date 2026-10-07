// Mi Barra de Autor · capa de UI y eventos (F1).
// La lógica vive en js/ (motores puros); este archivo solo arma vistas y conecta eventos.

import { INGREDIENTS, INGREDIENT_CATEGORIES } from "./data/ingredients.js";
import { RECIPES } from "./data/recipes.js";
import { COLLECTIONS, PROFILE_TAGS } from "./data/collections.js";
import { DEMO_USER_STATE } from "./data/demo-user-state.js";
import { indexById, clone } from "./js/util.js";
import { formatAmount } from "./js/units.js";
import { evaluateAll, evaluateRecipe, filterByAvailability, initialInventory, MATCH, applyAlternatives } from "./js/engine/matching.js";
import { compareSpecs, defaultComparison, FACT_LABELS } from "./js/engine/compare.js";
import { estimateAbv, estimateCost, dilutionLevel, DILUTION_SOURCE } from "./js/engine/estimates.js";
import { similarRecipes, whatToDrink, shoppingSuggestions, daySeed } from "./js/engine/discovery.js";
import { newDraft, duplicateDraft, validateDraft, draftToRecipe, suggestVariantName, UNITS, ROLES, METHODS, ICE_SERVES } from "./js/lab.js";
import { scaleRecipe, SERVING_OPTIONS } from "./js/engine/scaling.js";
import { searchRecipes, filterByProfile } from "./js/engine/search.js";
import { emptyState, loadState, saveState, resetState } from "./js/storage.js";
import { exportBackup, backupFileName, validateBackup, applyImport } from "./js/backup.js";
import { createHistoryEntry, historyForRecipe, recentHistory, sessionRatingAverage } from "./js/history.js";
import { Timer } from "./js/timer.js";
import { adjustRecipe, noEffectNotes, INTENSITY_LEVELS, BALANCE_LEVELS } from "./js/engine/adjust.js";
import { practicalAmount } from "./js/units.js";

// ───────── STATE ─────────

const TAG_NAMES = {
  ...Object.fromEntries([...PROFILE_TAGS.structure, ...PROFILE_TAGS.flavor].map((t) => [t.id, t.name])),
  stirred: "Stirred",
  shaken: "Shaken"
};
const BASE_LABELS = { gin: "Gin", vodka: "Vodka", whiskey: "Whiskey", pisco: "Pisco", rum: "Ron", vermouth: "Vermut", wine: "Vino" };
const baseLabel = (b) => BASE_LABELS[b] ?? b ?? "";
const SOURCE_LABELS = { classic: "Clásico", riff: "Riff", author: "Autor", personal: "Personal" };
const METHOD_LABELS = { stir: "Revolver (stir)", shake: "Agitar (shake)", build: "Construir en vaso (build)" };
const ICE_LABELS = { none: "Sin hielo", rocks: "Rocas", cubes: "Cubos", "large-cube": "Cubo grande", crushed: "Picado" };
const DILUTION_LABELS = { low: "Baja", medium: "Media", high: "Alta" };
const STATUS_LABELS = { pending: "Por probar", tested: "Probado" };
const AVAIL_FILTERS = [
  { id: "now", label: "Puedo hacerlo" },
  { id: "missing1", label: "Me falta 1" },
  { id: "missing2", label: "Me faltan 2" },
  { id: "all", label: "Todo" }
];
const INV_STATUSES = [
  { id: "available", label: "Hay" },
  { id: "low", label: "Poco" },
  { id: "out", label: "No" }
];

const catalog = { ingredients: INGREDIENTS, recipes: RECIPES };
const collectionsById = indexById(COLLECTIONS);

const app = {
  state: null,
  storageMode: "local",
  ui: { query: "", pendingImport: null, confirmReset: false, bar: null, adjust: {}, confirmDelete: null, labErrors: [], todayProfile: [], todayOffset: 0, todaySeen: [], showPrices: false }
};

// Ajustes de intensidad y dulce/seco por receta (efímeros: la spec original nunca cambia).
function adjustmentsFor(recipeId) {
  return app.ui.adjust[recipeId] ?? { intensity: "standard", balance: "balance" };
}
// Receta lista para preparar: aplica alternativas con cantidad propia (p. ej. terrón → jarabe) y luego los ajustes.
function adjusted(recipe, evaluation) {
  return adjustRecipe(applyAlternatives(recipe, evaluation), ingredientsById(), adjustmentsFor(recipe.id));
}

function adjustControls(recipe, result) {
  const a = result.adjustments;
  const seg = (levels, kind, current, label) => `
    <div class="segmented adj" role="group" aria-label="${label}">
      ${levels.map((lv) => `<button data-action="adjust" data-kind="${kind}" data-id="${esc(recipe.id)}" data-value="${lv.id}" aria-pressed="${current === lv.id}">${lv.label}</button>`).join("")}
    </div>`;
  const notes = noEffectNotes(result);
  const isAdjusted = result.changes.length > 0;
  return `
    <div class="adj-controls">
      ${seg(INTENSITY_LEVELS, "intensity", a.intensity, "Intensidad")}
      ${seg(BALANCE_LEVELS, "balance", a.balance, "Dulce o seco")}
    </div>
    <p class="small ${isAdjusted ? "st-low" : "muted"}">${isAdjusted ? `Spec ajustado (${result.changes.length} ${result.changes.length === 1 ? "cambio" : "cambios"} sobre el original)` : "Spec original"}${notes.length ? ` · ${notes.join(" ")}` : ""}</p>`;
}

// Estado efímero del Modo Barra (no se persiste): receta, checklist y sesión en curso.
function barSession(recipeId) {
  if (app.ui.bar?.recipeId !== recipeId) app.ui.bar = { recipeId, checked: [], rating: 0, notes: "" };
  return app.ui.bar;
}

const timer = new Timer({
  onTick: (snap) => {
    const d = document.getElementById("timer-display");
    if (d) d.textContent = snap.label;
    const b = document.getElementById("timer-toggle");
    if (b) b.textContent = snap.running ? "Pausar" : "Iniciar";
  },
  onDone: () => {
    toast("Tiempo cumplido.");
    try { navigator.vibrate?.([200, 100, 200]); } catch { /* sin vibración */ }
    beep();
  }
});

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.value = 0.15;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    osc.onended = () => ctx.close();
  } catch { /* sin audio */ }
}

// Mantener la pantalla encendida en Modo Barra cuando el navegador lo permite.
let wakeLock = null;
async function setWakeLock(on) {
  try {
    if (on && !wakeLock && "wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => { wakeLock = null; });
    } else if (!on && wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  } catch { wakeLock = null; }
}

function defaults() {
  return { ...emptyState(), inventory: initialInventory(INGREDIENTS), userState: clone(DEMO_USER_STATE) };
}

function allIngredients() {
  return [...INGREDIENTS, ...(app.state.customIngredients ?? [])];
}
function ingredientsById() {
  return indexById(allIngredients());
}
function allRecipes() {
  return [...RECIPES, ...(app.state.recipes ?? [])];
}
function userEntry(recipeId) {
  return app.state.userState[recipeId] ?? { favorite: false, rating: 0, status: "pending", notes: "" };
}
function ingredientName(id) {
  return ingredientsById()[id]?.name ?? id;
}

function persist() {
  const r = saveState(app.state);
  app.storageMode = r.mode;
  if (!r.ok) toast(r.error);
}

function updateUser(recipeId, patch) {
  app.state.userState[recipeId] = { ...userEntry(recipeId), ...patch };
  persist();
}

// ───────── HELPERS DE VISTA ─────────

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let toastTimer;
function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.textContent = ""; }, 3500);
}

const STAR_ICON = (filled) => `<svg viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/></svg>`;

function availabilityText(ev) {
  if (ev.canMake && ev.usesSubstitutes) {
    return `<span class="st-sub">● Con sustitución: ${ev.substitutions.map((s) => `${esc(ingredientName(s.to))} por ${esc(ingredientName(s.from))}`).join(", ")}</span>`;
  }
  if (ev.canMake) {
    const low = ev.lowStock.length ? ` <span class="st-low">(queda poco: ${ev.lowStock.map((id) => esc(ingredientName(id))).join(", ")})</span>` : "";
    return `<span class="st-ok">● Puedes prepararlo</span>${low}`;
  }
  return `<span class="st-miss">● Falta: ${ev.missingIngredients.map((id) => esc(ingredientName(id))).join(", ")}</span>`;
}

function recipeCard(recipe, ev) {
  const u = userEntry(recipe.id);
  const house = recipe.collections.includes("house");
  return `
    <a class="card recipe-card" href="#/receta/${esc(recipe.id)}">
      <span class="title">${esc(recipe.name)}${u.favorite ? ` <span class="st-low" aria-label="Favorito">★</span>` : ""}</span>
      <span class="badge${house ? " house" : ""}">${esc(SOURCE_LABELS[recipe.source] ?? recipe.source)}</span>
      <span class="meta">${esc(recipe.family ?? "")} · ${esc(baseLabel(recipe.baseSpirit))}${u.status === "tested" ? " · Probado" : ""}${u.rating ? ` · ${"★".repeat(u.rating)}` : ""}</span>
      <span class="avail">${availabilityText(ev)}</span>
    </a>`;
}

function storageBanner() {
  return app.storageMode === "memory"
    ? `<p class="banner" role="alert">El navegador no permite guardar datos (¿modo privado?). Los cambios se perderán al cerrar; exporta un respaldo antes de salir.</p>`
    : "";
}

// ───────── VISTAS ─────────

function viewHome() {
  const evs = evaluateAll(allRecipes(), app.state.inventory, ingredientsById());
  const byId = indexById(allRecipes());
  const now = filterByAvailability(evs, "now");
  const one = filterByAvailability(evs, "missing1");
  const favs = allRecipes().filter((r) => userEntry(r.id).favorite);
  const pending = allRecipes().filter((r) => userEntry(r.id).status !== "tested");
  const availableIngredients = Object.values(app.state.inventory).filter((i) => i.status !== "out").length;
  const evById = Object.fromEntries(evs.map((e) => [e.recipeId, e]));
  const today = whatToDrink({
    recipes: allRecipes(), inventory: app.state.inventory, ingredientsById: ingredientsById(),
    userState: app.state.userState, history: app.state.history, profile: app.ui.todayProfile,
    seed: daySeed(new Date(), app.ui.todayOffset), exclude: app.ui.todaySeen
  });
  app.ui.todayShown = today.map((x) => x.recipe.id);
  const newToTry = allRecipes().filter((r) => userEntry(r.id).status !== "tested" && evById[r.id]?.canMake).slice(0, 3);
  const topBuy = shoppingSuggestions(allRecipes(), app.state.inventory, ingredientsById(), allIngredients().map((i) => i.id)).find((x) => x.unlocks.length);
  const todayTags = ["spirit-forward", "sour", "highball", "low-abv", "bitter", "citrus", "dry", "sweet"];
  return `
    ${storageBanner()}
    <h2 class="visually-hidden">Inicio</h2>

    <section class="card today" aria-labelledby="today-title">
      <h3 id="today-title" style="margin-top:0">¿Qué tomo hoy?</h3>
      <div class="chips" role="group" aria-label="Perfil de hoy">
        ${todayTags.map((t) => `<button class="chip" data-action="today-tag" data-value="${t}" aria-pressed="${app.ui.todayProfile.includes(t)}">${esc(TAG_NAMES[t])}</button>`).join("")}
      </div>
      ${today.length
        ? `<ol class="today-list">${today.map((x) => `<li><a href="#/receta/${esc(x.recipe.id)}">${esc(x.recipe.name)}</a>${x.reasons.length ? ` <span class="muted small">${esc(x.reasons.join(" · "))}</span>` : ""}</li>`).join("")}</ol>`
        : `<p class="muted small">${app.ui.todaySeen.length ? "Ya viste todas las opciones disponibles." : "Nada disponible con ese perfil. Quita un filtro o revisa tu barra."}</p>`}
      <div class="btn-row">
        <button class="btn" data-action="today-next"${today.length ? "" : " disabled"}>Otra sugerencia</button>
        ${app.ui.todaySeen.length ? `<button class="btn" data-action="today-reset">Volver a empezar</button>` : ""}
      </div>
    </section>
    <div class="stats">
      <a class="stat" href="#/inventario"><div class="n">${availableIngredients}</div><div class="l">Ingredientes en tu barra</div></a>
      <a class="stat" href="#/recetas?f=now"><div class="n">${now.length}</div><div class="l">Cócteles disponibles ahora</div></a>
      <a class="stat" href="#/recetas?f=missing1"><div class="n">${one.length}</div><div class="l">A 1 ingrediente</div></a>
      <div class="stat"><div class="n">${pending.length}</div><div class="l">Por probar</div></div>
      <div class="stat"><div class="n">${favs.length}</div><div class="l">Favoritos</div></div>
    </div>

    <h3>Tus favoritos</h3>
    ${favs.length ? `<div class="recipe-grid">${favs.map((r) => recipeCard(r, evById[r.id])).join("")}</div>` : `<p class="muted">Marca recetas con ★ para verlas aquí.</p>`}

    <h3>Últimas preparaciones</h3>
    ${app.state.history.length ? historyBlock(recentHistory(app.state.history, 5), null) : `<p class="muted">Registra lo que preparas desde el Modo Barra.</p>`}

    <h3>Te falta poco</h3>
    ${one.length ? `<div class="recipe-grid">${one.map((e) => recipeCard(byId[e.recipeId], e)).join("")}</div>` : `<p class="muted">Ninguna receta está a un solo ingrediente.</p>`}

    <h3>Nuevos para probar</h3>
    ${newToTry.length ? `<div class="recipe-grid">${newToTry.map((r) => recipeCard(r, evById[r.id])).join("")}</div>` : `<p class="muted">Ya probaste todo lo que puedes preparar hoy.</p>`}

    <h3>Ingrediente que más recetas desbloquea</h3>
    ${topBuy
      ? `<a class="card recipe-card" href="#/comprar"><span class="title">${esc(ingredientName(topBuy.ingredientId))}</span><span class="badge house">+${topBuy.unlocks.length}</span><span class="meta">${esc(topBuy.unlocks.map((id) => byId[id]?.name ?? id).join(", "))}</span></a>`
      : `<p class="muted">Ningún ingrediente suelto desbloquea recetas nuevas. <a href="#/comprar">Ver compras</a></p>`}
  `;
}

function viewRecipes(params) {
  const prefs = app.state.preferences;
  if (params.get("f")) prefs.availabilityFilter = params.get("f");
  const ingById = ingredientsById();
  const ctx = { ingredientsById: ingById, collectionsById, tagNames: TAG_NAMES };
  let list = searchRecipes(allRecipes(), app.ui.query, ctx);
  list = filterByProfile(list, prefs.profileFilter);
  const evs = evaluateAll(list, app.state.inventory, ingById);
  const evById = Object.fromEntries(evs.map((e) => [e.recipeId, e]));
  const shown = filterByAvailability(evs, prefs.availabilityFilter)
    .map((e) => list.find((r) => r.id === e.recipeId))
    .sort((a, b) => evById[a.id].missingCount - evById[b.id].missingCount || a.name.localeCompare(b.name, "es"));
  const allTags = [...PROFILE_TAGS.structure, { id: "stirred", name: "Stirred" }, { id: "shaken", name: "Shaken" }, ...PROFILE_TAGS.flavor];
  const activeTags = prefs.profileFilter.length;
  return `
    ${storageBanner()}
    <h2>Recetas</h2>
    <div class="toolbar">
      <label class="visually-hidden" for="q">Buscar recetas</label>
      <input id="q" class="search" type="search" placeholder="Buscar por nombre, ingrediente, colección…" value="${esc(app.ui.query)}" autocomplete="off" data-action="search">
      <div class="chips" role="group" aria-label="Disponibilidad">
        ${AVAIL_FILTERS.map((f) => `<button class="chip" data-action="avail" data-value="${f.id}" aria-pressed="${prefs.availabilityFilter === f.id}">${f.label}</button>`).join("")}
      </div>
      <details class="filters"${activeTags ? " open" : ""}>
        <summary>Perfil${activeTags ? ` (${activeTags})` : ""}</summary>
        <div class="chips" role="group" aria-label="Perfil">
          ${allTags.map((t) => `<button class="chip" data-action="tag" data-value="${t.id}" aria-pressed="${prefs.profileFilter.includes(t.id)}">${esc(t.name)}</button>`).join("")}
        </div>
      </details>
    </div>
    <p class="muted small" aria-live="polite">${shown.length} de ${allRecipes().length} recetas</p>
    <div class="recipe-grid">
      ${shown.length ? shown.map((r) => recipeCard(r, evById[r.id])).join("") : `<p class="empty">Sin resultados con estos filtros.</p>`}
    </div>
  `;
}

function viewRecipe(id) {
  const recipe = allRecipes().find((r) => r.id === id);
  if (!recipe) return `<p class="empty">No existe la receta “${esc(id)}”. <a href="#/recetas">Volver a recetas</a></p>`;
  const prefs = app.state.preferences;
  const u = userEntry(recipe.id);
  const ev = evaluateRecipe(recipe, app.state.inventory, ingredientsById());
  const lineById = Object.fromEntries(ev.lines.map((l, i) => [i, l]));
  const adj = adjusted(recipe, ev);
  const scaled = scaleRecipe(adj.recipe, prefs.servings, prefs.unit);
  const abvEst = estimateAbv(adj.recipe, ingredientsById());
  const cost = estimateCost(adj.recipe, app.state.inventory);
  const statusIcon = (l) => {
    if (l.match === MATCH.MISSING) return `<span class="st-miss" aria-label="Falta">✗</span>`;
    if (l.match === MATCH.SUBSTITUTE) return `<span class="st-sub" aria-label="Sustitución">⇄</span>`;
    if (l.low) return `<span class="st-low" aria-label="Queda poco">◐</span>`;
    return `<span class="st-ok" aria-label="Disponible">✓</span>`;
  };
  const ingRows = scaled.lines.map((l, i) => {
    const m = lineById[i];
    const notes = [
      l.top ? "Completar el vaso" : "",
      l.optional ? "Opcional" : "",
      l.note ?? "",
      l.replacedFrom
        ? `En vez de ${formatAmount(practicalAmount(l.replacedFrom.amount * scaled.servings, l.replacedFrom.unit, prefs.unit))} de ${ingredientName(l.replacedFrom.ingredientId)}${l.alternativeNote ? ` (${l.alternativeNote})` : ""}`
        : m.match === MATCH.SUBSTITUTE ? `Usarás ${ingredientName(m.usedId)}${m.substituteNote ? ` (${m.substituteNote})` : ""}` : "",
      l.scaled.approx ? `Exacto: ${formatAmount({ amount: Math.round(l.scaled.exact * 100) / 100, unit: l.scaled.unit }, { fractions: false })}` : "",
      l.originalAmount != null ? `Original: ${formatAmount(practicalAmount(l.originalAmount * scaled.servings, l.unit, prefs.unit))}` : ""
    ].filter(Boolean);
    return `<li${l.originalAmount != null ? ' class="changed"' : ""}>
      <span class="amt">${l.scaled.approx ? "≈ " : ""}${esc(formatAmount(l.scaled))}</span>
      <span>${esc(ingredientName(l.ingredientId))}</span>
      ${statusIcon(m)}
      ${notes.length ? `<span class="note">${esc(notes.join(" · "))}</span>` : ""}
    </li>`;
  }).join("");
  const ice = recipe.ice ?? {};
  const iceText = [ICE_LABELS[ice.serve] ?? ice.serve, ice.chilledGlass ? "copa helada" : "", ice.dryShake ? "dry shake previo" : ""].filter(Boolean).join(", ");
  const parent = recipe.parentId ? allRecipes().find((r) => r.id === recipe.parentId) : null;

  return `
    ${storageBanner()}
    <p><a href="#/recetas">← Recetas</a></p>
    <div class="recipe-head">
      <h2>${esc(recipe.name)}</h2>
      <button class="icon-btn" data-action="fav" data-id="${esc(recipe.id)}" aria-pressed="${u.favorite}" aria-label="${u.favorite ? "Quitar de favoritos" : "Marcar como favorito"}">${STAR_ICON(u.favorite)}</button>
    </div>
    <div class="chips" style="margin-bottom:8px">
      <span class="badge">${esc(SOURCE_LABELS[recipe.source] ?? recipe.source)}</span>
      ${recipe.family ? `<span class="badge">${esc(recipe.family)}</span>` : ""}
      ${recipe.baseSpirit ? `<span class="badge">${esc(baseLabel(recipe.baseSpirit))}</span>` : ""}
      <span class="badge">Dificultad ${esc(recipe.difficulty ?? "–")}/3</span>
      ${recipe.profile.map((t) => TAG_NAMES[t] ?? t).filter((name) => name !== recipe.family).map((name) => `<span class="badge">${esc(name)}</span>`).join("")}
    </div>
    <p class="small">${availabilityText(ev)}</p>

    <h3>Ingredientes</h3>
    <div class="toolbar-row" style="margin-bottom:8px">
      <div class="segmented" role="group" aria-label="Unidad">
        ${["ml", "oz"].map((un) => `<button data-action="unit" data-value="${un}" aria-pressed="${prefs.unit === un}">${un}</button>`).join("")}
      </div>
      <label class="visually-hidden" for="servings">Porciones</label>
      <select id="servings" data-action="servings" style="width:auto">
        ${SERVING_OPTIONS.map((n) => `<option value="${n}"${n === prefs.servings ? " selected" : ""}>${n} ${n === 1 ? "porción" : "porciones"}</option>`).join("")}
      </select>
    </div>
    ${adjustControls(recipe, adj)}
    <div class="card"><ul class="ing-list">${ingRows}</ul></div>
    ${scaled.preparation.text ? `<p class="banner">${esc(scaled.preparation.text)}</p>` : ""}
    <p><a class="btn primary" href="#/barra/${esc(recipe.id)}" style="width:100%">Preparar en Modo Barra</a></p>

    <h3>Preparación</h3>
    <div class="card">
      <dl class="facts">
        <dt>Método</dt><dd>${esc(METHOD_LABELS[recipe.method] ?? recipe.method)}</dd>
        <dt>Hielo</dt><dd>${esc(iceText || "–")}</dd>
        <dt>Cristalería</dt><dd>${esc(recipe.glass ?? "–")}</dd>
        <dt>Garnish</dt><dd>${esc(recipe.garnish ?? "–")}</dd>
        ${abvEst ? `<dt>ABV estimado</dt><dd>≈ ${String(abvEst.abv).replace(".", ",")} %${abvEst.missingAbv.length ? ` <span class="muted small">(sin graduación: ${esc(abvEst.missingAbv.map(ingredientName).join(", "))})</span>` : ""}</dd>
        <dt>Dilución</dt><dd>${DILUTION_LABELS[dilutionLevel(abvEst.dilution.rate)]}, ≈ ${Math.round(abvEst.dilution.rate * 100)} % de agua${abvEst.dilution.assumed ? " (supuesto)" : ""} · ≈ ${abvEst.volumeMl} ml servido</dd>` : ""}
        ${cost.total != null ? `<dt>Costo</dt><dd>≈ $${cost.total.toLocaleString("es-CL")}${cost.complete ? "" : ` <span class="muted small">(parcial: falta precio de ${esc(cost.missingPrices.map(ingredientName).join(", "))})</span>`}</dd>` : ""}
      </dl>
      <p class="muted small" style="margin:8px 0 0">Estimaciones por porción, no mediciones. Dilución según método: ${esc(DILUTION_SOURCE)}</p>
    </div>

    ${recipe.specNote || recipe.origin || parent || recipe.references?.length ? `
    <h3>Sobre la spec</h3>
    <div class="card small">
      ${recipe.specNote ? `<p>${esc(recipe.specNote)}</p>` : ""}
      ${recipe.origin?.text ? `<p class="muted">Origen: ${esc(recipe.origin.text)}</p>` : ""}
      ${parent ? `<p>Variación de <a href="#/receta/${esc(parent.id)}">${esc(parent.name)}</a>.</p>` : ""}
      ${recipe.references?.length ? `<p class="muted">Referencia: ${recipe.references.map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a>`).join(", ")}</p>` : ""}
    </div>` : ""}

    <h3>Mi registro</h3>
    <div class="card">
      <div class="toolbar-row">
        <span class="muted small">Rating</span>
        <div class="stars" role="group" aria-label="Rating general">
          ${[1, 2, 3, 4, 5].map((n) => `<button class="${n <= u.rating ? "on" : ""}" data-action="rate" data-id="${esc(recipe.id)}" data-value="${n}" aria-label="${n} de 5" aria-pressed="${n === u.rating}">★</button>`).join("")}
        </div>
      </div>
      <div class="toolbar-row" style="margin-top:8px">
        <label class="muted small" for="status">Estado</label>
        <select id="status" data-action="status" data-id="${esc(recipe.id)}" style="width:auto">
          ${Object.entries(STATUS_LABELS).map(([k, v]) => `<option value="${k}"${u.status === k ? " selected" : ""}>${v}</option>`).join("")}
        </select>
      </div>
      <label class="muted small" for="notes" style="display:block;margin-top:12px">Notas personales</label>
      <textarea id="notes" data-action="notes" data-id="${esc(recipe.id)}" placeholder="Qué ajustarías, con qué marca, a quién le gustó…">${esc(u.notes)}</textarea>
    </div>

    <h3>Si te gusta este cóctel…</h3>
    <div class="recipe-grid">${similarRecipes(recipe, allRecipes(), ingredientsById(), app.state.userState, 4).map((x) => recipeCard(x.recipe, evaluateRecipe(x.recipe, app.state.inventory, ingredientsById()))).join("")}</div>

    <h3>Variantes</h3>
    ${variantsBlock(recipe)}

    <h3>Historial de preparación</h3>
    ${historyBlock(historyForRecipe(app.state.history, recipe.id), sessionRatingAverage(app.state.history, recipe.id))}
  `;
}

function historyBlock(entries, avg) {
  if (!entries.length) return `<p class="muted small">Aún no registras preparaciones. Usa el Modo Barra y registra al terminar.</p>`;
  const rows = entries.map((h) => {
    const date = new Date(h.date).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });
    const subs = h.substitutions.length ? ` · con ${h.substitutions.map((s) => esc(ingredientName(s.to))).join(", ")}` : "";
    const adjLabels = [
      h.adjustments?.intensity && h.adjustments.intensity !== "standard" ? INTENSITY_LEVELS.find((x) => x.id === h.adjustments.intensity)?.label : "",
      h.adjustments?.balance && h.adjustments.balance !== "balance" ? BALANCE_LEVELS.find((x) => x.id === h.adjustments.balance)?.label : ""
    ].filter(Boolean);
    const adjText = adjLabels.length ? ` · ${esc(adjLabels.join(", "))}` : "";
    return `<li class="hist-row">
      <div><a href="#/receta/${esc(h.recipeId)}">${esc(h.recipeName)}</a> <span class="muted small">${date} · ${h.servings} ${h.servings === 1 ? "porción" : "porciones"}${subs}${adjText}</span></div>
      ${h.rating ? `<span class="st-low" aria-label="Rating de la sesión: ${h.rating} de 5">${"★".repeat(h.rating)}</span>` : ""}
      ${h.notes ? `<p class="small">${esc(h.notes)}</p>` : ""}
    </li>`;
  }).join("");
  return `<div class="card">${avg != null ? `<p class="small muted">Promedio de sesiones: ${String(avg).replace(".", ",")} ★ (${entries.length} ${entries.length === 1 ? "preparación" : "preparaciones"})</p>` : ""}<ul class="hist-list">${rows}</ul></div>`;
}

function viewBar(id) {
  const recipe = allRecipes().find((r) => r.id === id);
  if (!recipe) return `<p class="empty">No existe la receta “${esc(id)}”. <a href="#/recetas">Volver a recetas</a></p>`;
  const prefs = app.state.preferences;
  const session = barSession(recipe.id);
  const ev = evaluateRecipe(recipe, app.state.inventory, ingredientsById());
  const adj = adjusted(recipe, ev);
  const scaled = scaleRecipe(adj.recipe, prefs.servings, prefs.unit);
  const isAdjusted = adj.changes.length > 0;
  const ice = recipe.ice ?? {};
  const iceText = [ICE_LABELS[ice.serve] ?? ice.serve, ice.chilledGlass ? "copa helada" : "", ice.dryShake ? "dry shake previo" : ""].filter(Boolean).join(", ");
  const rows = scaled.lines.map((l, i) => {
    const m = ev.lines[i];
    const done = session.checked.includes(i);
    const name = l.replacedFrom
      ? `${ingredientName(l.ingredientId)} (por ${ingredientName(l.replacedFrom.ingredientId)})`
      : m.match === MATCH.SUBSTITUTE ? `${ingredientName(m.usedId)} (por ${ingredientName(l.ingredientId)})` : ingredientName(l.ingredientId);
    return `<li><button class="bar-step" data-action="bar-check" data-value="${i}" aria-pressed="${done}">
      <span class="amt">${esc(formatAmount(l.scaled))}</span>
      <span class="name">${esc(name)}${m.match === MATCH.MISSING ? ` <span class="st-miss">(no hay)</span>` : ""}${l.top ? ` <span class="muted">· completar</span>` : ""}</span>
    </button></li>`;
  }).join("");
  const snap = timer.snapshot();
  return `
    <div class="bar-top">
      <a class="btn" href="#/receta/${esc(recipe.id)}" aria-label="Salir del Modo Barra">✕ Salir</a>
      <div class="segmented" role="group" aria-label="Unidad">
        ${["ml", "oz"].map((un) => `<button data-action="unit" data-value="${un}" aria-pressed="${prefs.unit === un}">${un}</button>`).join("")}
      </div>
      <label class="visually-hidden" for="servings">Porciones</label>
      <select id="servings" data-action="servings" style="width:auto">
        ${SERVING_OPTIONS.map((n) => `<option value="${n}"${n === prefs.servings ? " selected" : ""}>${n}×</option>`).join("")}
      </select>
    </div>
    <h2 class="bar-title">${esc(recipe.name)}</h2>
    ${isAdjusted ? `<p class="st-low small">Spec ajustado: ${esc([adj.effect.intensity ? INTENSITY_LEVELS.find((x) => x.id === adj.adjustments.intensity).label : "", adj.effect.balance ? BALANCE_LEVELS.find((x) => x.id === adj.adjustments.balance).label : ""].filter(Boolean).join(" · "))}</p>` : ""}
    <ul class="bar-steps">${rows}</ul>
    ${scaled.preparation.text ? `<p class="banner">${esc(scaled.preparation.text)}</p>` : ""}
    <dl class="bar-facts">
      <div><dt>Método</dt><dd>${esc(METHOD_LABELS[recipe.method] ?? recipe.method)}</dd></div>
      <div><dt>Hielo</dt><dd>${esc(iceText || "–")}</dd></div>
      <div><dt>Vaso</dt><dd>${esc(recipe.glass ?? "–")}</dd></div>
      <div><dt>Garnish</dt><dd>${esc(recipe.garnish ?? "–")}</dd></div>
    </dl>

    <section class="card timer" aria-label="Temporizador">
      <div id="timer-display" class="timer-display" role="timer" aria-live="off">${snap.label}</div>
      <div class="btn-row timer-controls">
        <button class="btn" data-action="timer-add" data-value="15">+15 s</button>
        <button class="btn" data-action="timer-add" data-value="30">+30 s</button>
        <button class="btn" data-action="timer-add" data-value="60">+1 min</button>
        <button class="btn primary" id="timer-toggle" data-action="timer-toggle">${snap.running ? "Pausar" : "Iniciar"}</button>
        <button class="btn" data-action="timer-reset">Reiniciar</button>
      </div>
      <p class="muted small">Sin tiempos predefinidos: elige el que uses para enfriar, reposar o infusionar.</p>
    </section>

    <section class="card" aria-label="Registrar preparación" style="margin-top:12px">
      <div class="toolbar-row">
        <span class="muted small">Rating de esta preparación</span>
        <div class="stars" role="group" aria-label="Rating de esta preparación">
          ${[1, 2, 3, 4, 5].map((n) => `<button class="${n <= session.rating ? "on" : ""}" data-action="session-rate" data-value="${n}" aria-label="${n} de 5" aria-pressed="${n === session.rating}">★</button>`).join("")}
        </div>
      </div>
      <label class="visually-hidden" for="session-notes">Notas de esta preparación</label>
      <textarea id="session-notes" data-action="session-notes" placeholder="Notas de esta preparación (opcional)">${esc(session.notes)}</textarea>
      <button class="btn primary" data-action="log" data-id="${esc(recipe.id)}" style="width:100%;margin-top:8px">Registrar preparación</button>
    </section>
  `;
}

function viewInventory() {
  const inv = app.state.inventory;
  const groups = INGREDIENT_CATEGORIES.map((cat) => {
    const items = allIngredients().filter((i) => i.category === cat.id);
    if (!items.length) return "";
    const rows = items.map((i) => {
      const status = inv[i.id]?.status ?? "out";
      const it = inv[i.id] ?? {};
      return `<div class="inv-row">
        <span class="name">${esc(i.name)}${i.inInitialInventory ? "" : ` <span class="badge">catálogo</span>`}</span>
        <div class="segmented" role="group" aria-label="Estado de ${esc(i.name)}">
          ${INV_STATUSES.map((s) => `<button data-action="inv" data-id="${esc(i.id)}" data-status="${s.id}" aria-pressed="${status === s.id}">${s.label}</button>`).join("")}
        </div>
        ${app.ui.showPrices ? `<div class="inv-price">
          <label>Precio $ <input type="text" inputmode="numeric" value="${it.price ?? ""}" data-action="inv-price" data-id="${esc(i.id)}" data-field="price" aria-label="Precio de ${esc(i.name)} en pesos"></label>
          <label>Contenido ml <input type="text" inputmode="numeric" value="${it.sizeMl ?? ""}" data-action="inv-price" data-id="${esc(i.id)}" data-field="sizeMl" aria-label="Contenido de ${esc(i.name)} en ml"></label>
        </div>` : ""}
      </div>`;
    }).join("");
    return `<h3>${esc(cat.name)}</h3><div class="card">${rows}</div>`;
  }).join("");
  const count = Object.values(inv).filter((i) => i.status !== "out").length;
  return `
    ${storageBanner()}
    <h2>Mi barra</h2>
    <div class="btn-row" style="margin-bottom:8px">
      <a class="btn primary" href="#/comprar">¿Qué debería comprar?</a>
      <button class="btn" data-action="toggle-prices" aria-pressed="${app.ui.showPrices}">${app.ui.showPrices ? "Ocultar precios" : "Precios (opcional)"}</button>
    </div>
    ${app.ui.showPrices ? `<p class="small muted">Precio del envase y su contenido en ml. Para frescos, anota cuánto jugo rinde lo que compras (p. ej. 1 kg de limones ≈ su rendimiento en ml). Se usa para el costo por cóctel y para ordenar las compras.</p>` : ""}
    <p class="muted small">${count} ingredientes disponibles. “Poco” cuenta como disponible y se avisa en la receta. Los marcados <span class="badge">catálogo</span> aparecen en recetas pero no estaban en tu inventario inicial.</p>
    ${groups}
  `;
}

function viewSettings() {
  const p = app.ui.pendingImport;
  let importBlock = "";
  if (p) {
    const s = p.validation.summary;
    importBlock = `
      <div class="card import-summary" style="margin-top:12px">
        <p><strong>${esc(p.fileName)}</strong></p>
        ${p.validation.errors.length ? `<p>No se puede importar:</p><ul class="errors">${p.validation.errors.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : ""}
        ${s ? `<ul>
          <li>Recetas nuevas: ${s.recipesNew.length}</li>
          <li>Recetas iguales a las actuales: ${s.recipesSame.length}</li>
          <li>Recetas en conflicto (se guardarán como copia): ${s.recipesConflict.length}</li>
          <li>Favoritos/ratings en conflicto (se conservan los actuales): ${s.userStateConflicts.length}</li>
          <li>Preparaciones nuevas en historial: ${s.historyNew}</li>
          <li>Experimentos nuevos: ${s.labNew}</li>
        </ul>` : ""}
        ${p.validation.warnings.length ? `<p>Advertencias:</p><ul class="warnings">${p.validation.warnings.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
        <div class="btn-row">
          ${p.validation.ok ? `<button class="btn primary" data-action="import-merge">Combinar con lo actual</button>
          <button class="btn danger" data-action="import-replace">Reemplazar todo</button>` : ""}
          <button class="btn" data-action="import-cancel">Cancelar</button>
        </div>
      </div>`;
  }
  return `
    ${storageBanner()}
    <h2>Respaldo</h2>
    <div class="card">
      <p>Exporta inventario, favoritos, ratings, notas, recetas propias, historial y laboratorio en un archivo JSON.</p>
      <button class="btn primary" data-action="export">Exportar respaldo</button>
    </div>

    <h3>Importar</h3>
    <div class="card">
      <p class="small muted">Se muestra un resumen antes de aplicar. Nada se sobrescribe sin confirmación.</p>
      <label class="btn" for="import-file">Elegir archivo JSON</label>
      <input id="import-file" class="visually-hidden" type="file" accept="application/json,.json" data-action="import-file">
      ${importBlock}
    </div>

    <h3>Reiniciar</h3>
    <div class="card">
      <p class="small muted">Vuelve al inventario inicial y borra favoritos, notas e historial de este navegador.</p>
      ${app.ui.confirmReset
        ? `<p>¿Seguro? Exporta un respaldo antes si quieres conservar algo.</p>
           <div class="btn-row"><button class="btn danger" data-action="reset-confirm">Sí, reiniciar</button><button class="btn" data-action="reset-cancel">Cancelar</button></div>`
        : `<button class="btn danger" data-action="reset">Reiniciar datos</button>`}
    </div>
    <p class="muted small" style="margin-top:24px">Almacenamiento: ${app.storageMode === "local" ? "este navegador (localStorage)" : "solo memoria"} · schema ${app.state.schemaVersion}</p>
  `;
}

// ───────── VARIANTES Y LABORATORIO ─────────

const METHOD_SHORT = { stir: "Stir", shake: "Shake", build: "Build" };
const UNIT_SHORT = { ml: "ml", oz: "oz", dash: "dash", barspoon: "cdta bar", cube: "terrón", unit: "unidad" };

function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }); } catch { return ""; }
}

function variantsBlock(recipe) {
  const children = allRecipes().filter((r) => r.parentId === recipe.id);
  const isPersonal = app.state.recipes.some((r) => r.id === recipe.id);
  const list = children.length
    ? `<ul class="hist-list">${children.map((r) => `<li class="hist-row"><div><a href="#/receta/${esc(r.id)}">${esc(r.name)}</a> <span class="muted small">${esc(SOURCE_LABELS[r.source] ?? r.source)}${r.createdAt ? ` · ${fmtDate(r.createdAt)}` : ""}</span></div>${userEntry(r.id).rating ? `<span class="st-low">${"★".repeat(userEntry(r.id).rating)}</span>` : ""}</li>`).join("")}</ul>`
    : `<p class="muted small">Sin variantes todavía.</p>`;
  const del = isPersonal
    ? (app.ui.confirmDelete === recipe.id
        ? `<p class="small">¿Eliminar “${esc(recipe.name)}”? El historial de preparaciones se conserva.</p><div class="btn-row"><button class="btn danger" data-action="recipe-delete-confirm" data-id="${esc(recipe.id)}">Sí, eliminar</button><button class="btn" data-action="cancel-delete">Cancelar</button></div>`
        : `<button class="btn danger" data-action="recipe-delete" data-id="${esc(recipe.id)}">Eliminar receta personal</button>`)
    : "";
  return `<div class="card">
    ${list}
    <div class="btn-row" style="margin-top:8px">
      <button class="btn" data-action="variant-create" data-id="${esc(recipe.id)}">Crear variante en el Laboratorio</button>
      <a class="btn" href="#/comparar?ids=${encodeURIComponent(defaultComparison(recipe, allRecipes()).join(","))}">Comparar specs</a>
      ${del}
    </div>
    ${isPersonal && recipe.createdAt ? `<p class="muted small">Receta personal creada el ${fmtDate(recipe.createdAt)}.</p>` : ""}
  </div>`;
}

function viewLab() {
  const drafts = [...app.state.lab].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const mine = [...app.state.recipes].sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  return `
    ${storageBanner()}
    <h2>Laboratorio</h2>
    <p class="muted small">Experimenta sin tocar el catálogo. Un borrador pasa a tus recetas solo cuando lo conviertes.</p>
    <button class="btn primary" data-action="lab-new" style="width:100%">Nuevo experimento</button>

    <h3>Borradores</h3>
    ${drafts.length ? drafts.map((d) => `
      <a class="card recipe-card" href="#/lab/${esc(d.id)}">
        <span class="title">${esc(d.name)}</span>
        <span class="badge">Borrador</span>
        <span class="meta">${d.ingredients.length} ingredientes · ${esc(METHOD_SHORT[d.method] ?? "")} · editado ${fmtDate(d.updatedAt)}${d.parentId ? ` · variante de ${esc(allRecipes().find((r) => r.id === d.parentId)?.name ?? d.parentId)}` : ""}</span>
      </a>`).join("") : `<p class="muted">No hay borradores.</p>`}

    <h3>Mis recetas</h3>
    ${mine.length ? `<div class="recipe-grid">${mine.map((r) => recipeCard(r, evaluateRecipe(r, app.state.inventory, ingredientsById()))).join("")}</div>` : `<p class="muted">Aún no conviertes borradores en recetas personales.</p>`}
  `;
}

function viewLabEditor(id) {
  const d = app.state.lab.find((x) => x.id === id);
  if (!d) return `<p class="empty">El borrador no existe. <a href="#/lab">Volver al Laboratorio</a></p>`;
  const ingOptions = (selected) => INGREDIENT_CATEGORIES.map((cat) => {
    const items = allIngredients().filter((i) => i.category === cat.id);
    return `<optgroup label="${esc(cat.name)}">${items.map((i) => `<option value="${esc(i.id)}"${i.id === selected ? " selected" : ""}>${esc(i.name)}</option>`).join("")}</optgroup>`;
  }).join("");
  const rows = d.ingredients.map((l, i) => `
    <div class="lab-ing">
      <label class="visually-hidden" for="ing-${i}">Ingrediente ${i + 1}</label>
      <select id="ing-${i}" data-action="lab-ing" data-index="${i}" data-field="ingredientId">
        <option value="">Elegir ingrediente…</option>${ingOptions(l.ingredientId)}
      </select>
      <div class="lab-ing-row">
        <label class="visually-hidden" for="amt-${i}">Cantidad</label>
        <input id="amt-${i}" type="text" inputmode="decimal" value="${esc(String(l.amount ?? "").replace(".", ","))}" data-action="lab-ing" data-index="${i}" data-field="amount" placeholder="Cant.">
        <label class="visually-hidden" for="unit-${i}">Unidad</label>
        <select id="unit-${i}" data-action="lab-ing" data-index="${i}" data-field="unit">${UNITS.map((u) => `<option value="${u}"${u === l.unit ? " selected" : ""}>${UNIT_SHORT[u]}</option>`).join("")}</select>
        <button class="icon-btn" data-action="lab-remove-ing" data-index="${i}" aria-label="Quitar ingrediente ${i + 1}">✕</button>
      </div>
      <div class="lab-ing-row2">
        <label class="visually-hidden" for="role-${i}">Rol</label>
        <select id="role-${i}" data-action="lab-ing" data-index="${i}" data-field="role">${ROLES.map((r) => `<option value="${r.id}"${r.id === l.role ? " selected" : ""}>Rol: ${r.label}</option>`).join("")}</select>
        <label class="small muted lab-check"><input type="checkbox" data-action="lab-ing" data-index="${i}" data-field="top"${l.top ? " checked" : ""}> Completar (top)</label>
      </div>
    </div>`).join("");
  const allTags = [...PROFILE_TAGS.structure, ...PROFILE_TAGS.flavor];
  const field = (name, label, value, placeholder = "") => `
    <label class="lab-label" for="f-${name}">${label}</label>
    <input id="f-${name}" class="search" type="text" value="${esc(value ?? "")}" data-action="lab-field" data-field="${name}" placeholder="${esc(placeholder)}">`;
  const parent = d.parentId ? allRecipes().find((r) => r.id === d.parentId) : null;
  const errors = app.ui.labErrors ?? [];
  return `
    ${storageBanner()}
    <p><a href="#/lab">← Laboratorio</a></p>
    <h2>Borrador</h2>
    ${parent ? `<p class="small muted">Variante de <a href="#/receta/${esc(parent.id)}">${esc(parent.name)}</a>. El original no cambia.</p>` : ""}
    <div class="card lab-form">
      ${field("name", "Nombre", d.name)}
      ${field("family", "Familia", d.family, "Sour, Martini, Highball…")}
      <label class="lab-label" for="f-method">Método</label>
      <select id="f-method" data-action="lab-field" data-field="method">${METHODS.map((m) => `<option value="${m}"${m === d.method ? " selected" : ""}>${esc(METHOD_LABELS[m])}</option>`).join("")}</select>
      <label class="lab-label" for="f-ice">Hielo al servir</label>
      <select id="f-ice" data-action="lab-field" data-field="ice">${ICE_SERVES.map((x) => `<option value="${x}"${x === d.ice?.serve ? " selected" : ""}>${esc(ICE_LABELS[x])}</option>`).join("")}</select>
      ${field("glass", "Cristalería", d.glass, "Coupe, Old Fashioned…")}
      ${field("garnish", "Garnish", d.garnish, "Piel de naranja…")}
    </div>

    <h3>Ingredientes</h3>
    <div class="card">
      ${rows || `<p class="muted small">Sin ingredientes.</p>`}
      <button class="btn" data-action="lab-add-ing" style="width:100%;margin-top:8px">+ Agregar ingrediente</button>
    </div>

    <h3>Perfil</h3>
    <div class="chips" role="group" aria-label="Perfil">
      ${allTags.map((t) => `<button class="chip" data-action="lab-tag" data-value="${t.id}" aria-pressed="${d.profile.includes(t.id)}">${esc(t.name)}</button>`).join("")}
    </div>

    <h3>Notas</h3>
    <label class="visually-hidden" for="f-notes">Notas del experimento</label>
    <textarea id="f-notes" data-action="lab-field" data-field="notes" placeholder="Qué buscas con este experimento, qué cambiaste…">${esc(d.notes)}</textarea>

    ${errors.length ? `<div class="banner" role="alert"><ul>${errors.map((e) => `<li>${esc(e)}</li>`).join("")}</ul></div>` : ""}
    <div class="btn-row" style="margin-top:16px">
      <button class="btn primary" data-action="lab-convert" data-id="${esc(d.id)}">Guardar como receta personal</button>
      <button class="btn" data-action="lab-dup" data-id="${esc(d.id)}">Duplicar</button>
      ${app.ui.confirmDelete === d.id
        ? `<button class="btn danger" data-action="lab-delete-confirm" data-id="${esc(d.id)}">Sí, eliminar borrador</button><button class="btn" data-action="cancel-delete">Cancelar</button>`
        : `<button class="btn danger" data-action="lab-delete" data-id="${esc(d.id)}">Eliminar</button>`}
    </div>
    <p class="muted small">Los cambios del borrador se guardan solos. Editado ${fmtDate(d.updatedAt)}.</p>
  `;
}

function currentDraft() {
  const { parts } = parseRoute();
  return parts[0] === "lab" ? app.state.lab.find((x) => x.id === decodeURIComponent(parts[1] ?? "")) : null;
}
function touchDraft(d) {
  d.updatedAt = new Date().toISOString();
  clearTimeout(touchDraft.timer);
  touchDraft.timer = setTimeout(persist, 300);
}

// ───────── COMPARADOR ─────────

const DIFF_MARK = {
  same: { sym: "", label: "igual" },
  more: { sym: "▲", label: "más que la referencia" },
  less: { sym: "▼", label: "menos que la referencia" },
  added: { sym: "+", label: "agregado" },
  removed: { sym: "", label: "no lo lleva" },
  unit: { sym: "≠", label: "otra unidad" },
  absent: { sym: "", label: "no lo lleva" }
};

function viewCompare(params) {
  const prefs = app.state.preferences;
  const byId = indexById(allRecipes());
  const ids = (params.get("ids") ?? "").split(",").filter((id) => byId[id]).slice(0, 3);
  const chosen = ids.map((id) => byId[id]);
  const sorted = [...allRecipes()].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const picker = (i) => `
    <label class="lab-label" for="cmp-${i}">${i === 0 ? "Referencia" : `Comparar ${i}`}</label>
    <select id="cmp-${i}" data-action="compare-pick" data-index="${i}">
      <option value="">${i === 0 ? "Elegir receta…" : "Ninguna"}</option>
      ${sorted.map((r) => `<option value="${esc(r.id)}"${ids[i] === r.id ? " selected" : ""}>${esc(r.name)}</option>`).join("")}
    </select>`;
  let table = `<p class="muted">Elige al menos dos recetas.</p>`;
  if (chosen.length >= 2) {
    const ing = ingredientsById();
    const c = compareSpecs(chosen, ing);
    const cols = chosen.length;
    const head = `<div class="cmp-cell cmp-head"></div>${chosen.map((r, i) => `<div class="cmp-cell cmp-head"><a href="#/receta/${esc(r.id)}">${esc(r.name)}</a>${i === 0 ? `<span class="muted small">referencia</span>` : ""}</div>`).join("")}`;
    const rows = c.rows.map((row) => `
      <div class="cmp-cell cmp-name">${esc(ingredientName(row.ingredientId))}</div>
      ${row.cells.map((cell) => {
        const mark = DIFF_MARK[cell.diff];
        const text = cell.line ? formatAmount(practicalAmount(cell.line.amount, cell.line.unit, prefs.unit)) : "—";
        return `<div class="cmp-cell cmp-val d-${cell.diff}" title="${esc(mark.label)}">${esc(text)}${mark.sym ? ` <span aria-label="${esc(mark.label)}">${mark.sym}</span>` : ""}</div>`;
      }).join("")}`).join("");
    const factText = (key, v) => key === "method" ? (METHOD_SHORT[v] ?? v) : key === "ice" ? (ICE_LABELS[v] ?? v) : v;
    const facts = c.facts.map((f) => `
      <div class="cmp-cell cmp-name">${esc(FACT_LABELS[f.key])}</div>
      ${f.values.map((v, i) => `<div class="cmp-cell cmp-fact${i > 0 && v !== f.values[0] ? " d-more" : ""}">${esc(factText(f.key, v) || "–")}</div>`).join("")}`).join("");
    const summary = chosen.slice(1).map((r, k) => `
      <li><strong>${esc(r.name)}:</strong> ${c.summary[k + 1].length ? esc(c.summary[k + 1].join(" · ")) : "mismo spec que la referencia"}</li>`).join("");
    table = `
      <div class="card cmp-grid" style="--cols:${cols}" role="table" aria-label="Comparación de specs">${head}${rows}${facts}</div>
      <p class="muted small">▲ más · ▼ menos · + agregado · — no lo lleva, siempre respecto de la referencia. Cantidades para 1 porción, en ${prefs.unit}.</p>
      <h3>Diferencias</h3>
      <ul class="cmp-summary">${summary}</ul>`;
  }
  return `
    ${storageBanner()}
    <h2>Comparar specs</h2>
    <div class="card lab-form">${picker(0)}${picker(1)}${picker(2)}</div>
    <div class="toolbar-row" style="margin:12px 0">
      <div class="segmented" role="group" aria-label="Unidad">
        ${["ml", "oz"].map((un) => `<button data-action="unit" data-value="${un}" aria-pressed="${prefs.unit === un}">${un}</button>`).join("")}
      </div>
    </div>
    ${table}`;
}

// ───────── COMPRAS ─────────

function viewShopping() {
  const byId = indexById(allRecipes());
  const sug = shoppingSuggestions(allRecipes(), app.state.inventory, ingredientsById(), allIngredients().map((i) => i.id));
  const names = (ids) => ids.map((id) => `<a href="#/receta/${esc(id)}">${esc(byId[id]?.name ?? id)}</a>`).join(", ");
  const items = sug.map((x) => `
    <div class="card">
      <div class="toolbar-row"><strong style="flex:1">${esc(ingredientName(x.ingredientId))}</strong>
        ${x.unlocks.length ? `<span class="badge house">+${x.unlocks.length} ${x.unlocks.length === 1 ? "receta" : "recetas"}</span>` : ""}
        ${x.price ? `<span class="badge">$${x.price.toLocaleString("es-CL")}</span>` : ""}
      </div>
      ${x.unlocks.length ? `<p class="small">Desbloquea: ${names(x.unlocks)}</p>` : ""}
      ${x.upgrades.length ? `<p class="small muted">Hoy con sustituto, pasarían al original: ${names(x.upgrades)}</p>` : ""}
    </div>`).join("");
  const evs = evaluateAll(allRecipes(), app.state.inventory, ingredientsById());
  const pairs = evs.filter((e) => e.missingCount === 2);
  return `
    ${storageBanner()}
    <p><a href="#/inventario">← Mi barra</a></p>
    <h2>¿Qué debería comprar?</h2>
    <p class="muted small">Ordenado por recetas nuevas que desbloquea${sug.some((x) => x.price) ? " por peso gastado (si anotaste precio)" : ""}. Anota precios en Mi barra para ordenar por costo.</p>
    ${items || `<p class="muted">Ningún ingrediente suelto desbloquea recetas nuevas.</p>`}
    <h3>A dos ingredientes</h3>
    ${pairs.length ? `<ul class="cmp-summary">${pairs.map((e) => `<li>${names([e.recipeId])}: ${esc(e.missingIngredients.map(ingredientName).join(" + "))}</li>`).join("")}</ul>` : `<p class="muted">Ninguna receta está a dos ingredientes.</p>`}
  `;
}

// ───────── ROUTER ─────────

function parseRoute() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [path, query = ""] = hash.split("?");
  const parts = path.split("/").filter(Boolean);
  return { parts, params: new URLSearchParams(query) };
}

function render({ focus = false } = {}) {
  const { parts, params } = parseRoute();
  const main = document.getElementById("main");
  let html;
  let nav;
  let title = "Mi Barra de Autor";
  if (parts[0] === "recetas") { html = viewRecipes(params); nav = "recipes"; title = "Recetas · " + title; }
  else if (parts[0] === "receta") {
    const id = decodeURIComponent(parts[1] ?? "");
    html = viewRecipe(id); nav = "recipes";
    title = (allRecipes().find((r) => r.id === id)?.name ?? "Receta") + " · Mi Barra de Autor";
  }
  else if (parts[0] === "barra") {
    const id = decodeURIComponent(parts[1] ?? "");
    html = viewBar(id); nav = "recipes";
    title = "Modo Barra · " + (allRecipes().find((r) => r.id === id)?.name ?? "");
  }
  else if (parts[0] === "comparar") { html = viewCompare(params); nav = "recipes"; title = "Comparar specs · " + title; }
  else if (parts[0] === "lab" && parts[1]) { html = viewLabEditor(decodeURIComponent(parts[1])); nav = "lab"; title = "Borrador · " + title; }
  else if (parts[0] === "lab") { html = viewLab(); nav = "lab"; title = "Laboratorio · " + title; }
  else if (parts[0] === "comprar") { html = viewShopping(); nav = "inventory"; title = "Compras · " + title; }
  else if (parts[0] === "inventario") { html = viewInventory(); nav = "inventory"; title = "Mi barra · " + title; }
  else if (parts[0] === "ajustes") { html = viewSettings(); nav = "settings"; title = "Respaldo · " + title; }
  else { html = viewHome(); nav = "home"; }
  const inBar = parts[0] === "barra";
  document.body.classList.toggle("bar-mode", inBar);
  setWakeLock(inBar);
  main.innerHTML = html;
  document.title = title;
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === nav) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (focus) { main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

// Re-render conservando el foco del buscador.
function rerenderKeepingSearch() {
  const input = document.getElementById("q");
  const pos = input?.selectionStart;
  render();
  const next = document.getElementById("q");
  if (input && next) { next.focus(); next.setSelectionRange(pos, pos); }
}

// ───────── EVENT HANDLERS ─────────

function onClick(e) {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const { action, id, value } = el.dataset;
  const prefs = app.state.preferences;
  switch (action) {
    case "avail":
      prefs.availabilityFilter = value;
      persist();
      history.replaceState(null, "", "#/recetas");
      render();
      break;
    case "tag":
      prefs.profileFilter = prefs.profileFilter.includes(value) ? prefs.profileFilter.filter((t) => t !== value) : [...prefs.profileFilter, value];
      persist();
      render();
      break;
    case "fav":
      updateUser(id, { favorite: !userEntry(id).favorite });
      render();
      break;
    case "rate": {
      const n = Number(value);
      updateUser(id, { rating: userEntry(id).rating === n ? 0 : n });
      render();
      break;
    }
    case "unit":
      prefs.unit = value;
      persist();
      render();
      break;
    case "inv":
      app.state.inventory[id] = { ...(app.state.inventory[id] ?? {}), status: el.dataset.status };
      persist();
      render();
      break;
    case "variant-create": {
      const parent = allRecipes().find((r) => r.id === id);
      const ev = evaluateRecipe(parent, app.state.inventory, ingredientsById());
      // La variante parte del spec que estás viendo (con ajustes y alternativas aplicados), nunca toca el original.
      const draft = newDraft({ ...adjusted(parent, ev).recipe, id: parent.id }, { name: suggestVariantName(parent, app.state.recipes) });
      app.state.lab.push(draft);
      persist();
      location.hash = `#/lab/${draft.id}`;
      break;
    }
    case "lab-new": {
      const draft = newDraft(null);
      app.state.lab.push(draft);
      persist();
      location.hash = `#/lab/${draft.id}`;
      break;
    }
    case "lab-dup": {
      const d = app.state.lab.find((x) => x.id === id);
      const copy = duplicateDraft(d);
      app.state.lab.push(copy);
      persist();
      toast("Borrador duplicado.");
      location.hash = `#/lab/${copy.id}`;
      break;
    }
    case "lab-delete":
    case "recipe-delete":
      app.ui.confirmDelete = id;
      render();
      break;
    case "cancel-delete":
      app.ui.confirmDelete = null;
      render();
      break;
    case "lab-delete-confirm":
      app.state.lab = app.state.lab.filter((x) => x.id !== id);
      app.ui.confirmDelete = null;
      persist();
      toast("Borrador eliminado.");
      location.hash = "#/lab";
      break;
    case "recipe-delete-confirm":
      app.state.recipes = app.state.recipes.filter((x) => x.id !== id);
      delete app.state.userState[id];
      app.ui.confirmDelete = null;
      persist();
      toast("Receta personal eliminada. Su historial se conserva.");
      location.hash = "#/lab";
      break;
    case "lab-add-ing": {
      const d = currentDraft();
      d.ingredients.push({ ingredientId: "", amount: "", unit: "ml", role: d.ingredients.length ? "modifier" : "base" });
      touchDraft(d);
      render();
      document.getElementById(`ing-${d.ingredients.length - 1}`)?.focus();
      break;
    }
    case "lab-remove-ing": {
      const d = currentDraft();
      d.ingredients.splice(Number(el.dataset.index), 1);
      touchDraft(d);
      render();
      break;
    }
    case "lab-tag": {
      const d = currentDraft();
      d.profile = d.profile.includes(value) ? d.profile.filter((t) => t !== value) : [...d.profile, value];
      touchDraft(d);
      render();
      break;
    }
    case "lab-convert": {
      const d = app.state.lab.find((x) => x.id === id);
      const errors = validateDraft(d, ingredientsById());
      app.ui.labErrors = errors;
      if (errors.length) { render(); break; }
      const taken = new Set(allRecipes().map((r) => r.id));
      const recipe = draftToRecipe(d, taken);
      app.state.recipes.push(recipe);
      app.state.userState[recipe.id] = { favorite: false, rating: 0, status: "pending", notes: d.notes ?? "" };
      persist();
      toast(`“${recipe.name}” guardada en tus recetas. El borrador sigue en el Laboratorio.`);
      location.hash = `#/receta/${recipe.id}`;
      break;
    }
    case "today-tag":
      app.ui.todaySeen = [];
      app.ui.todayProfile = app.ui.todayProfile.includes(value) ? app.ui.todayProfile.filter((t) => t !== value) : [...app.ui.todayProfile, value];
      render();
      break;
    case "today-next":
      app.ui.todayOffset += 1;
      app.ui.todaySeen = [...app.ui.todaySeen, ...(app.ui.todayShown ?? [])];
      render();
      break;
    case "today-reset":
      app.ui.todaySeen = [];
      app.ui.todayOffset = 0;
      render();
      break;
    case "toggle-prices":
      app.ui.showPrices = !app.ui.showPrices;
      render();
      break;
    case "adjust":
      app.ui.adjust[id] = { ...adjustmentsFor(id), [el.dataset.kind]: value };
      render();
      break;
    case "bar-check": {
      const s = app.ui.bar;
      const i = Number(value);
      s.checked = s.checked.includes(i) ? s.checked.filter((x) => x !== i) : [...s.checked, i];
      el.setAttribute("aria-pressed", String(s.checked.includes(i)));
      break;
    }
    case "timer-add":
      timer.add(Number(value));
      break;
    case "timer-toggle":
      if (timer.running) timer.pause(); else timer.start();
      break;
    case "timer-reset":
      timer.reset();
      break;
    case "session-rate": {
      const n = Number(value);
      app.ui.bar.rating = app.ui.bar.rating === n ? 0 : n;
      render();
      break;
    }
    case "log": {
      const recipe = allRecipes().find((r) => r.id === id);
      const ev = evaluateRecipe(recipe, app.state.inventory, ingredientsById());
      const adjNow = adjusted(recipe, ev);
      const scaledNow = scaleRecipe(adjNow.recipe, prefs.servings, prefs.unit);
      const entry = createHistoryEntry(recipe, ev, scaledNow, { rating: app.ui.bar.rating, notes: app.ui.bar.notes,
        // Solo se registran los ajustes que efectivamente cambiaron la receta.
        adjustments: {
          intensity: adjNow.effect.intensity ? adjNow.adjustments.intensity : "standard",
          balance: adjNow.effect.balance ? adjNow.adjustments.balance : "balance"
        } });
      app.state.history.push(entry);
      if (userEntry(id).status !== "tested") updateUser(id, { status: "tested" });
      persist();
      app.ui.bar = null;
      timer.reset();
      toast("Preparación registrada.");
      location.hash = `#/receta/${id}`;
      break;
    }
    case "export":
      downloadBackup();
      break;
    case "import-merge":
    case "import-replace": {
      const strategy = action === "import-merge" ? "merge" : "replace";
      try {
        const { state, report } = applyImport(app.state, app.ui.pendingImport.validation, strategy, catalog);
        app.state = state;
        app.ui.pendingImport = null;
        persist();
        toast(report.join(" "));
      } catch (err) {
        toast(err.message);
      }
      render();
      break;
    }
    case "import-cancel":
      app.ui.pendingImport = null;
      render();
      break;
    case "reset":
      app.ui.confirmReset = true;
      render();
      break;
    case "reset-cancel":
      app.ui.confirmReset = false;
      render();
      break;
    case "reset-confirm":
      resetState();
      app.state = defaults();
      app.ui.confirmReset = false;
      persist();
      toast("Datos reiniciados.");
      render();
      break;
  }
}

function onInput(e) {
  const el = e.target;
  if (el.dataset.action === "search") {
    app.ui.query = el.value;
    rerenderKeepingSearch();
  } else if (el.dataset.action === "lab-field" && el.tagName !== "SELECT") {
    const d = currentDraft();
    if (d) { d[el.dataset.field] = el.value; touchDraft(d); }
  } else if (el.dataset.action === "lab-ing" && el.dataset.field === "amount") {
    const d = currentDraft();
    if (d) {
      const n = Number(el.value.replace(",", "."));
      d.ingredients[Number(el.dataset.index)].amount = el.value.trim() === "" ? "" : (Number.isFinite(n) ? n : el.value);
      touchDraft(d);
    }
  } else if (el.dataset.action === "session-notes") {
    if (app.ui.bar) app.ui.bar.notes = el.value;
  } else if (el.dataset.action === "notes") {
    // Se guarda sin re-renderizar para no perder el cursor.
    app.state.userState[el.dataset.id] = { ...userEntry(el.dataset.id), notes: el.value };
    clearTimeout(onInput.timer);
    onInput.timer = setTimeout(persist, 400);
  }
}

function onChange(e) {
  const el = e.target;
  const { action, id } = el.dataset;
  if (action === "lab-field" && el.tagName === "SELECT") {
    const d = currentDraft();
    if (el.dataset.field === "ice") d.ice = { serve: el.value }; else d[el.dataset.field] = el.value;
    touchDraft(d);
    return;
  }
  if (action === "lab-ing" && el.dataset.field !== "amount") {
    const d = currentDraft();
    const line = d.ingredients[Number(el.dataset.index)];
    if (el.dataset.field === "top") line.top = el.checked || undefined;
    else line[el.dataset.field] = el.value;
    touchDraft(d);
    return;
  }
  if (action === "compare-pick") {
    const { params } = parseRoute();
    const ids = (params.get("ids") ?? "").split(",");
    ids[Number(el.dataset.index)] = el.value;
    const clean = ids.filter(Boolean);
    history.replaceState(null, "", `#/comparar?ids=${encodeURIComponent(clean.join(","))}`);
    render();
    document.getElementById(`cmp-${el.dataset.index}`)?.focus();
    return;
  }
  if (action === "inv-price") {
    const raw = el.value.replace(/[^\d]/g, "");
    const item = { ...(app.state.inventory[id] ?? { status: "out" }) };
    if (raw) item[el.dataset.field] = Number(raw); else delete item[el.dataset.field];
    app.state.inventory[id] = item;
    persist();
    return;
  }
  if (action === "servings") {
    app.state.preferences.servings = Number(el.value);
    persist();
    render();
  } else if (action === "status") {
    updateUser(id, { status: el.value });
    toast(`Estado: ${STATUS_LABELS[el.value]}.`);
  } else if (action === "notes") {
    persist();
  } else if (action === "import-file" && el.files?.[0]) {
    readImportFile(el.files[0]);
  }
}

function downloadBackup() {
  try {
    const data = JSON.stringify(exportBackup(app.state), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = backupFileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Respaldo exportado.");
  } catch {
    toast("No se pudo generar el respaldo.");
  }
}

function readImportFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const validation = validateBackup(String(reader.result), app.state, catalog);
    app.ui.pendingImport = { fileName: file.name, validation };
    render();
  };
  reader.onerror = () => toast("No se pudo leer el archivo.");
  reader.readAsText(file);
}

// ───────── INIT ─────────

function init() {
  try {
    const { state, mode, warnings } = loadState(defaults());
    app.state = state;
    app.storageMode = mode;
    if (warnings.length) toast(warnings.join(" "));
  } catch (err) {
    app.state = defaults();
    app.storageMode = "memory";
    toast(`No se pudieron leer los datos guardados (${err.message}). Se usa el estado inicial.`);
  }
  persist();
  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);
  document.addEventListener("change", onChange);
  window.addEventListener("hashchange", () => { app.ui.confirmReset = false; app.ui.confirmDelete = null; app.ui.labErrors = []; render({ focus: true }); });
  render();
  registerServiceWorker();
}

// PWA (§33): solo en http(s); en file:// el navegador no permite service workers.
function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  navigator.serviceWorker.register("service-worker.js").catch(() => { /* sin modo offline */ });
}

init();
