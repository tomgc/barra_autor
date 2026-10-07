// BUSCADOR (§10) y filtros de perfil (§9). Tolerante a mayúsculas y acentos.
import { normalizeText } from "../util.js";

/** Tags derivados del método, para que "stirred"/"shaken" no se contradigan con recipe.method. */
export function effectiveProfile(recipe) {
  const derived = recipe.method === "stir" ? ["stirred"] : recipe.method === "shake" ? ["shaken"] : [];
  return [...recipe.profile, ...derived];
}

/** Texto indexable de una receta: nombre, familia, base, ingredientes (con alias), colecciones y perfil. */
export function searchableText(recipe, ingredientsById, collectionsById, tagNames) {
  const parts = [recipe.name, recipe.family, recipe.baseSpirit];
  for (const line of recipe.ingredients) {
    const ing = ingredientsById[line.ingredientId];
    if (ing) parts.push(ing.name, ...(ing.aliases ?? []));
  }
  for (const c of recipe.collections) parts.push(collectionsById[c]?.name ?? c);
  for (const t of effectiveProfile(recipe)) parts.push(t, tagNames[t] ?? "");
  return normalizeText(parts.join(" "));
}

/** Todos los términos de la consulta deben aparecer (AND). Consulta vacía devuelve todo. */
export function searchRecipes(recipes, query, ctx) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return recipes;
  return recipes.filter((r) => {
    const text = searchableText(r, ctx.ingredientsById, ctx.collectionsById, ctx.tagNames);
    return terms.every((t) => text.includes(t));
  });
}

/** Filtro combinado de perfiles: la receta debe tener TODOS los tags seleccionados. */
export function filterByProfile(recipes, tags) {
  if (!tags?.length) return recipes;
  return recipes.filter((r) => {
    const p = effectiveProfile(r);
    return tags.every((t) => p.includes(t));
  });
}
