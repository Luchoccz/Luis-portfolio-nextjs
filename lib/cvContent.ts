import type { Language } from "./experience";

/**
 * Contenido "de negocio" del CV: la misma información que alimenta las
 * secciones de la página y la exportación a PDF, para que ambas vistas no
 * puedan desincronizarse entre sí. Vive separado de `app/page.tsx` porque
 * `lib/generateCvPdf.ts` también lo necesita y no debe importar desde un
 * archivo de página de Next.js.
 */

export const WORK_START_DATE = new Date(Date.UTC(2020, 11, 1));

export const personalInfo = {
  name: "Luis Colmenares",
  location: "Caracas, Venezuela",
  email: "luiszrita@gmail.com",
  phone: "+58 424-1070060",
  linkedin: "https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/",
};

export const currentCompany = "Grupo Venemergencia";
export const freelanceCompany = "INHRR-OPS";
export const educationInstitution = "Universidad Santa Maria";
export const graduationYear = "2017";

export const experienceTechnologies = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Figma",
  "Git",
  "Bitbucket",
  "Jira",
  "Adobe",
];

export const freelanceExperienceTechnologies = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Figma",
  "Git",
  "Jira",
];

export const skillGroupsByLanguage = {
  es: [
    {
      title: "Frameworks frontend",
      items: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript"],
    },
    {
      title: "Estilos y marcado",
      items: ["HTML5", "CSS3", "SASS", "UI responsiva"],
    },
    {
      title: "Herramientas y flujo",
      items: ["Git", "GitHub", "Bitbucket", "Jira", "Figma", "Adobe"],
    },
    {
      title: "Rendimiento y UX",
      items: ["SEO on-page", "Accesibilidad web", "Optimización de rendimiento", "Integración UX/UI"],
    },
  ],
  en: [
    {
      title: "Frontend frameworks",
      items: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript"],
    },
    {
      title: "Styling & markup",
      items: ["HTML5", "CSS3", "SASS", "Responsive UI"],
    },
    {
      title: "Tools & workflow",
      items: ["Git", "GitHub", "Bitbucket", "Jira", "Figma", "Adobe"],
    },
    {
      title: "Performance & UX",
      items: ["On-page SEO", "Web accessibility", "Performance optimization", "UX/UI integration"],
    },
  ],
} satisfies Record<Language, Array<{ title: string; items: string[] }>>;

export const experiencePointsByLanguage = {
  es: [
    "Desarrollo y mantenimiento de interfaces web con estándares modernos de HTML, CSS y JavaScript.",
    "Implementación de mejoras UX/UI continuas en sitios de alto tráfico para optimizar la experiencia del usuario.",
    "Conversión de diseños complejos en interfaces responsivas y compatibles entre navegadores.",
    "Optimización del rendimiento y velocidad de carga mejorando SEO y accesibilidad.",
    "Colaboración con equipos de diseño y producto para traducir requerimientos en soluciones digitales efectivas.",
  ],
  en: [
    "Developed and maintained core web interfaces using modern HTML, CSS, and JavaScript standards.",
    "Implemented continuous UX/UI enhancements across client-facing sites to optimize overall user experience.",
    "Converted complex design mockups into responsive, cross-browser interfaces.",
    "Optimized application performance and page speed while improving SEO and accessibility.",
    "Collaborated with design and product teams to translate requirements into effective digital experiences.",
  ],
} satisfies Record<Language, string[]>;

export const courseListByLanguage = {
  es: [
    "Automatizaciones Low-Code con n8n - Platzi (mayo 2026)",
    "Fundamentos de Python - Platzi",
    "Fundamentos de SASS - Platzi",
    "Posicionamiento en buscadores (SEO) - Platzi",
    "Next.js 14 - Platzi",
    "React.js con TypeScript - Platzi",
    "Next.js: Sitios estáticos - Platzi",
    "Next.js con GraphQL - Platzi",
    "Next.js: Seguridad web con OWASP - Platzi",
    "Frameworks y Arquitecturas Frontend - Platzi",
    "React.js: Navegación con React Router - Platzi",
    "Vite.js - Platzi",
    "Manipulación del DOM - Platzi",
    "ECMAScript 6+ - Platzi",
    "Curso Práctico de Next.js - Platzi",
  ],
  en: [
    "Low-Code Automations with n8n - Platzi (May 2026)",
    "Python Fundamentals - Platzi",
    "SASS Fundamentals - Platzi",
    "Search Engine Optimization (SEO) - Platzi",
    "Next.js 14 - Platzi",
    "React.js with TypeScript - Platzi",
    "Next.js: Static Sites - Platzi",
    "Next.js with GraphQL - Platzi",
    "Next.js: Web Security with OWASP - Platzi",
    "Frontend Frameworks & Architectures - Platzi",
    "React.js: Navigation with React Router - Platzi",
    "Vite.js - Platzi",
    "DOM Manipulation - Platzi",
    "ECMAScript 6+ - Platzi",
    "Practical Next.js Course - Platzi",
  ],
} satisfies Record<Language, string[]>;
