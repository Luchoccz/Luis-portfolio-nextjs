import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Ancla la raíz del proyecto aquí: hay un package-lock.json suelto en
    // /Users/luiszrita/Documents/Workspace (fuera de este repo git) que
    // Turbopack detecta al buscar hacia arriba y por el que emite un warning.
    root: __dirname,
  },
};

export default nextConfig;
