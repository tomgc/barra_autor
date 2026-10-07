// STORAGE + MIGRATIONS (§35, §36, §48).
// Si localStorage no existe o falla (modo privado, cuota), se usa memoria y se avisa (storageMode = "memory").

import { clone } from "./util.js";

export const SCHEMA_VERSION = 1;

export const KEYS = {
  inventory: "mba_inventory",
  recipes: "mba_recipes",        // recetas personales y variantes (el catálogo oficial no se guarda)
  ingredients: "mba_ingredients", // ingredientes creados por el usuario
  userState: "mba_user_state",   // favoritos, rating general, estado y notas por receta
  preferences: "mba_preferences",
  history: "mba_history",
  lab: "mba_lab",
  schemaVersion: "mba_schema_version"
};

export const DEFAULT_PREFERENCES = { unit: "ml", servings: 1, availabilityFilter: "all", profileFilter: [] };

/** Estado vacío y válido. */
export function emptyState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    inventory: {},
    recipes: [],
    customIngredients: [],
    userState: {},
    preferences: { ...DEFAULT_PREFERENCES },
    history: [],
    lab: []
  };
}

const memory = new Map();

function backend() {
  try {
    const ls = globalThis.localStorage;
    const probe = "__mba_probe__";
    ls.setItem(probe, "1");
    ls.removeItem(probe);
    return { mode: "local", get: (k) => ls.getItem(k), set: (k, v) => ls.setItem(k, v), del: (k) => ls.removeItem(k) };
  } catch {
    return { mode: "memory", get: (k) => memory.get(k) ?? null, set: (k, v) => memory.set(k, v), del: (k) => memory.delete(k) };
  }
}

export function storageMode() {
  return backend().mode;
}

function readJson(store, key, fallback) {
  const raw = store.get(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Carga el estado. Si no hay nada guardado, devuelve `defaults` (inventario inicial y datos demo).
 * Devuelve { state, mode, isFirstRun, warnings }.
 */
export function loadState(defaults = emptyState()) {
  const store = backend();
  const version = readJson(store, KEYS.schemaVersion, null);
  if (version == null) {
    return { state: clone(defaults), mode: store.mode, isFirstRun: true, warnings: [] };
  }
  const raw = {
    schemaVersion: version,
    inventory: readJson(store, KEYS.inventory, {}),
    recipes: readJson(store, KEYS.recipes, []),
    customIngredients: readJson(store, KEYS.ingredients, []),
    userState: readJson(store, KEYS.userState, {}),
    preferences: readJson(store, KEYS.preferences, {}),
    history: readJson(store, KEYS.history, []),
    lab: readJson(store, KEYS.lab, [])
  };
  const { state, warnings } = migrateState(raw);
  // Ingredientes nuevos del catálogo que no estaban en el inventario guardado.
  state.inventory = { ...defaults.inventory, ...state.inventory };
  return { state, mode: store.mode, isFirstRun: false, warnings };
}

/** Guarda el estado completo. Devuelve { ok, mode, error? }. */
export function saveState(state) {
  const store = backend();
  try {
    store.set(KEYS.inventory, JSON.stringify(state.inventory));
    store.set(KEYS.recipes, JSON.stringify(state.recipes));
    store.set(KEYS.ingredients, JSON.stringify(state.customIngredients));
    store.set(KEYS.userState, JSON.stringify(state.userState));
    store.set(KEYS.preferences, JSON.stringify(state.preferences));
    store.set(KEYS.history, JSON.stringify(state.history));
    store.set(KEYS.lab, JSON.stringify(state.lab));
    store.set(KEYS.schemaVersion, JSON.stringify(SCHEMA_VERSION));
    return { ok: true, mode: store.mode };
  } catch (error) {
    return { ok: false, mode: store.mode, error: "No se pudo guardar (¿almacenamiento lleno?)." };
  }
}

/** Borra todo lo guardado. El llamador decide con qué estado reiniciar. */
export function resetState() {
  const store = backend();
  Object.values(KEYS).forEach((k) => store.del(k));
}

// ───────── Migraciones ─────────
// Cada entrada transforma un estado de la versión N a N+1. Para agregar una versión:
// 1) subir SCHEMA_VERSION, 2) agregar MIGRATIONS[N] = (s) => ({ ...s, ...cambios }).
export const MIGRATIONS = {
  // 1: (state) => ({ ...state, schemaVersion: 2, nuevoCampo: [] })
};

/**
 * Lleva un estado de cualquier versión anterior a SCHEMA_VERSION y completa campos faltantes.
 * Devuelve { state, warnings }. Lanza error si la versión es futura o inválida.
 */
export function migrateState(input) {
  const warnings = [];
  let version = Number(input?.schemaVersion);
  if (!Number.isInteger(version) || version < 1) throw new Error("schemaVersion inválido o ausente.");
  if (version > SCHEMA_VERSION) {
    throw new Error(`El respaldo es de una versión más nueva de la app (schema ${version}; esta app usa ${SCHEMA_VERSION}).`);
  }
  let state = clone(input);
  while (version < SCHEMA_VERSION) {
    const step = MIGRATIONS[version];
    if (!step) throw new Error(`Falta la migración desde schema ${version}.`);
    state = step(state);
    warnings.push(`Migrado de schema ${version} a ${version + 1}.`);
    version += 1;
  }
  const base = emptyState();
  for (const key of Object.keys(base)) {
    if (state[key] === undefined) state[key] = base[key];
  }
  state.preferences = { ...DEFAULT_PREFERENCES, ...state.preferences };
  state.schemaVersion = SCHEMA_VERSION;
  return { state, warnings };
}
