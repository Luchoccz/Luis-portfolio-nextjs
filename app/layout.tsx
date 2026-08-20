import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://luisccz.com";
const SITE_TITLE = "Luis Colmenares | Desarrollador Frontend React & Next.js";
const SITE_DESCRIPTION =
  "Luis Colmenares, Desarrollador Frontend en Caracas con +5 años en React, Next.js y TypeScript. Interfaces accesibles, rápidas y optimizadas para SEO. Hablemos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Luis Colmenares",
  },
  description: SITE_DESCRIPTION,
  // El meta "keywords" tiene peso casi nulo para el ranking en Google hoy,
  // pero se mantiene por compatibilidad con otros motores/crawlers y
  // porque documenta explícitamente el objetivo de posicionamiento.
  keywords: [
    "desarrollador frontend",
    "desarrollador frontend react",
    "desarrollador next.js",
    "programador frontend",
    "desarrollador frontend venezuela",
    "desarrollador frontend react next.js venezuela",
    "desarrollador frontend freelance remoto",
    "portafolio desarrollador frontend react typescript",
    "contratar desarrollador frontend react typescript",
    "luis colmenares desarrollador frontend",
  ],
  authors: [{ name: "Luis Colmenares", url: SITE_URL }],
  creator: "Luis Colmenares",
  publisher: "Luis Colmenares",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    firstName: "Luis",
    lastName: "Colmenares",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Luis Colmenares — Portfolio",
    locale: "es_VE",
    alternateLocale: ["en_US"],
    // La imagen og:image la resuelve automáticamente app/opengraph-image.tsx
    // (convención de archivo de Next.js) — no se declara aquí para no
    // duplicar/pisar esos tags.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // Igual que con Open Graph: la imagen la resuelve app/twitter-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Evita que iOS/Android auto-detecten y re-formateen emails/teléfonos: el
  // sitio ya los expone como enlaces mailto:/tel: explícitos e intencionales.
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/**
 * Datos estructurados Schema.org (JSON-LD) para el portfolio, tipo Person.
 * Ayuda a los motores de búsqueda a entender que la página representa a
 * una persona real (nombre, rol, ubicación, empleador, stack) y habilita
 * resultados enriquecidos (knowledge panel) para búsquedas de marca
 * ("Luis Colmenares"). Vive en el layout (Server Component) porque
 * app/page.tsx es "use client" y no puede exportar metadata.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luis Colmenares",
  url: SITE_URL,
  jobTitle: "Desarrollador Frontend",
  description: SITE_DESCRIPTION,
  email: "mailto:luiszrita@gmail.com",
  telephone: "+58-424-1070060",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caracas",
    addressCountry: "VE",
  },
  worksFor: {
    "@type": "Organization",
    name: "Grupo Venemergencia",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Santa Maria",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Material UI",
    "Accesibilidad web",
    "SEO on-page",
    "GraphQL",
  ],
  sameAs: [
    "https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/",
    "https://github.com/Luchoccz",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        {/*
          Siguiendo la guía oficial de Next.js para JSON-LD: un <script> con
          los datos estructurados, colocado directamente en el árbol (no en
          un <head> manual, que pisaría el que genera la Metadata API). El
          `.replace` escapa "<" para evitar inyección si algún día estos
          campos dejan de ser literales estáticos.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="ambient-background" aria-hidden="true">
          <span className="ambient-orb orb-cyan" />
          <span className="ambient-orb orb-electric" />
          <span className="ambient-orb orb-blue" />
        </div>
        <div className="page-content">
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
