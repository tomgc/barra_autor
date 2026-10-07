// HISTORY (§19). Cada preparación es un registro inmutable con su propio rating de sesión,
// distinto del rating general de la receta (que vive en userState).

export const DEFAULT_ADJUSTMENTS = { intensity: "standard", balance: "balance" };

export function newId(prefix) {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now().toString(36)}-${rand}`;
}

/**
 * Crea un registro de preparación.
 * @param recipe      receta preparada
 * @param evaluation  resultado de evaluateRecipe (para guardar sustituciones reales)
 * @param scaled      resultado de scaleRecipe (cantidades usadas)
 * @param session     { rating (0-5), notes, adjustments }
 */
export function createHistoryEntry(recipe, evaluation, scaled, session = {}, date = new Date()) {
  const rating = Number(session.rating);
  return {
    id: newId("h"),
    date: date.toISOString(),
    recipeId: recipe.id,
    recipeName: recipe.name,
    servings: scaled.servings,
    amounts: scaled.lines.map((l, i) => ({
      ingredientId: l.ingredientId,
      usedId: evaluation.lines[i]?.usedId ?? null,
      amount: l.scaled.amount,
      unit: l.scaled.unit
    })),
    adjustments: { ...DEFAULT_ADJUSTMENTS, ...(session.adjustments ?? {}) },
    substitutions: evaluation.substitutions.map((s) => ({ ...s })),
    rating: Number.isInteger(rating) && rating >= 0 && rating <= 5 ? rating : 0,
    notes: String(session.notes ?? "").trim()
  };
}

/** Preparaciones de una receta, más recientes primero. */
export function historyForRecipe(history, recipeId) {
  return history.filter((h) => h.recipeId === recipeId).sort((a, b) => b.date.localeCompare(a.date));
}

/** Últimas n preparaciones de toda la barra. */
export function recentHistory(history, n = 5) {
  return [...history].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}

/** Promedio de ratings de sesión (ignora 0 = sin rating). Devuelve null si no hay datos. */
export function sessionRatingAverage(history, recipeId) {
  const rated = history.filter((h) => h.recipeId === recipeId && h.rating > 0);
  if (!rated.length) return null;
  return Math.round((rated.reduce((s, h) => s + h.rating, 0) / rated.length) * 10) / 10;
}
