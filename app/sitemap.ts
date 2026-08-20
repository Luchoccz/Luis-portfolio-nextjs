import type { MetadataRoute } from "next";

const SITE_URL = "https://luisccz.com";

/**
 * Portfolio de una sola página: no hay rutas adicionales que listar, pero
 * el sitemap sigue siendo útil para declarar explícitamente la prioridad
 * y frecuencia de cambio de la home ante los crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
