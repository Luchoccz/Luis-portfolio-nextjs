export type Language = "es" | "en";

export type ExperienceDuration = {
  years: number;
  months: number;
};

/**
 * Calcula años y meses completos transcurridos entre `startDate` y
 * `currentDate` (por defecto, ahora). Trabaja en UTC para no depender de la
 * zona horaria del navegador/servidor que renderiza. Un mes solo cuenta como
 * completo si ya se alcanzó el día del mes de `startDate` — evita redondear
 * "5 años y 27 días" hacia arriba como si fuera un mes más.
 */
export const calculateExperienceDuration = (
  startDate: Date,
  currentDate: Date = new Date()
): ExperienceDuration => {
  let totalMonths =
    (currentDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
    (currentDate.getUTCMonth() - startDate.getUTCMonth());

  if (currentDate.getUTCDate() < startDate.getUTCDate()) {
    totalMonths -= 1;
  }

  totalMonths = Math.max(0, totalMonths);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
};

/**
 * Formatea la duración como "X años Y meses" / "X years Y months", con
 * singular/plural correcto ("1 año 1 mes" / "1 year 1 month").
 */
export const formatExperienceDuration = (
  { years, months }: ExperienceDuration,
  language: Language
): string => {
  if (language === "es") {
    const yearWord = years === 1 ? "año" : "años";
    const monthWord = months === 1 ? "mes" : "meses";
    return `${years} ${yearWord} ${months} ${monthWord}`;
  }

  const yearWord = years === 1 ? "year" : "years";
  const monthWord = months === 1 ? "month" : "months";
  return `${years} ${yearWord} ${months} ${monthWord}`;
};
