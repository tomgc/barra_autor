// Pruebas de catálogo y motores. Se ejecutan en el navegador abriendo tests.html.
import { INGREDIENTS } from "../data/ingredients.js";
import { RECIPES } from "../data/recipes.js";
import { COLLECTIONS, PROFILE_TAGS } from "../data/collections.js";
import { DEMO_USER_STATE } from "../data/demo-user-state.js";
import { indexById, normalizeText } from "./util.js";
import { toMl, practicalAmount, formatAmount } from "./units.js";
import { evaluateRecipe, evaluateAll, filterByAvailability, initialInventory, MATCH, applyAlternatives } from "./engine/matching.js";
import { scaleRecipe } from "./engine/scaling.js";
import { searchRecipes, filterByProfile } from "./engine/search.js";
import { emptyState, migrateState, SCHEMA_VERSION } from "./storage.js";
import { exportBackup, validateBackup, applyImport } from "./backup.js";
import { createHistoryEntry, historyForRecipe, sessionRatingAverage } from "./history.js";
import { formatClock } from "./timer.js";
import { adjustRecipe, noEffectNotes } from "./engine/adjust.js";
import { newDraft, duplicateDraft, validateDraft, draftToRecipe, suggestVariantName, slugify } from "./lab.js";
import { compareSpecs, cellDiff, defaultComparison } from "./engine/compare.js";
import { estimateAbv, estimateCost, dilutionFor } from "./engine/estimates.js";
import { similarRecipes, whatToDrink, shoppingSuggestions } from "./engine/discovery.js";

const MANDATORY = ["el-cardinale", "satans-tarde", "dry-martini", "vodka-martini", "lucien-gaudin", "perfect-negroni",
  "negroni-pajarillo", "vesper", "elderflower-martini", "boulevardier-seco", "paper-plane-casa", "calafate-sour",
  "pisco-sour", "mandarina-mule", "highland-sauco", "el-claridge", "el-alfonso", "vermut-cooler"];

export function runTests() {
  const results = [];
  const test = (name, fn) => {
    try {
      fn();
      results.push({ name, ok: true });
    } catch (e) {
      results.push({ name, ok: false, error: e.message });
    }
  };
  const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
  const eq = (a, b, msg) => assert(JSON.stringify(a) === JSON.stringify(b), `${msg}: esperado ${JSON.stringify(b)}, obtenido ${JSON.stringify(a)}`);

  const ingById = indexById(INGREDIENTS);
  const recById = indexById(RECIPES);
  const inv0 = initialInventory(INGREDIENTS);
  const catalog = { ingredients: INGREDIENTS, recipes: RECIPES };

  // ── Datos
  test("≥30 recetas", () => assert(RECIPES.length >= 30, `hay ${RECIPES.length}`));
  test("18 recetas obligatorias presentes", () => {
    const missing = MANDATORY.filter((id) => !recById[id]);
    eq(missing, [], "faltan");
  });
  test("IDs únicos (recetas e ingredientes)", () => {
    eq(new Set(RECIPES.map((r) => r.id)).size, RECIPES.length, "recetas");
    eq(new Set(INGREDIENTS.map((i) => i.id)).size, INGREDIENTS.length, "ingredientes");
  });
  test("Toda receta del catálogo tiene image.src e image.thumb con la ruta esperada", () => {
    // La existencia real de los archivos la verifica R/10_ilustraciones_a_webp.R.
    const mal = RECIPES.filter((r) => r.image?.src !== `assets/cocktails/${r.id}.webp` || r.image?.thumb !== `assets/cocktails/${r.id}-256.webp`
      || !r.image?.alt || r.image?.style !== "colored-pencil").map((r) => r.id);
    eq(mal, [], "sin image válida");
  });
  test("Ingredientes, colecciones, tags y parentId existen", () => {
    const cols = new Set(COLLECTIONS.map((c) => c.id));
    const tags = new Set([...PROFILE_TAGS.structure, ...PROFILE_TAGS.flavor].map((t) => t.id));
    const bad = [];
    for (const r of RECIPES) {
      r.ingredients.forEach((l) => { if (!ingById[l.ingredientId]) bad.push(`${r.id}:${l.ingredientId}`); });
      r.collections.forEach((c) => { if (!cols.has(c)) bad.push(`${r.id}:${c}`); });
      r.profile.forEach((t) => { if (!tags.has(t)) bad.push(`${r.id}:${t}`); });
      if (r.parentId && !recById[r.parentId]) bad.push(`${r.id}:parent`);
    }
    INGREDIENTS.forEach((i) => i.substitutes.forEach((s) => { if (!ingById[s.id]) bad.push(`${i.id}:sub:${s.id}`); }));
    Object.keys(DEMO_USER_STATE).forEach((id) => { if (!recById[id]) bad.push(`demo:${id}`); });
    eq(bad, [], "referencias rotas");
  });
  test("Cantidades válidas", () => {
    const bad = RECIPES.flatMap((r) => r.ingredients.filter((l) => !(l.amount > 0)).map((l) => `${r.id}:${l.ingredientId}`));
    eq(bad, [], "cantidades");
  });

  // ── Unidades y escala
  test("1 oz = 29,5735 ml", () => eq(toMl(1, "oz"), 29.5735, "oz→ml"));
  test("Cantidad práctica: 45 ml → 1 ½ oz", () => {
    const p = practicalAmount(45, "ml", "oz");
    eq(p.amount, 1.5, "oz");
    eq(formatAmount(p), "1 ½ oz", "texto");
  });
  test("Cantidad práctica: 1,5 oz → 45 ml", () => eq(practicalAmount(1.5, "oz", "ml").amount, 45, "ml"));
  test("Escala x4 del Cardinale parte de la base", () => {
    const s = scaleRecipe(recById["el-cardinale"], 4, "oz");
    eq(s.lines.map((l) => l.scaled.amount), [6, 4, 4], "cantidades");
  });
  test("Claras se redondean hacia arriba", () => {
    const s = scaleRecipe(recById["pisco-sour"], 3, "ml");
    eq(s.lines.find((l) => l.ingredientId === "egg-white").scaled.amount, 3, "claras");
  });
  test("Regla de juguera solo en sours y desde 5 porciones", () => {
    eq(scaleRecipe(recById["pisco-sour"], 4).preparation.mode, "individual-shake", "4 porciones");
    eq(scaleRecipe(recById["pisco-sour"], 6).preparation.mode, "blender-batch", "6 porciones");
    eq(scaleRecipe(recById["negroni"], 12).preparation.mode, "standard", "negroni");
  });

  // ── Disponibilidad y sustituciones
  test("Cardinale disponible con inventario inicial", () => assert(evaluateRecipe(recById["el-cardinale"], inv0, ingById).canMake, "no disponible"));
  test("Vesper: falta Lillet (sin sustituto disponible exacto)", () => {
    const inv = { ...inv0, "dry-vermouth": { status: "out" } };
    const e = evaluateRecipe(recById["vesper"], inv, ingById);
    eq(e.missingIngredients, ["lillet-blanc"], "faltantes");
  });
  test("Sustitución: Manhattan usa bourbon en lugar de rye", () => {
    const e = evaluateRecipe(recById["manhattan"], inv0, ingById);
    assert(e.canMake && e.usesSubstitutes, "debería poder con sustitución");
    eq(e.substitutions[0].to, "bourbon", "sustituto");
  });
  test("Sin sustituciones: Manhattan pasa a faltante", () => {
    const e = evaluateRecipe(recById["manhattan"], inv0, ingById, { allowSubstitutes: false });
    eq(e.missingCount, 1, "faltantes");
  });
  test("\"Poco\" cuenta como disponible y avisa", () => {
    const inv = { ...inv0, campari: { status: "low" } };
    const e = evaluateRecipe(recById["negroni"], inv, ingById);
    assert(e.canMake, "debería poder");
    eq(e.lowStock, ["campari"], "aviso");
  });
  test("Agotado no cuenta", () => {
    const inv = { ...inv0, campari: { status: "out" } };
    eq(evaluateRecipe(recById["negroni"], inv, ingById).missingIngredients, ["campari"], "faltante");
  });
  test("Opcional no bloquea (clara en Whiskey Sour)", () => {
    const inv = { ...inv0, "egg-white": { status: "out" }, aquafaba: { status: "out" } };
    assert(evaluateRecipe(recById["whiskey-sour"], inv, ingById).canMake, "bloqueó");
  });
  test("Filtros 0/1/2 suman correctamente", () => {
    const ev = evaluateAll(RECIPES, inv0, ingById);
    const n = ["now", "missing1", "missing2"].map((f) => filterByAvailability(ev, f).length);
    const rest = ev.filter((e) => e.missingCount > 2).length;
    eq(n[0] + n[1] + n[2] + rest, RECIPES.length, "suma");
  });
  test("Inventario vacío: nada disponible", () => {
    const empty = Object.fromEntries(INGREDIENTS.map((i) => [i.id, { status: "out" }]));
    eq(filterByAvailability(evaluateAll(RECIPES, empty, ingById), "now").length, 0, "disponibles");
  });
  test("Inventario con ingrediente inexistente no rompe", () => {
    const r = { ...recById["negroni"], ingredients: [...recById["negroni"].ingredients, { ingredientId: "fantasma", amount: 1, unit: "ml", role: "modifier" }] };
    eq(evaluateRecipe(r, inv0, ingById).missingIngredients, ["fantasma"], "faltante");
  });

  // ── Búsqueda
  const ctx = { ingredientsById: ingById, collectionsById: indexById(COLLECTIONS), tagNames: Object.fromEntries([...PROFILE_TAGS.structure, ...PROFILE_TAGS.flavor].map((t) => [t.id, t.name])) };
  test("Búsqueda sin acentos: \"sauco\" encuentra Highland Saúco", () => assert(searchRecipes(RECIPES, "sauco", ctx).some((r) => r.id === "highland-sauco"), "no encontró"));
  test("Búsqueda por ingrediente (alias): \"triple sec\"", () => assert(searchRecipes(RECIPES, "TRIPLE SEC", ctx).some((r) => r.id === "white-lady"), "no encontró"));
  test("Búsqueda por colección: \"martini specs\"", () => assert(searchRecipes(RECIPES, "martini specs", ctx).length >= 5, "pocas"));
  test("Filtro de perfil combinado (amargo + seco)", () => {
    const r = filterByProfile(RECIPES, ["bitter", "dry"]);
    assert(r.length > 0 && r.every((x) => x.profile.includes("bitter") && x.profile.includes("dry")), "filtro");
  });
  test("normalizeText", () => eq(normalizeText("  Satán's TARDE "), "satan's tarde", "texto"));

  // ── Persistencia, migraciones y respaldo
  test("migrateState completa campos faltantes", () => {
    const { state } = migrateState({ schemaVersion: 1, recipes: [] });
    eq(Object.keys(emptyState()).every((k) => k in state), true, "campos");
  });
  test("migrateState rechaza versión futura", () => {
    let threw = false;
    try { migrateState({ schemaVersion: SCHEMA_VERSION + 1 }); } catch { threw = true; }
    assert(threw, "no lanzó");
  });
  const current = { ...emptyState(), inventory: inv0, userState: { negroni: { favorite: true, rating: 4, status: "tested", notes: "" } } };
  test("Exportar → validar → sin cambios", () => {
    const v = validateBackup(JSON.stringify(exportBackup(current)), current, catalog);
    assert(v.ok, v.errors.join("; "));
    eq(v.summary.recipesNew.length, 0, "nuevas");
  });
  test("JSON inválido no rompe", () => {
    const v = validateBackup("{no es json", current, catalog);
    assert(!v.ok && v.errors.length === 1, "debería fallar con un error");
  });
  test("Receta incompleta se rechaza", () => {
    const v = validateBackup({ schemaVersion: 1, recipe: { id: "x", name: "X" } }, current, catalog);
    assert(!v.ok, "aceptó receta incompleta");
  });
  test("Receta duplicada con el catálogo se importa como copia", () => {
    const r = { ...recById["negroni"], name: "Negroni" };
    const v = validateBackup({ schemaVersion: 1, recipe: r }, current, catalog);
    assert(v.ok, v.errors.join("; "));
    const { state } = applyImport(current, v, "merge", catalog);
    eq(state.recipes.map((x) => x.id), ["negroni-importada"], "ids");
  });
  test("Campo desconocido: advierte y no rompe", () => {
    const v = validateBackup({ schemaVersion: 1, recipe: { id: "mi-receta", name: "Mi Receta", method: "shake", ingredients: [{ ingredientId: "gin-london-dry", amount: 2, unit: "oz", role: "base" }], color: "rojo" } }, current, catalog);
    assert(v.ok && v.warnings.some((w) => w.includes("color")), "sin advertencia");
  });
  test("Merge no sobrescribe favoritos existentes", () => {
    const other = { ...current, userState: { negroni: { favorite: false, rating: 1, status: "tested", notes: "" } } };
    const v = validateBackup(exportBackup(other), current, catalog);
    const { state } = applyImport(current, v, "merge", catalog);
    eq(state.userState.negroni.rating, 4, "rating");
  });

  // ── Historial y temporizador
  test("Historial guarda porciones, cantidades y sustituciones reales", () => {
    const r = recById["manhattan"];
    const h = createHistoryEntry(r, evaluateRecipe(r, inv0, ingById), scaleRecipe(r, 2, "ml"), { rating: 4, notes: " ok " });
    eq([h.servings, h.amounts[0].amount, h.amounts[0].usedId, h.substitutions[0].to, h.rating, h.notes], [2, 100, "bourbon", "bourbon", 4, "ok"], "registro");
  });
  test("Rating de sesión fuera de rango queda en 0", () => {
    const r = recById["negroni"];
    eq(createHistoryEntry(r, evaluateRecipe(r, inv0, ingById), scaleRecipe(r, 1), { rating: 9 }).rating, 0, "rating");
  });
  test("Promedio de sesiones ignora preparaciones sin rating", () => {
    const hist = [{ recipeId: "negroni", rating: 4, date: "2026-10-01" }, { recipeId: "negroni", rating: 0, date: "2026-10-02" }, { recipeId: "negroni", rating: 5, date: "2026-10-03" }];
    eq(sessionRatingAverage(hist, "negroni"), 4.5, "promedio");
    eq(historyForRecipe(hist, "negroni")[0].date, "2026-10-03", "orden");
  });
  test("Rating de sesión no modifica el rating general", () => {
    const r = recById["negroni"];
    const before = JSON.stringify(current.userState);
    createHistoryEntry(r, evaluateRecipe(r, inv0, ingById), scaleRecipe(r, 1), { rating: 1 });
    eq(JSON.stringify(current.userState), before, "userState");
  });
  test("Reloj del temporizador", () => eq([formatClock(0), formatClock(15000), formatClock(61000)], ["0:00", "0:15", "1:01"], "formato"));

  // ── Ajustes de intensidad y dulce/seco (reglas v2 aprobadas)
  const amounts = (res) => res.recipe.ingredients.map((l) => l.amount);
  test("Original intacto tras ajustar", () => {
    const before = JSON.stringify(recById["pisco-sour"]);
    adjustRecipe(recById["pisco-sour"], ingById, { intensity: "strong", balance: "dry" });
    eq(JSON.stringify(recById["pisco-sour"]), before, "receta");
  });
  test("Pisco Sour seco: jarabe 15, limón 34,5, pisco y clara iguales", () => {
    eq(amounts(adjustRecipe(recById["pisco-sour"], ingById, { balance: "dry" })), [60, 34.5, 15, 1, 3], "cantidades");
  });
  test("Pisco Sour fuerte: solo pisco +25 %", () => {
    eq(amounts(adjustRecipe(recById["pisco-sour"], ingById, { intensity: "strong" })), [75, 30, 20, 1, 3], "cantidades");
  });
  test("Cardinale seco: sin efecto (vermut dry y Campari no se tocan)", () => {
    const r = adjustRecipe(recById["el-cardinale"], ingById, { balance: "dry" });
    eq(amounts(r), [1.5, 1, 1], "cantidades");
    eq(noEffectNotes(r), ["Dulce/seco sin efecto en esta receta."], "aviso");
  });
  test("Cardinale dulce: sin efecto (no tiene vermut rosso)", () => {
    eq(amounts(adjustRecipe(recById["el-cardinale"], ingById, { balance: "sweet" })), [1.5, 1, 1], "cantidades");
  });
  test("Negroni dulce: solo vermut rosso +33 %", () => {
    eq(amounts(adjustRecipe(recById["negroni"], ingById, { balance: "sweet" })), [30, 30, 39.9], "cantidades");
  });
  test("Perfect Negroni seco: rosso −33 %, dry igual", () => {
    eq(amounts(adjustRecipe(recById["perfect-negroni"], ingById, { balance: "dry" })), [30, 30, 10.05, 15], "cantidades");
  });
  test("Satan's Tarde suave: vermut rosso base −25 %, tónica (top) igual", () => {
    eq(amounts(adjustRecipe(recById["satans-tarde"], ingById, { intensity: "soft" })), [1.125, 0.5, 0.5, 3], "cantidades");
  });
  test("Satan's Tarde dulce: rosso como base no cambia; Cointreau +25 %", () => {
    eq(amounts(adjustRecipe(recById["satans-tarde"], ingById, { balance: "sweet" })), [1.5, 0.625, 0.5, 3], "cantidades");
  });
  test("Americano: intensidad sin efecto (Campari es base protegida)", () => {
    const r = adjustRecipe(recById["americano"], ingById, { intensity: "soft" });
    eq(amounts(r), [30, 30, 30], "cantidades");
    eq(noEffectNotes(r), ["Intensidad sin efecto en esta receta."], "aviso");
  });
  test("Alfonso: espumante (top) nunca cambia; terrón no se fracciona", () => {
    eq(amounts(adjustRecipe(recById["el-alfonso"], ingById, { intensity: "strong", balance: "sweet" })), [1, 4, 15, 100], "cantidades");
  });
  test("Daiquiri seco: azúcar en cucharas de bar −25 %, lima +15 %", () => {
    eq(amounts(adjustRecipe(recById["daiquiri"], ingById, { balance: "dry" })), [60, 23, 1.5], "cantidades");
  });

  // ── Alternativas con cantidad propia (terrón → jarabe)
  test("Old Fashioned sin azúcar: usa 10 ml de jarabe de goma", () => {
    const r = recById["old-fashioned"];
    const ev = evaluateRecipe(r, inv0, ingById);
    assert(ev.canMake && ev.usesSubstitutes, "debería poder con alternativa");
    const ready = applyAlternatives(r, ev);
    const line = ready.ingredients[1];
    eq([line.ingredientId, line.amount, line.unit, line.replacedFrom.unit], ["simple-syrup", 10, "ml", "cube"], "línea");
    eq(r.ingredients[1].ingredientId, "sugar", "original intacto");
  });
  test("Con azúcar disponible se usa el terrón original", () => {
    const inv = { ...inv0, sugar: { status: "available" } };
    const r = recById["old-fashioned"];
    eq(applyAlternatives(r, evaluateRecipe(r, inv, ingById)).ingredients[1].unit, "cube", "unidad");
  });
  test("Alternativa en jarabe sí se ajusta en dulce/seco (Old Fashioned dulce: 12,5 ml)", () => {
    const r = recById["old-fashioned"];
    const ready = applyAlternatives(r, evaluateRecipe(r, inv0, ingById));
    eq(adjustRecipe(ready, ingById, { balance: "sweet" }).recipe.ingredients[1].amount, 12.5, "jarabe");
  });
  test("Daiquiri sin azúcar: 15 ml de jarabe", () => {
    const r = recById["daiquiri"];
    eq(applyAlternatives(r, evaluateRecipe(r, inv0, ingById)).ingredients[2].amount, 15, "jarabe");
  });

  // ── Laboratorio y variantes
  test("Variante: borrador copia el spec y apunta al original", () => {
    const d = newDraft(recById["el-cardinale"], { name: suggestVariantName(recById["el-cardinale"], []) });
    eq([d.name, d.parentId, d.ingredients.length], ["El Cardinale v2", "el-cardinale", 3], "borrador");
    d.ingredients[0].amount = 2;
    eq(recById["el-cardinale"].ingredients[0].amount, 1.5, "original intacto");
  });
  test("Nombre sugerido cuenta solo tus variantes personales", () => {
    eq(suggestVariantName(recById["negroni"], []), "Negroni v2", "sin variantes");
    eq(suggestVariantName(recById["negroni"], [{ id: "x", parentId: "negroni" }]), "Negroni v3", "con una");
  });
  test("Borrador vacío no es válido", () => assert(validateDraft(newDraft(null), ingById).length > 0, "validó vacío"));
  test("Cantidad con coma no válida si no se convirtió a número", () => {
    const d = { ...newDraft(null, { name: "X" }), ingredients: [{ ingredientId: "gin-london-dry", amount: "dos", unit: "ml", role: "base" }] };
    assert(validateDraft(d, ingById).some((e) => e.includes("cantidad")), "aceptó cantidad inválida");
  });
  test("Convertir: id único, fuente personal, parentId y receta válida para respaldo", () => {
    const d = newDraft(recById["negroni"], { name: "Negroni" });
    const r = draftToRecipe(d, new Set(RECIPES.map((x) => x.id)));
    eq([r.id, r.source, r.parentId], ["negroni-2", "personal", "negroni"], "receta");
    const v = validateBackup({ schemaVersion: 1, recipe: r }, current, catalog);
    assert(v.ok && !v.warnings.some((w) => w.includes("desconocidos")), [...v.errors, ...v.warnings].join("; "));
  });
  test("Duplicar borrador crea id nuevo", () => {
    const d = newDraft(recById["negroni"]);
    const c = duplicateDraft(d);
    assert(c.id !== d.id && c.name.endsWith("(copia)"), "duplicado");
  });
  test("slugify sin acentos", () => eq(slugify("Satán's Tarde v2"), "satan-s-tarde-v2", "slug"));

  // ── Comparador de specs
  test("Negroni vs Perfect vs Pajarillo: filas y diferencias", () => {
    const c = compareSpecs([recById["negroni"], recById["perfect-negroni"], recById["negroni-pajarillo"]], ingById);
    eq(c.rows.map((r) => r.ingredientId), ["gin-london-dry", "gin-pajarillo", "campari", "sweet-vermouth", "dry-vermouth"], "orden");
    const row = (id) => c.rows.find((r) => r.ingredientId === id).cells.map((x) => x.diff);
    eq(row("sweet-vermouth"), ["same", "less", "same"], "rosso");
    eq(row("dry-vermouth"), ["absent", "added", "absent"], "dry");
    eq(row("gin-london-dry"), ["same", "same", "removed"], "gin");
    // Negroni IBA: build, cubos, media rodaja. Perfect Negroni: stir, cubo grande, piel de naranja.
    eq(c.summary[1], ["Menos Vermut Rosso (-50 %)", "Agrega Vermut Dry", "Cambia método", "Cambia hielo", "Cambia garnish"], "resumen");
    eq(c.summary[2], ["Cambia Gin London Dry por Gin botánico (Pajarillo)"], "Pajarillo solo cambia el gin");
  });
  test("Compara oz contra ml normalizando (Cardinale 1,5 oz gin > Negroni 30 ml)", () => {
    eq(cellDiff({ amount: 30, unit: "ml" }, { amount: 1.5, unit: "oz" }), "more", "gin");
    eq(cellDiff({ amount: 30, unit: "ml" }, { amount: 1, unit: "oz" }), "same", "1 oz ≈ 30 ml");
  });
  test("Gin intercambiable se resume como cambio", () => {
    const c = compareSpecs([recById["negroni"], recById["negroni-pajarillo"]], ingById);
    eq(c.summary[1][0], "Cambia Gin London Dry por Gin botánico (Pajarillo)", "resumen");
  });
  test("Unidades no convertibles distintas se marcan como otra unidad", () => eq(cellDiff({ amount: 1, unit: "cube" }, { amount: 10, unit: "ml" }), "unit", "diff"));
  test("Selección inicial: desde una variante incluye el original", () => {
    eq(defaultComparison(recById["perfect-negroni"], RECIPES), ["negroni", "perfect-negroni", "negroni-pajarillo"], "ids");
    eq(defaultComparison(recById["dry-martini"], RECIPES)[0], "dry-martini", "raíz");
  });

  // ── ABV, dilución y costo (estimados)
  test("Dry Martini: ABV estimado coherente (stir 42,5 %)", () => {
    const e = estimateAbv(recById["dry-martini"], ingById);
    // (60*0,42 + 10*0,18) / (70*1,425) = 27,0 / 99,75 = 27,1 %
    eq([e.abv, e.dilution.rate, e.volumeMl], [27.1, 0.425, 100], "abv");
  });
  test("Highball baja ABV (Gin Tonic < 20 %)", () => assert(estimateAbv(recById["gin-tonic"], ingById).abv < 20, "abv alto"));
  test("Build sin mixer marca la dilución como supuesto", () => eq(dilutionFor(recById["negroni"]).assumed, true, "supuesto"));
  test("Costo: solo con precios; parcial si faltan", () => {
    const inv = { ...inv0, "gin-london-dry": { status: "available", price: 20000, sizeMl: 750 } };
    const c = estimateCost(recById["dry-martini"], inv);
    eq([c.total, c.complete, c.missingPrices], [1600, false, ["dry-vermouth"]], "costo");
    eq(estimateCost(recById["dry-martini"], inv0).total, null, "sin precios");
  });

  // ── Similitud, ¿Qué tomo hoy? y compras
  test("Similares al Negroni incluyen Perfect Negroni y Negroni Pajarillo primero", () => {
    const top = similarRecipes(recById["negroni"], RECIPES, ingById, {}, 2).map((x) => x.recipe.id).sort();
    eq(top, ["negroni-pajarillo", "perfect-negroni"], "top 2");
  });
  test("¿Qué tomo hoy? solo sugiere lo que se puede preparar", () => {
    const s = whatToDrink({ recipes: RECIPES, inventory: inv0, ingredientsById: ingById, userState: {}, history: [], seed: 1 });
    const ev = Object.fromEntries(evaluateAll(RECIPES, inv0, ingById).map((e) => [e.recipeId, e.canMake]));
    assert(s.length === 3 && s.every((x) => ev[x.recipe.id]), "sugerencias");
  });
  test("¿Qué tomo hoy? penaliza lo preparado ayer", () => {
    const now = new Date("2026-10-07T20:00:00");
    const us = { "el-cardinale": { favorite: true, rating: 5, status: "tested" } };
    const base = whatToDrink({ recipes: RECIPES, inventory: inv0, ingredientsById: ingById, userState: us, history: [], seed: 3, now, n: 36 });
    const after = whatToDrink({ recipes: RECIPES, inventory: inv0, ingredientsById: ingById, userState: us, history: [{ recipeId: "el-cardinale", date: "2026-10-06T21:00:00", rating: 5 }], seed: 3, now, n: 36 });
    const pos = (l) => l.findIndex((x) => x.recipe.id === "el-cardinale");
    assert(pos(after) > pos(base), `posición ${pos(base)} → ${pos(after)}`);
  });
  test("¿Qué tomo hoy? cambia con la semilla (variedad)", () => {
    const ids = (seed) => whatToDrink({ recipes: RECIPES, inventory: inv0, ingredientsById: ingById, userState: {}, history: [], seed }).map((x) => x.recipe.id).join();
    assert(new Set([1, 2, 3, 4, 5].map(ids)).size > 1, "siempre igual");
  });
  test("\"Otra sugerencia\" no repite lo ya mostrado", () => {
    const args = { recipes: RECIPES, inventory: inv0, ingredientsById: ingById, userState: { "el-cardinale": { favorite: true, rating: 5, status: "tested" } }, history: [], seed: 1 };
    const first = whatToDrink(args).map((x) => x.recipe.id);
    const second = whatToDrink({ ...args, seed: 2, exclude: first }).map((x) => x.recipe.id);
    assert(second.length === 3 && second.every((id) => !first.includes(id)), `${first} / ${second}`);
  });
  test("Filtro de perfil en ¿Qué tomo hoy?", () => {
    const s = whatToDrink({ recipes: RECIPES, inventory: inv0, ingredientsById: ingById, userState: {}, history: [], profile: ["sour"], seed: 1 });
    assert(s.length > 0 && s.every((x) => x.recipe.profile.includes("sour")), "perfil");
  });
  test("Compras: Lillet mejora el Vesper (hoy con sustituto); ingredientes en barra no aparecen", () => {
    const sug = shoppingSuggestions(RECIPES, inv0, ingById, INGREDIENTS.map((i) => i.id));
    const lillet = sug.find((x) => x.ingredientId === "lillet-blanc");
    // El Vesper ya sale con vermut dry como sustituto: Lillet no lo desbloquea, lo mejora.
    assert(lillet && lillet.unlocks.length === 0 && lillet.upgrades.includes("vesper"), "lillet");
    assert(!sug.some((x) => inv0[x.ingredientId].status === "available"), "sugiere algo que ya hay");
  });
  test("Compras: sacar Campari y sugerirlo desbloquea varias recetas", () => {
    const inv = { ...inv0, campari: { status: "out" } };
    const top = shoppingSuggestions(RECIPES, inv, ingById, INGREDIENTS.map((i) => i.id))[0];
    assert(top.ingredientId === "campari" && top.unlocks.length >= 8, `${top.ingredientId} ${top.unlocks.length}`);
  });

  return results;
}
