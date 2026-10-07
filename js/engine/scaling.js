// SCALING ENGINE (§12, §15). Siempre parte de la receta base; nunca guarda copias escaladas.
import { practicalAmount } from "../units.js";

export const SERVING_OPTIONS = [1, 2, 4, 6, 12, 15];
export const BATCH_THRESHOLD = 5;

/**
 * Escala una receta y devuelve líneas listas para mostrar.
 * Las claras y unidades se redondean hacia arriba (no existe media clara útil).
 * @param {string} targetUnit "ml" | "oz"
 */
export function scaleRecipe(recipe, servings, targetUnit = "ml") {
  const n = Number.isFinite(servings) && servings > 0 ? servings : 1;
  const lines = recipe.ingredients.map((line) => {
    const raw = line.amount * n;
    const amount = line.unit === "unit" || line.unit === "cube" ? Math.ceil(raw) : raw;
    return { ...line, scaled: practicalAmount(amount, line.unit, targetUnit) };
  });
  return { recipeId: recipe.id, servings: n, lines, preparation: preparationMode(recipe, n) };
}

/**
 * Regla de juguera (§15): solo para recetas marcadas batch: "sour".
 * 1 a 4 porciones: shake individual. 5 o más: tandas en juguera.
 */
export function preparationMode(recipe, servings) {
  if (recipe.batch !== "sour") return { mode: "standard", text: "" };
  if (servings < BATCH_THRESHOLD) {
    return { mode: "individual-shake", text: "Shake individual por porción." };
  }
  return { mode: "blender-batch", text: "Preparación por tandas en juguera." };
}
