// Utilidades puras compartidas.

/** Minúsculas y sin acentos, para búsquedas tolerantes (§10). */
export function normalizeText(text) {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Redondea al múltiplo más cercano de `step`, evitando ruido de coma flotante. */
export function roundTo(value, step) {
  return Math.round(Math.round(value / step) * step * 1000) / 1000;
}

/** Índice { id: objeto } a partir de una lista. */
export function indexById(list) {
  return Object.fromEntries(list.map((item) => [item.id, item]));
}

/** Fecha local en formato YYYY-MM-DD. */
export function isoDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Copia profunda para datos JSON (sin funciones ni fechas). */
export function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}
