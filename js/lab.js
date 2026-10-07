// LAB + VERSIONADO (§20, §21). Funciones puras sobre borradores y recetas personales.
// Un borrador vive en state.lab; al convertirlo se copia a state.recipes como receta personal.
// Nunca se modifica una receta existente: una variante es siempre una receta nueva con parentId.

import { clone, normalizeText } from "./util.js";
import { newId } from "./history.js";

export const UNITS = ["ml", "oz", "dash", "barspoon", "cube", "unit"];
export const ROLES = [
  { id: "base", label: "Base" },
  { id: "modifier", label: "Modificador" },
  { id: "sweetener", label: "Endulzante" },
  { id: "acid", label: "Ácido" },
  { id: "bitters", label: "Bitters" },
  { id: "mixer", label: "Mixer" },
  { id: "texture", label: "Textura" }
];
export const METHODS = ["stir", "shake", "build"];
export const ICE_SERVES = ["none", "cubes", "large-cube", "crushed"];

export function slugify(text) {
  return normalizeText(text).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "receta";
}

export function uniqueId(base, taken) {
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  return id;
}

/** Nombre sugerido para una variante: "Cardinale v2", "v3"… según tus variantes personales existentes. */
export function suggestVariantName(parent, personalRecipes) {
  const count = personalRecipes.filter((r) => r.parentId === parent.id).length;
  return `${parent.name} v${count + 2}`;
}

/** Borrador nuevo, vacío o a partir de una receta (variante). */
export function newDraft(fromRecipe = null, { name } = {}, now = new Date()) {
  const base = fromRecipe ? clone(fromRecipe) : {};
  return {
    id: newId("lab"),
    name: name ?? base.name ?? "Nuevo experimento",
    parentId: fromRecipe?.id ?? null,
    family: base.family ?? "",
    baseSpirit: base.baseSpirit ?? "",
    method: base.method ?? "stir",
    ice: { serve: base.ice?.serve ?? "none" },
    glass: base.glass ?? "",
    garnish: base.garnish ?? "",
    profile: base.profile ?? [],
    batch: base.batch,
    ingredients: (base.ingredients ?? []).map(({ originalAmount, replacedFrom, alternativeNote, ...line }) => line),
    notes: "",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

export function duplicateDraft(draft, now = new Date()) {
  return { ...clone(draft), id: newId("lab"), name: `${draft.name} (copia)`, createdAt: now.toISOString(), updatedAt: now.toISOString() };
}

/** Errores que impiden convertir el borrador en receta. Lista vacía = válido. */
export function validateDraft(draft, ingredientsById) {
  const errors = [];
  if (!String(draft.name ?? "").trim()) errors.push("Falta el nombre.");
  if (!METHODS.includes(draft.method)) errors.push("Falta el método.");
  if (!draft.ingredients?.length) errors.push("Agrega al menos un ingrediente.");
  draft.ingredients?.forEach((l, i) => {
    if (!ingredientsById[l.ingredientId]) errors.push(`Ingrediente ${i + 1}: elige un ingrediente.`);
    if (!(Number(l.amount) > 0)) errors.push(`Ingrediente ${i + 1}: cantidad inválida.`);
    if (!UNITS.includes(l.unit)) errors.push(`Ingrediente ${i + 1}: unidad inválida.`);
  });
  return errors;
}

/** Convierte un borrador válido en receta personal con id único. */
export function draftToRecipe(draft, takenIds, now = new Date()) {
  const id = uniqueId(slugify(draft.name), takenIds);
  const recipe = {
    id,
    name: draft.name.trim(),
    family: draft.family || "Personal",
    source: "personal",
    validation: "owner",
    collections: [],
    baseSpirit: draft.baseSpirit || "",
    ingredients: draft.ingredients.map((l) => ({ ...l, amount: Number(l.amount) })),
    method: draft.method,
    ice: { serve: draft.ice?.serve ?? "none" },
    glass: draft.glass || "",
    garnish: draft.garnish || "",
    profile: [...(draft.profile ?? [])],
    difficulty: 1,
    specNote: draft.notes || "",
    createdAt: now.toISOString(),
    fromDraft: draft.id
  };
  if (draft.parentId) recipe.parentId = draft.parentId;
  if (draft.batch) recipe.batch = draft.batch;
  return recipe;
}
