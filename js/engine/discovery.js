// RECOMMENDATION ENGINE + SHOPPING ENGINE (§23, §24, §25). Funciones puras.

import { evaluateAll } from "./matching.js";
import { effectiveProfile } from "./search.js";

// ───────── Similitud (§23) ─────────

export const SIMILARITY_WEIGHTS = { ingredients: 0.35, profile: 0.25, family: 0.15, base: 0.15, method: 0.1 };

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size && !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / (A.size + B.size - inter);
}

/** Ingrediente canónico: un ingrediente y sus sustitutos cuentan como el mismo (gin London ↔ Pajarillo). */
function canonical(id, ingredientsById) {
  const group = [id, ...(ingredientsById[id]?.substitutes ?? []).map((s) => s.id)].sort();
  return group[0];
}

export function similarity(a, b, ingredientsById) {
  const ia = a.ingredients.map((l) => canonical(l.ingredientId, ingredientsById));
  const ib = b.ingredients.map((l) => canonical(l.ingredientId, ingredientsById));
  const w = SIMILARITY_WEIGHTS;
  return (
    w.ingredients * jaccard(ia, ib) +
    w.profile * jaccard(effectiveProfile(a), effectiveProfile(b)) +
    w.family * (a.family && a.family === b.family ? 1 : 0) +
    w.base * (a.baseSpirit && a.baseSpirit === b.baseSpirit ? 1 : 0) +
    w.method * (a.method === b.method ? 1 : 0)
  );
}

/**
 * "Si te gusta este cóctel…": las n recetas más parecidas.
 * El rating personal suma hasta +0,1 (prefiere lo que ya te gustó); 1-2 estrellas restan 0,1.
 */
export function similarRecipes(recipe, all, ingredientsById, userState = {}, n = 4) {
  return all
    .filter((r) => r.id !== recipe.id)
    .map((r) => {
      const rating = userState[r.id]?.rating ?? 0;
      const ratingAdj = rating >= 4 ? 0.1 * (rating / 5) : rating > 0 && rating <= 2 ? -0.1 : 0;
      return { recipe: r, score: similarity(recipe, r, ingredientsById) + ratingAdj };
    })
    .sort((x, y) => y.score - x.score || x.recipe.name.localeCompare(y.recipe.name, "es"))
    .slice(0, n);
}

// ───────── ¿Qué tomo hoy? (§24) ─────────

/** PRNG determinista (mulberry32) para que la sugerencia cambie por día o al pedir otra, sin ser siempre la misma. */
export function seededRandom(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function daySeed(date = new Date(), offset = 0) {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() + offset * 7919;
}

/**
 * Sugerencias para hoy entre lo que se puede preparar.
 * Puntaje: favorito +0,3 · rating (general o promedio de sesiones) hasta +0,25 · pendiente de probar +0,15 ·
 * perfil elegido +0,3 · azar del día hasta +0,25 · preparado hace ≤3 días −0,6, ≤7 días −0,3.
 */
export function whatToDrink({ recipes, inventory, ingredientsById, userState, history, profile = [], seed = daySeed(), now = new Date(), n = 3, exclude = [] }) {
  const rand = seededRandom(seed);
  const evals = evaluateAll(recipes, inventory, ingredientsById);
  const can = new Set(evals.filter((e) => e.canMake).map((e) => e.recipeId));
  const lastMade = {};
  for (const h of history) {
    const t = new Date(h.date).getTime();
    if (!lastMade[h.recipeId] || t > lastMade[h.recipeId]) lastMade[h.recipeId] = t;
  }
  const day = 86400000;
  return recipes
    // exclude: lo ya mostrado con "Otra sugerencia", para no repetir siempre los mismos (§24).
    .filter((r) => can.has(r.id) && !exclude.includes(r.id))
    .map((r) => {
      const u = userState[r.id] ?? {};
      const sessions = history.filter((h) => h.recipeId === r.id && h.rating > 0);
      const rating = u.rating || (sessions.length ? sessions.reduce((s, h) => s + h.rating, 0) / sessions.length : 0);
      const p = effectiveProfile(r);
      const profileMatch = profile.length ? (profile.every((t) => p.includes(t)) ? 1 : 0) : 0;
      const ago = lastMade[r.id] != null ? (now.getTime() - lastMade[r.id]) / day : Infinity;
      const recency = ago <= 3 ? -0.6 : ago <= 7 ? -0.3 : 0;
      const reasons = [];
      if (u.favorite) reasons.push("favorito");
      if (rating >= 4) reasons.push(`${Math.round(rating)}★`);
      if (u.status !== "tested") reasons.push("por probar");
      if (profileMatch) reasons.push("tu perfil de hoy");
      const score = (u.favorite ? 0.3 : 0) + 0.25 * (rating / 5) + (u.status !== "tested" ? 0.15 : 0) + 0.3 * profileMatch + 0.25 * rand() + recency;
      return { recipe: r, score, reasons };
    })
    .filter((x) => !profile.length || x.reasons.includes("tu perfil de hoy"))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

// ───────── ¿Qué debería comprar? (§25) ─────────

/**
 * Para cada ingrediente que no tienes, cuántas recetas nuevas desbloquea si lo compras.
 * Considera sustituciones. Orden: recetas desbloqueadas / costo (si hay precio), luego desbloqueadas.
 * Devuelve [{ ingredientId, unlocks: [recipeId], upgrades: [recipeId], price, ratio }].
 * upgrades = recetas que hoy salen con sustitución y pasarían a hacerse con el original.
 */
export function shoppingSuggestions(recipes, inventory, ingredientsById, allIngredientIds) {
  const evBefore = evaluateAll(recipes, inventory, ingredientsById);
  const before = new Set(evBefore.filter((e) => e.canMake).map((e) => e.recipeId));
  const withSubs = new Set(evBefore.filter((e) => e.canMake && e.usesSubstitutes).map((e) => e.recipeId));
  const candidates = allIngredientIds.filter((id) => !["available", "low"].includes(inventory[id]?.status));
  const out = [];
  for (const id of candidates) {
    const inv = { ...inventory, [id]: { ...(inventory[id] ?? {}), status: "available" } };
    const evAfter = evaluateAll(recipes, inv, ingredientsById);
    const unlocks = evAfter.filter((e) => e.canMake && !before.has(e.recipeId)).map((e) => e.recipeId);
    // Recetas que ya se podían con sustitución y pasan a hacerse con el ingrediente original.
    const upgrades = evAfter.filter((e) => withSubs.has(e.recipeId) && !e.usesSubstitutes).map((e) => e.recipeId);
    if (!unlocks.length && !upgrades.length) continue;
    const price = inventory[id]?.price > 0 ? inventory[id].price : null;
    out.push({ ingredientId: id, unlocks, upgrades, price, ratio: price && unlocks.length ? unlocks.length / price : null });
  }
  return out.sort((a, b) => {
    if (a.ratio != null && b.ratio != null && a.ratio !== b.ratio) return b.ratio - a.ratio;
    return b.unlocks.length - a.unlocks.length || b.upgrades.length - a.upgrades.length || a.ingredientId.localeCompare(b.ingredientId);
  });
}
