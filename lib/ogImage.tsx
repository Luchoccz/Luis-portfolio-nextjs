/**
 * Marcado compartido entre app/opengraph-image.tsx y app/twitter-image.tsx.
 * Ambas rutas especiales de Next.js (`next/og`) necesitan su propio
 * `export default function Image()`, así que este módulo solo centraliza
 * el JSX para que las dos imágenes no puedan desincronizarse visualmente.
 *
 * Reutiliza el mismo lenguaje visual que app/icon.tsx y app/apple-icon.tsx
 * (gradiente azul/índigo + monograma "LC") para que el favicon, el ícono
 * de iOS y la tarjeta social se vean como una sola identidad de marca.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT =
  "Luis Colmenares — Desarrollador Frontend especializado en React, Next.js y TypeScript";

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 96px",
        background:
          "linear-gradient(135deg, #030306 0%, #090f1f 46%, #14224a 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 120,
          borderRadius: 26,
          background:
            "linear-gradient(135deg, #1c2347 0%, #24316b 52%, #2d3f8b 100%)",
          border: "2px solid rgba(160,180,255,0.45)",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#f6f8fc",
          }}
        >
          LC
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -2,
          color: "#f3f7ff",
          lineHeight: 1.05,
        }}
      >
        Luis Colmenares
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 18,
          fontSize: 40,
          fontWeight: 700,
          color: "#a9b6cf",
        }}
      >
        Desarrollador Frontend
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 34,
          fontSize: 28,
          fontWeight: 600,
          color: "#dfe6ff",
        }}
      >
        React · Next.js · TypeScript · Caracas, Venezuela
      </div>
    </div>
  );
}
