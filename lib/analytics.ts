"use client";

import { sendGAEvent } from "@next/third-parties/google";

/**
 * Mismo gate que app/layout.tsx usa para decidir si monta
 * `<GoogleAnalytics />`: solo en builds de producción y solo si hay un
 * Measurement ID configurado. Repetido aquí (en vez de importado) porque
 * es una comprobación de una línea y evita que este módulo, importado
 * desde componentes cliente, arrastre nada del layout.
 *
 * Efecto práctico: en `next dev` estas llamadas son no-ops silenciosos, así
 * que el tráfico de desarrollo nunca contamina la propiedad de GA4 real.
 * Para probarlas hay que correr un build de producción local
 * (`npm run build && npm run start`) con la variable seteada.
 */
const isAnalyticsEnabled =
  process.env.NODE_ENV === "production" &&
  Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

/**
 * Envía un evento personalizado a GA4. Requiere que `<GoogleAnalytics />`
 * (app/layout.tsx) esté montado — si no, `sendGAEvent` no tiene efecto.
 *
 * Uso: trackEvent("cv_download", { language: "es" })
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (!isAnalyticsEnabled) return;
  sendGAEvent("event", eventName, params);
}
