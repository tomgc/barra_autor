// BALANCE ENGINE + INTENSITY (§13, §14). Reglas aprobadas por Tomás el 2026-10-07 (v2).
// Nunca modifica la receta original: devuelve una copia ajustada y la lista de cambios.
//
// Intensidad: solo líneas con role "base" (aunque no sea destilado), excepto si completan el vaso (top).
// Dulce/seco: solo ingredientes con balanceClass; el vermut rosso solo cuando es modificador (no base).
// Protegidos siempre: amargos, vinos aperitivo, bitters, clara/aquafaba, mixers y líneas top.

import { clone } from "../util.js";

export const INTENSITY_LEVELS = [
  { id: "soft", label: "Suave" },
  { id: "standard", label: "Estándar" },
  { id: "strong", label: "Fuerte" }
];
export const BALANCE_LEVELS = [
  { id: "dry", label: "Ácido/Seco" },
  { id: "balance", label: "Balance" },
  { id: "sweet", label: "Dulce" }
];

export const RULES = {
  intensity: {
    soft: 0.75,
    standard: 1,
    strong: 1.25
  },
  balance: {
    dry: { syrup: 0.75, "sweet-liqueur": 0.75, "sweet-vermouth": 0.67, citrus: 1.15 },
    balance: {},
    sweet: { syrup: 1.25, "sweet-liqueur": 1.25, "sweet-vermouth": 1.33 }
  }
};

const PROTECTED_FAMILIES = new Set(["bitter-liqueur", "amaro", "aperitif-wine", "bitters", "wine"]);
const PROTECTED_CATEGORIES = new Set(["bitters", "mixer", "other"]);

/** Un ingrediente protegido nunca cambia con ningún ajuste. */
export function isProtected(line, ingredient) {
  if (line.top) return true;
  if (!ingredient) return true;
  return PROTECTED_CATEGORIES.has(ingredient.category) || PROTECTED_FAMILIES.has(ingredient.spiritFamily);
}

/** Factor que aplica a una línea según los ajustes elegidos, con el motivo. */
export function lineFactor(line, ingredient, { intensity = "standard", balance = "balance" } = {}, { intensityBlocked = false } = {}) {
  if (isProtected(line, ingredient)) return { factor: 1, reasons: [] };
  let factor = 1;
  const reasons = [];
  if (line.role === "base" && !intensityBlocked) {
    const f = RULES.intensity[intensity] ?? 1;
    if (f !== 1) { factor *= f; reasons.push("intensity"); }
  }
  const cls = ingredient.balanceClass;
  const isSweetVermouthAsBase = cls === "sweet-vermouth" && line.role === "base";
  // Un terrón no se fracciona: el ajuste dulce/seco no aplica a cantidades en terrones.
  if (cls && !isSweetVermouthAsBase && line.unit !== "cube") {
    const f = RULES.balance[balance]?.[cls] ?? 1;
    if (f !== 1) { factor *= f; reasons.push("balance"); }
  }
  return { factor, reasons };
}

/**
 * Aplica intensidad y balance sobre la receta original.
 * Devuelve { recipe (copia ajustada), changes, effect: { intensity, balance }, adjustments }.
 */
export function adjustRecipe(recipe, ingredientsById, adjustments = {}) {
  const adj = { intensity: adjustments.intensity ?? "standard", balance: adjustments.balance ?? "balance" };
  const adjusted = clone(recipe);
  const changes = [];
  const effect = { intensity: false, balance: false };
  // Si una base es protegida (p. ej. Campari en el Americano), escalar solo la otra base desbalancearía la receta:
  // la intensidad queda sin efecto para toda la receta.
  const intensityBlocked = recipe.ingredients.some(
    (l) => l.role === "base" && !l.top && isProtected(l, ingredientsById[l.ingredientId])
  );
  adjusted.ingredients = recipe.ingredients.map((line, index) => {
    const { factor, reasons } = lineFactor(line, ingredientsById[line.ingredientId], adj, { intensityBlocked });
    if (factor === 1) return { ...line };
    reasons.forEach((r) => { effect[r] = true; });
    const amount = Math.round(line.amount * factor * 1000) / 1000;
    changes.push({ index, ingredientId: line.ingredientId, from: line.amount, to: amount, unit: line.unit, factor, reasons });
    return { ...line, amount, originalAmount: line.amount };
  });
  return { recipe: adjusted, changes, effect, adjustments: adj };
}

/** ¿Algún ajuste distinto del estándar no tiene efecto en esta receta? Para avisar "sin efecto". */
export function noEffectNotes(result) {
  const notes = [];
  if (result.adjustments.intensity !== "standard" && !result.effect.intensity) notes.push("Intensidad sin efecto en esta receta.");
  if (result.adjustments.balance !== "balance" && !result.effect.balance) notes.push("Dulce/seco sin efecto en esta receta.");
  return notes;
}
