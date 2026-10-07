// COMPARADOR DE SPECS (§22). Compara 2 o 3 recetas contra la primera (referencia).
// Las cantidades en ml y oz se normalizan a ml para comparar; otras unidades se comparan solo si coinciden.

import { toMl } from "../units.js";

const ROLE_ORDER = ["base", "modifier", "sweetener", "acid", "bitters", "texture", "mixer"];
const TOLERANCE_ML = 0.5;

function comparable(line) {
  if (!line) return null;
  const ml = toMl(line.amount, line.unit);
  return ml != null ? { value: ml, unit: "ml" } : { value: line.amount, unit: line.unit };
}

/** Diferencia de una celda respecto de la referencia: "same" | "more" | "less" | "added" | "removed" | "unit" | "absent". */
export function cellDiff(refLine, line) {
  if (!refLine && !line) return "absent";
  if (!refLine) return "added";
  if (!line) return "removed";
  const a = comparable(refLine);
  const b = comparable(line);
  if (a.unit !== b.unit) return "unit";
  const tol = a.unit === "ml" ? TOLERANCE_ML : 0.001;
  if (Math.abs(b.value - a.value) <= tol) return "same";
  return b.value > a.value ? "more" : "less";
}

/**
 * @returns {{ rows: Array<{ingredientId, role, cells: Array<{line, diff}>}>, facts: Array<{key, values, differs}>, summary: Array<string[]> }}
 * summary[i] lista los cambios de la receta i respecto de la referencia (vacía para la referencia).
 */
export function compareSpecs(recipes, ingredientsById) {
  const order = [];
  const roleOf = {};
  for (const r of recipes) {
    for (const l of r.ingredients) {
      if (!order.includes(l.ingredientId)) { order.push(l.ingredientId); roleOf[l.ingredientId] = l.role; }
    }
  }
  const firstSeen = new Map(order.map((id, i) => [id, i]));
  const rank = (role) => { const i = ROLE_ORDER.indexOf(role); return i === -1 ? ROLE_ORDER.length : i; };
  order.sort((a, b) => (rank(roleOf[a]) - rank(roleOf[b])) || (firstSeen.get(a) - firstSeen.get(b)));
  const firstLine = (r, id) => r.ingredients.find((l) => l.ingredientId === id) ?? null;

  const rows = order.map((id) => {
    const ref = firstLine(recipes[0], id);
    return {
      ingredientId: id,
      role: roleOf[id],
      cells: recipes.map((r, i) => {
        const line = firstLine(r, id);
        return { line, diff: i === 0 ? (line ? "same" : "absent") : cellDiff(ref, line) };
      })
    };
  });

  const factKeys = [
    ["method", (r) => r.method],
    ["glass", (r) => r.glass],
    ["ice", (r) => r.ice?.serve],
    ["garnish", (r) => r.garnish]
  ];
  const facts = factKeys.map(([key, get]) => {
    const values = recipes.map((r) => get(r) ?? "");
    return { key, values, differs: values.some((v) => v !== values[0]) };
  });

  const name = (id) => ingredientsById[id]?.name ?? id;
  const summary = recipes.map((r, i) => {
    if (i === 0) return [];
    const out = [];
    // Un ingrediente quitado y otro agregado que son sustitutos entre sí se informan como cambio ("Gin London Dry por Pajarillo").
    const removed = rows.filter((row) => row.cells[i].diff === "removed").map((row) => row.ingredientId);
    const added = rows.filter((row) => row.cells[i].diff === "added").map((row) => row.ingredientId);
    const swaps = new Map();
    for (const r of removed) {
      const a = added.find((x) => !swaps.has(x) && [...swaps.values()].indexOf(x) === -1 && (ingredientsById[r]?.substitutes ?? []).some((s) => s.id === x));
      if (a) swaps.set(r, a);
    }
    const swappedIn = new Set(swaps.values());
    for (const row of rows) {
      const c = row.cells[i];
      const refLine = row.cells[0].line;
      if (c.diff === "added" && swappedIn.has(row.ingredientId)) continue;
      if (c.diff === "removed" && swaps.has(row.ingredientId)) out.push(`Cambia ${name(row.ingredientId)} por ${name(swaps.get(row.ingredientId))}`);
      else if (c.diff === "added") out.push(`Agrega ${name(row.ingredientId)}`);
      else if (c.diff === "removed") out.push(`Sin ${name(row.ingredientId)}`);
      else if (c.diff === "more" || c.diff === "less") {
        const a = comparable(refLine).value;
        const b = comparable(c.line).value;
        const pct = Math.round(((b - a) / a) * 100);
        out.push(`${c.diff === "more" ? "Más" : "Menos"} ${name(row.ingredientId)} (${pct > 0 ? "+" : ""}${pct} %)`);
      } else if (c.diff === "unit") out.push(`${name(row.ingredientId)} en otra unidad`);
    }
    for (const f of facts) if (f.values[i] !== f.values[0]) out.push(`Cambia ${FACT_LABELS[f.key].toLowerCase()}`);
    return out;
  });

  return { rows, facts, summary };
}

export const FACT_LABELS = { method: "Método", glass: "Cristalería", ice: "Hielo", garnish: "Garnish" };

/** Selección inicial para comparar desde una receta: original, la receta y otra variante de la misma familia. */
export function defaultComparison(recipe, allRecipes) {
  const byId = Object.fromEntries(allRecipes.map((r) => [r.id, r]));
  const root = recipe.parentId && byId[recipe.parentId] ? byId[recipe.parentId] : recipe;
  const family = allRecipes.filter((r) => r.parentId === root.id && r.id !== recipe.id);
  const ids = [root.id];
  if (recipe.id !== root.id) ids.push(recipe.id);
  for (const r of family) if (ids.length < 3) ids.push(r.id);
  return ids;
}
