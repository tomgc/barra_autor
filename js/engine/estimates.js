// ABV ENGINE + DILUTION ENGINE + COSTO (§27, §28, §29). Todo es estimación, nunca medición.
//
// Dilución por método, según Cocktails & Bars (C. Mossati, 2018), "How to Calculate Dilution for
// Pre-Batched Cocktails": stirred 40-45 % (se usa 42,5 %), shaken ~30 %, con espumante/soda ~20 %.
// Build sin mixer (sobre hielo) no aparece en esa fuente: se asume 20 % y se marca como supuesto.

import { nominalMl } from "../units.js";

export const DILUTION_SOURCE = "Cocktails & Bars (2018): stir 40-45 %, shake ~30 %, con soda o espumante ~20 %.";

export function dilutionFor(recipe) {
  const hasTop = recipe.ingredients.some((l) => l.top || l.role === "mixer");
  if (recipe.method === "stir") return { rate: 0.425, assumed: false, label: "stir" };
  if (recipe.method === "shake") return { rate: 0.3, assumed: false, label: "shake" };
  if (hasTop) return { rate: 0.2, assumed: false, label: "highball" };
  return { rate: 0.2, assumed: true, label: "build" };
}

/** Dilución cualitativa para mostrar (§29): baja < 25 %, media < 35 %, alta desde 35 %. */
export function dilutionLevel(rate) {
  return rate < 0.25 ? "low" : rate < 0.35 ? "medium" : "high";
}

/**
 * ABV estimado del cóctel servido.
 * Devuelve { abv (%), volumeMl (con dilución), alcoholMl, dilution, missingAbv[] } o null si no hay volumen.
 * Ingredientes sin abv conocido se informan en missingAbv y se cuentan como 0 %.
 */
export function estimateAbv(recipe, ingredientsById) {
  let volume = 0;
  let alcohol = 0;
  const missingAbv = [];
  for (const line of recipe.ingredients) {
    const ml = nominalMl(line.amount, line.unit);
    const ing = ingredientsById[line.ingredientId];
    if (ing?.abv == null) missingAbv.push(line.ingredientId);
    volume += ml;
    alcohol += ml * ((ing?.abv ?? 0) / 100);
  }
  if (volume <= 0) return null;
  const dilution = dilutionFor(recipe);
  // La soda/tónica (top) ya es agua: la dilución por hielo se aplica sobre la mezcla completa igual,
  // como hace la fuente para tragos con soda (~20 %).
  const finalVolume = volume * (1 + dilution.rate);
  return {
    abv: Math.round((alcohol / finalVolume) * 1000) / 10,
    volumeMl: Math.round(finalVolume),
    alcoholMl: Math.round(alcohol * 10) / 10,
    dilution,
    missingAbv
  };
}

/** Clase de ABV para filtros: low < 10 %, standard 10-25 %, strong > 25 %. */
export function abvClass(abv) {
  return abv < 10 ? "low" : abv <= 25 ? "standard" : "strong";
}

/**
 * Costo estimado por cóctel (§27). Precios en inventory[id] = { price, sizeMl }.
 * Devuelve { total, complete, lines[], missingPrices[] }. Opcional: si nada tiene precio, total = null.
 */
export function estimateCost(recipe, inventory) {
  const lines = [];
  const missingPrices = [];
  let total = 0;
  let priced = 0;
  for (const line of recipe.ingredients) {
    const inv = inventory?.[line.ingredientId] ?? {};
    const ml = nominalMl(line.amount, line.unit);
    if (inv.price > 0 && inv.sizeMl > 0) {
      const cost = (ml / inv.sizeMl) * inv.price;
      lines.push({ ingredientId: line.ingredientId, cost });
      total += cost;
      priced += 1;
    } else if (ml > 0) {
      missingPrices.push(line.ingredientId);
    }
  }
  return {
    total: priced ? Math.round(total) : null,
    complete: missingPrices.length === 0 && priced > 0,
    lines,
    missingPrices
  };
}
