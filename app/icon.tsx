import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Same "LC" monogram + gradient used across the site (header badge, hero
// avatar) and baked into app/favicon.ico, generated here at higher
// resolution so modern browsers — which prefer this over favicon.ico —
// render a crisp icon at any pixel density.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c2347 0%, #24316b 52%, #2d3f8b 100%)",
          borderRadius: 14,
          border: "1.5px solid rgba(160,180,255,0.45)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: -1,
            color: "#f6f8fc",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          LC
        </div>
      </div>
    ),
    { ...size }
  );
}
