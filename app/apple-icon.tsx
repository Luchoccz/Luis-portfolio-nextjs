import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon. Apple applies its own corner rounding/mask, so
// this is drawn as a full-bleed square (no explicit border-radius).
export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -3,
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
