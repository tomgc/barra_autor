// Conversión de unidades y cantidades prácticas (§11).
import { roundTo } from "./util.js";

export const ML_PER_OZ = 29.5735;

/** Unidades de volumen convertibles entre sí. El resto (dash, barspoon, cube, unit) se muestra tal cual. */
export const VOLUME_UNITS = new Set(["ml", "oz"]);

/** Volumen aproximado en ml de unidades no volumétricas, solo para ABV y dilución. */
export const NOMINAL_ML = { dash: 0.8, barspoon: 5, cube: 0, unit: 30 };

export const UNIT_LABELS = {
  ml: "ml",
  oz: "oz",
  dash: { one: "dash", many: "dashes" },
  barspoon: { one: "cucharita de bar", many: "cucharitas de bar" },
  cube: { one: "terrón", many: "terrones" },
  unit: { one: "unidad", many: "unidades" }
};

/** Convierte una cantidad a ml. Devuelve null si la unidad no es volumétrica. */
export function toMl(amount, unit) {
  if (unit === "ml") return amount;
  if (unit === "oz") return amount * ML_PER_OZ;
  return null;
}

/** Volumen nominal en ml (incluye unidades no volumétricas), para cálculos estimados. */
export function nominalMl(amount, unit) {
  const ml = toMl(amount, unit);
  return ml ?? amount * (NOMINAL_ML[unit] ?? 0);
}

/**
 * Convierte y redondea a una cantidad práctica para uso doméstico.
 * oz: múltiplos de 1/4. ml: múltiplos de 2,5 bajo 30 ml y de 5 desde 30 ml.
 * Unidades no volumétricas: enteros (dash, terrón, unidad) o medios (cucharita).
 * Devuelve { amount, unit, exact, approx } donde exact es el valor sin redondear.
 */
export function practicalAmount(amount, unit, targetUnit) {
  if (!VOLUME_UNITS.has(unit)) {
    const step = unit === "barspoon" ? 0.5 : 1;
    const rounded = Math.max(step, roundTo(amount, step));
    return { amount: rounded, unit, exact: amount, approx: rounded !== amount };
  }
  const ml = toMl(amount, unit);
  let exact, rounded;
  if (targetUnit === "oz") {
    exact = ml / ML_PER_OZ;
    rounded = Math.max(0.25, roundTo(exact, 0.25));
  } else {
    exact = ml;
    rounded = Math.max(2.5, roundTo(exact, exact < 30 ? 2.5 : 5));
  }
  // Se marca como aproximada solo si el redondeo cambia más de 2 % (evita "≈ 1 oz" para 30 ml).
  return { amount: rounded, unit: targetUnit, exact, approx: Math.abs(rounded - exact) / exact > 0.02 };
}

/** Texto legible: "1 ½ oz", "22,5 ml", "3 dashes". Con fractions: false, "12,17 oz". */
export function formatAmount({ amount, unit }, { fractions = true } = {}) {
  const label = UNIT_LABELS[unit];
  const unitText = typeof label === "string" ? label : amount === 1 ? label.one : label.many;
  return `${formatNumber(amount, fractions && unit === "oz")} ${unitText}`;
}

const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

function formatNumber(value, useFractions) {
  const whole = Math.floor(value);
  const frac = roundTo(value - whole, 0.25);
  if (useFractions && FRACTIONS[frac]) return whole ? `${whole} ${FRACTIONS[frac]}` : FRACTIONS[frac];
  return String(value).replace(".", ",");
}
