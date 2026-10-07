// MATCHING ENGINE + SUBSTITUTION ENGINE (§7, §8, §26).
// Funciones puras: reciben receta, inventario e índice de ingredientes; no leen estado global.
//
// Inventario: { [ingredientId]: { status: "available" | "low" | "out", price?: number } }
// Un ingrediente "low" cuenta como disponible (§26) pero se informa con aviso.

export const MATCH = { EXACT: "exact", SUBSTITUTE: "substitute", MISSING: "missing" };

export function isAvailable(inventory, ingredientId) {
  const status = inventory?.[ingredientId]?.status;
  return status === "available" || status === "low";
}

/** Resuelve un ingrediente de receta contra el inventario. */
export function resolveIngredient(line, inventory, ingredientsById) {
  const id = line.ingredientId;
  if (isAvailable(inventory, id)) {
    return { ...line, match: MATCH.EXACT, usedId: id, low: inventory[id].status === "low" };
  }
  // Alternativas con cantidad propia definidas en la receta (p. ej. terrón → jarabe en ml).
  const alt = (line.alternatives ?? []).find((a) => isAvailable(inventory, a.ingredientId));
  if (alt) {
    return { ...line, match: MATCH.SUBSTITUTE, usedId: alt.ingredientId, alternative: alt, substituteNote: alt.note ?? "", low: inventory[alt.ingredientId].status === "low" };
  }
  const subs = ingredientsById[id]?.substitutes ?? [];
  const sub = subs.find((s) => isAvailable(inventory, s.id));
  if (sub) {
    return { ...line, match: MATCH.SUBSTITUTE, usedId: sub.id, substituteNote: sub.note ?? "", low: inventory[sub.id].status === "low" };
  }
  return { ...line, match: MATCH.MISSING, usedId: null, low: false };
}

/**
 * Evalúa una receta. Los ingredientes opcionales nunca bloquean ni cuentan como faltantes.
 * @param {object} options.allowSubstitutes si es false, una sustitución cuenta como faltante.
 */
export function evaluateRecipe(recipe, inventory, ingredientsById, { allowSubstitutes = true } = {}) {
  const lines = recipe.ingredients.map((line) => {
    const r = resolveIngredient(line, inventory, ingredientsById);
    if (!allowSubstitutes && r.match === MATCH.SUBSTITUTE) return { ...r, match: MATCH.MISSING, usedId: null };
    return r;
  });
  const required = lines.filter((l) => !l.optional);
  const missing = required.filter((l) => l.match === MATCH.MISSING);
  const substitutions = lines.filter((l) => l.match === MATCH.SUBSTITUTE);
  return {
    recipeId: recipe.id,
    lines,
    requiredIngredients: required.map((l) => l.ingredientId),
    availableIngredients: required.filter((l) => l.match !== MATCH.MISSING).map((l) => l.ingredientId),
    missingIngredients: missing.map((l) => l.ingredientId),
    missingCount: missing.length,
    canMake: missing.length === 0,
    usesSubstitutes: substitutions.length > 0 && missing.length === 0,
    substitutions: substitutions.map((l) => ({ from: l.ingredientId, to: l.usedId, note: l.substituteNote })),
    lowStock: lines.filter((l) => l.low).map((l) => l.usedId)
  };
}

export function evaluateAll(recipes, inventory, ingredientsById, options) {
  return recipes.map((r) => evaluateRecipe(r, inventory, ingredientsById, options));
}

/** Filtros de disponibilidad (§7): "now" | "missing1" | "missing2" | "all". */
export function filterByAvailability(evaluations, filter) {
  switch (filter) {
    case "now": return evaluations.filter((e) => e.missingCount === 0);
    case "missing1": return evaluations.filter((e) => e.missingCount === 1);
    case "missing2": return evaluations.filter((e) => e.missingCount === 2);
    default: return evaluations;
  }
}

/** Inventario inicial a partir del catálogo (§5). */
export function initialInventory(ingredients) {
  return Object.fromEntries(
    ingredients.map((i) => [i.id, { status: i.inInitialInventory ? "available" : "out" }])
  );
}

/**
 * Receta lista para preparar con el inventario actual: reemplaza las líneas que usan una alternativa
 * con cantidad propia (ingrediente, cantidad y unidad de la alternativa). La receta original no cambia.
 * Las líneas reemplazadas llevan replacedFrom con la línea original.
 */
export function applyAlternatives(recipe, evaluation) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((line, i) => {
      const alt = evaluation.lines[i]?.alternative;
      if (!alt) return line;
      const { alternatives, ...rest } = line;
      return { ...rest, ingredientId: alt.ingredientId, amount: alt.amount, unit: alt.unit, replacedFrom: { ingredientId: line.ingredientId, amount: line.amount, unit: line.unit }, alternativeNote: alt.note ?? "" };
    })
  };
}
