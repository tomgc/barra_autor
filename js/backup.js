// IMPORT / EXPORT (§34, §47, §48). Nunca sobrescribe en silencio:
// validateBackup() produce un resumen; applyImport() solo se llama tras la confirmación del usuario.

import { SCHEMA_VERSION, migrateState } from "./storage.js";
import { clone, isoDate } from "./util.js";

const STATE_FIELDS = ["schemaVersion", "inventory", "recipes", "customIngredients", "userState", "preferences", "history", "lab"];
const RECIPE_REQUIRED = ["id", "name", "ingredients", "method"];
const RECIPE_KNOWN = new Set([
  "id", "name", "family", "category", "collections", "baseSpirit", "ingredients", "method", "ice", "glass", "garnish",
  "profile", "abvClass", "difficulty", "dilution", "source", "validation", "status", "favorite", "rating", "notes",
  "origin", "specNote", "references", "parentId", "batch", "image", "createdAt", "updatedAt", "version", "fromDraft"
]);
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function backupFileName(date = new Date()) {
  return `mi-barra-de-autor-backup-${isoDate(date)}.json`;
}

/** Objeto de respaldo completo (§34). */
export function exportBackup(state, meta = {}) {
  return {
    app: "mi-barra-de-autor",
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    ...meta,
    inventory: clone(state.inventory),
    recipes: clone(state.recipes),
    customIngredients: clone(state.customIngredients),
    userState: clone(state.userState),
    preferences: clone(state.preferences),
    history: clone(state.history),
    lab: clone(state.lab)
  };
}

/** Valida una receta suelta. Devuelve { errors, warnings }. */
export function validateRecipe(recipe, knownIngredientIds) {
  const errors = [];
  const warnings = [];
  const label = recipe?.name || recipe?.id || "(sin nombre)";
  if (!recipe || typeof recipe !== "object") return { errors: ["Receta con formato inválido."], warnings };
  for (const f of RECIPE_REQUIRED) if (recipe[f] == null || recipe[f] === "") errors.push(`${label}: falta el campo "${f}".`);
  if (recipe.id && !ID_PATTERN.test(recipe.id)) errors.push(`${label}: id "${recipe.id}" inválido (solo minúsculas, números y guiones).`);
  if (recipe.ingredients != null && !Array.isArray(recipe.ingredients)) errors.push(`${label}: "ingredients" debe ser una lista.`);
  for (const line of Array.isArray(recipe.ingredients) ? recipe.ingredients : []) {
    if (!line?.ingredientId) { errors.push(`${label}: ingrediente sin ingredientId.`); continue; }
    if (!(Number(line.amount) > 0)) errors.push(`${label}: cantidad inválida para "${line.ingredientId}".`);
    if (knownIngredientIds && !knownIngredientIds.has(line.ingredientId)) {
      warnings.push(`${label}: ingrediente desconocido "${line.ingredientId}" (se mostrará como faltante).`);
    }
  }
  const unknown = Object.keys(recipe).filter((k) => !RECIPE_KNOWN.has(k));
  if (unknown.length) warnings.push(`${label}: campos desconocidos conservados sin uso (${unknown.join(", ")}).`);
  return { errors, warnings };
}

/**
 * Valida y resume un respaldo antes de importarlo.
 * Acepta: respaldo completo, o receta suelta { schemaVersion, recipe } (§47).
 * Devuelve { ok, errors, warnings, incoming, summary }.
 */
export function validateBackup(input, current, catalog) {
  const errors = [];
  const warnings = [];
  let data = input;
  if (typeof input === "string") {
    try {
      data = JSON.parse(input);
    } catch {
      return { ok: false, errors: ["El archivo no es JSON válido."], warnings, incoming: null, summary: null };
    }
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { ok: false, errors: ["El archivo no tiene la estructura de un respaldo."], warnings, incoming: null, summary: null };
  }
  if (data.recipe && !data.recipes) {
    data = { schemaVersion: data.schemaVersion, recipes: [data.recipe] };
    warnings.push("Archivo de receta individual: solo se importará esa receta.");
  }

  let incoming;
  try {
    incoming = migrateState({ ...data, schemaVersion: data.schemaVersion }).state;
  } catch (e) {
    return { ok: false, errors: [e.message], warnings, incoming: null, summary: null };
  }

  const extra = Object.keys(data).filter((k) => !STATE_FIELDS.includes(k) && !["app", "exportedAt", "recipe"].includes(k));
  if (extra.length) warnings.push(`Campos desconocidos ignorados: ${extra.join(", ")}.`);

  const knownIds = new Set([...catalog.ingredients.map((i) => i.id), ...(incoming.customIngredients ?? []).map((i) => i.id), ...(current.customIngredients ?? []).map((i) => i.id)]);
  if (!Array.isArray(incoming.recipes)) errors.push('"recipes" debe ser una lista.');
  const seen = new Set();
  for (const r of Array.isArray(incoming.recipes) ? incoming.recipes : []) {
    const v = validateRecipe(r, knownIds);
    errors.push(...v.errors);
    warnings.push(...v.warnings);
    if (r?.id && seen.has(r.id)) errors.push(`Receta duplicada dentro del archivo: "${r.id}".`);
    if (r?.id) seen.add(r.id);
  }

  const catalogIds = new Set(catalog.recipes.map((r) => r.id));
  const currentById = Object.fromEntries(current.recipes.map((r) => [r.id, r]));
  const recipesNew = [];
  const recipesSame = [];
  const recipesConflict = [];
  for (const r of incoming.recipes ?? []) {
    if (!r?.id) continue;
    if (catalogIds.has(r.id)) recipesConflict.push(r.id);
    else if (!currentById[r.id]) recipesNew.push(r.id);
    else if (JSON.stringify(currentById[r.id]) === JSON.stringify(r)) recipesSame.push(r.id);
    else recipesConflict.push(r.id);
  }

  const userStateConflicts = Object.keys(incoming.userState ?? {}).filter(
    (id) => current.userState[id] && JSON.stringify(current.userState[id]) !== JSON.stringify(incoming.userState[id])
  );
  const currentHistoryIds = new Set(current.history.map((h) => h.id));
  const historyNew = (incoming.history ?? []).filter((h) => !currentHistoryIds.has(h.id)).length;
  const currentLabIds = new Set(current.lab.map((l) => l.id));
  const labNew = (incoming.lab ?? []).filter((l) => !currentLabIds.has(l.id)).length;

  const summary = {
    schemaVersion: data.schemaVersion,
    recipesNew, recipesSame, recipesConflict,
    userStateEntries: Object.keys(incoming.userState ?? {}).length,
    userStateConflicts,
    historyNew,
    labNew,
    inventoryEntries: Object.keys(incoming.inventory ?? {}).length
  };
  return { ok: errors.length === 0, errors, warnings, incoming, summary };
}

/**
 * Aplica un respaldo ya validado y confirmado.
 * strategy "merge": agrega lo nuevo; ante conflicto conserva lo actual y guarda la receta entrante como copia "-importada".
 *                   El inventario y las preferencias actuales se mantienen.
 * strategy "replace": reemplaza todo el estado por el respaldo.
 * Devuelve { state, report }.
 */
export function applyImport(current, validation, strategy = "merge", catalog) {
  if (!validation?.ok) throw new Error("No se puede importar un respaldo con errores.");
  const incoming = validation.incoming;
  if (strategy === "replace") {
    return { state: clone(incoming), report: ["Estado reemplazado por el respaldo."] };
  }
  const state = clone(current);
  const report = [];
  const taken = new Set([...catalog.recipes.map((r) => r.id), ...state.recipes.map((r) => r.id)]);
  for (const r of incoming.recipes) {
    if (validation.summary.recipesSame.includes(r.id)) continue;
    if (validation.summary.recipesNew.includes(r.id)) {
      state.recipes.push(clone(r));
      taken.add(r.id);
      report.push(`Receta agregada: ${r.name}.`);
    } else {
      let newId = `${r.id}-importada`;
      for (let n = 2; taken.has(newId); n++) newId = `${r.id}-importada-${n}`;
      state.recipes.push({ ...clone(r), id: newId, name: `${r.name} (importada)` });
      taken.add(newId);
      report.push(`Conflicto en "${r.id}": se conservó la actual y se agregó la copia "${newId}".`);
    }
  }
  for (const [id, entry] of Object.entries(incoming.userState ?? {})) {
    if (!state.userState[id]) state.userState[id] = clone(entry);
  }
  if (validation.summary.userStateConflicts.length) {
    report.push(`${validation.summary.userStateConflicts.length} recetas con favoritos/ratings distintos: se conservaron los actuales.`);
  }
  const historyIds = new Set(state.history.map((h) => h.id));
  state.history.push(...(incoming.history ?? []).filter((h) => !historyIds.has(h.id)).map(clone));
  const labIds = new Set(state.lab.map((l) => l.id));
  state.lab.push(...(incoming.lab ?? []).filter((l) => !labIds.has(l.id)).map(clone));
  const ingIds = new Set(state.customIngredients.map((i) => i.id));
  state.customIngredients.push(...(incoming.customIngredients ?? []).filter((i) => !ingIds.has(i.id)).map(clone));
  if (validation.summary.historyNew) report.push(`${validation.summary.historyNew} preparaciones agregadas al historial.`);
  if (validation.summary.labNew) report.push(`${validation.summary.labNew} experimentos agregados al laboratorio.`);
  report.push("Inventario y preferencias actuales sin cambios.");
  return { state, report };
}
