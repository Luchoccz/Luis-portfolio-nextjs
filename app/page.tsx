"use client";

import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { FaPersonWalking } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiRadixui,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";

type Language = "es" | "en";

const navItems = [
  { id: "home", es: "Inicio", en: "Home" },
  { id: "about", es: "Sobre mi", en: "About" },
  { id: "experience", es: "Experiencia", en: "Experience" },
  { id: "skills", es: "Habilidades", en: "Skills" },
  { id: "contact", es: "Contacto", en: "Contact" },
];

const copyByLanguage = {
  es: {
    downloadCv: "Descargar CV",
    availableForWork: "Disponible para trabajar",
    hello: "Hola, soy",
    role: "Desarrollador Frontend",
    heroSummaryBefore: "Desarrollador Frontend con",
    heroSummaryAfter:
      "creando, manteniendo y optimizando interfaces web con foco en usabilidad, rendimiento y accesibilidad. Transformo ideas UX/UI en experiencias responsivas y escalables con React, Next.js y TypeScript.",
    contactMe: "Contactame",
    aboutTitle: "Sobre mi",
    aboutSubtitle: "Desarrollador frontend enfocado en interfaces limpias y resultados medibles.",
    aboutText:
      "Soy un profesional orientado al detalle, con fuerte equilibrio entre ejecución tecnica y vision UX. He construido y mantenido experiencias web modernas optimizando usabilidad, SEO, accesibilidad y velocidad de carga.",
    roleLabel: "Cargo",
    companyLabel: "Empresa",
    experienceLabel: "Experiencia",
    educationLabel: "Educacion",
    experienceTitle: "Experiencia",
    currentRole: "Desarrollador Frontend",
    currentTime: "Diciembre 2020 - Actualidad · Caracas, Venezuela",
    technologiesUsed: "Tecnologias y herramientas utilizadas",
    skillsTitle: "Habilidades",
    educationTitle: "Educacion",
    degreeTitle: "Licenciado en Contaduria Publica",
    certificationTitle: "Cursos y certificaciones",
    contactSectionLabel: "Conectemos",
    contactSectionTitle: "¿Tienes un proyecto en mente? Hagámoslo realidad.",
    footerEmail: "Correo",
    backToTop: "Volver arriba",
  },
  en: {
    downloadCv: "Download CV",
    availableForWork: "Available for work",
    hello: "Hi, I\'m",
    role: "Frontend Developer",
    heroSummaryBefore: "Frontend Developer with",
    heroSummaryAfter:
      "building, maintaining, and optimizing web interfaces focused on usability, performance, and accessibility. I transform UX/UI ideas into responsive, scalable experiences with React, Next.js, and TypeScript.",
    contactMe: "Contact me",
    aboutTitle: "About Me",
    aboutSubtitle: "Frontend developer focused on clean interfaces and measurable results.",
    aboutText:
      "I\'m a detail-oriented developer with a strong balance of technical execution and UX thinking. I\'ve built and maintained modern web experiences for business platforms, optimizing for usability, SEO, accessibility, and page performance.",
    roleLabel: "Role",
    companyLabel: "Company",
    experienceLabel: "Experience",
    educationLabel: "Education",
    experienceTitle: "Experience",
    currentRole: "Frontend Developer",
    currentTime: "December 2020 - Present · Caracas, Venezuela",
    technologiesUsed: "Technologies & tools used",
    skillsTitle: "Skills",
    educationTitle: "Education",
    degreeTitle: "Bachelor\'s Degree in Public Accounting",
    certificationTitle: "Courses & certifications",
    contactSectionLabel: "Let\'s connect",
    contactSectionTitle: "Do you have a project in mind? Let's make it happen.",
    footerEmail: "Email",
    backToTop: "Back to top",
  },
} satisfies Record<Language, Record<string, string>>;

const skillGroupsByLanguage = {
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
      items: ["SEO on-page", "Accesibilidad web", "Optimizacion de rendimiento", "Integracion UX/UI"],
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

const experiencePointsByLanguage = {
  es: [
    "Desarrollo y mantenimiento de interfaces web con estandares modernos de HTML, CSS y JavaScript.",
    "Implementacion de mejoras UX/UI continuas en sitios de alto trafico para optimizar la experiencia del usuario.",
    "Conversion de disenos complejos en interfaces responsivas y compatibles entre navegadores.",
    "Optimizacion del rendimiento y velocidad de carga mejorando SEO y accesibilidad.",
    "Colaboracion con equipos de diseno y producto para traducir requerimientos en soluciones digitales efectivas.",
  ],
  en: [
    "Developed and maintained core web interfaces using modern HTML, CSS, and JavaScript standards.",
    "Implemented continuous UX/UI enhancements across client-facing sites to optimize overall user experience.",
    "Converted complex design mockups into responsive, cross-browser interfaces.",
    "Optimized application performance and page speed while improving SEO and accessibility.",
    "Collaborated with design and product teams to translate requirements into effective digital experiences.",
  ],
} satisfies Record<Language, string[]>;

const courseListByLanguage = {
  es: [
    "Automatizaciones Low-Code con n8n - Platzi (mayo 2026)",
    "Fundamentos de Python - Platzi",
    "Fundamentos de SASS - Platzi",
    "Posicionamiento en buscadores (SEO) - Platzi",
    "Next.js 14 - Platzi",
    "React.js con TypeScript - Platzi",
    "Next.js: Sitios estaticos - Platzi",
    "Next.js con GraphQL - Platzi",
    "Next.js: Seguridad web con OWASP - Platzi",
    "Frameworks y Arquitecturas Frontend - Platzi",
    "React.js: Navegacion con React Router - Platzi",
    "Vite.js - Platzi",
    "Manipulacion del DOM - Platzi",
    "ECMAScript 6+ - Platzi",
    "Curso Practico de Next.js - Platzi",
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

type OrbitItem = {
  name: string;
  angle: number;
  color?: string;
  Icon?: IconType;
  label?: string;
};

const outerOrbitItems: OrbitItem[] = [
  { name: "Framer", Icon: SiFramer, color: "#1f2937", angle: 294 },
  { name: "GraphQL", Icon: SiGraphql, color: "#ff4a6a", angle: 332 },
  { name: "Node.js", Icon: SiNodedotjs, color: "#22c55e", angle: 2 },
  { name: "MongoDB", Icon: SiMongodb, color: "#00cf66", angle: 56 },
  { name: "Firebase", Icon: SiFirebase, color: "#ff9f00", angle: 110 },
  { name: "GSAP", Icon: FaPersonWalking, color: "#8af7af", angle: 156 },
  { name: "React", Icon: SiReact, color: "#6f7bff", angle: 208 },
];

const innerOrbitItems: OrbitItem[] = [
  { name: "HTML5", Icon: SiHtml5, color: "#ff6a00", angle: 270 },
  { name: "CSS3", Icon: SiCss, color: "#4f8fff", angle: 322 },
  { name: "JavaScript", Icon: SiJavascript, color: "#facc15", angle: 8 },
  { name: "Shadcn UI", Icon: SiShadcnui, color: "#0f172a", angle: 54 },
  { name: "Radix UI", Icon: SiRadixui, color: "#ef4444", angle: 106 },
  { name: "Next.js", Icon: SiNextdotjs, color: "#101010", angle: 162 },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8", angle: 216 },
];

const titleColorPrimary = "#f3f7ff";
const titleColorAccent = "#cfdcff";
const outerOrbitDuration = "46s";
const innerOrbitDuration = "32s";
const orbitAngleOffset = 90;
const WORK_START_DATE = new Date(Date.UTC(2020, 11, 1));

const calculateExperienceYears = (startDate: Date, currentDate = new Date()) => {
  const totalMonths =
    (currentDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
    (currentDate.getUTCMonth() - startDate.getUTCMonth()) +
    (currentDate.getUTCDate() - startDate.getUTCDate()) / 30.4375;

  const years = totalMonths / 12;
  return Math.max(0, Math.round(years * 10) / 10);
};

const formatExperienceYears = (years: number, language: Language) => {
  const hasDecimals = years % 1 !== 0;
  return new Intl.NumberFormat(language === "es" ? "es-ES" : "en-US", {
    minimumFractionDigits: hasDecimals ? 1 : 0,
    maximumFractionDigits: 1,
  }).format(years);
};

const getOrbitPosition = (angle: number) => {
  const rad = ((angle + orbitAngleOffset) * Math.PI) / 180;
  return {
    top: `${50 + 50 * Math.sin(rad)}%`,
    left: `${50 + 50 * Math.cos(rad)}%`,
  };
};

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "es";
    }

    const saved = window.localStorage.getItem("portfolio-language");
    return saved === "en" || saved === "es" ? saved : "es";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsHeaderCompact(currentScroll > 80);

      const hasScrolledEnough = window.scrollY > 360;
      const contactSection = document.getElementById("contact");

      if (!contactSection) {
        setShowBackToTop(hasScrolledEnough);
        return;
      }

      const contactTop = contactSection.getBoundingClientRect().top;
      const contactReached = contactTop <= window.innerHeight * 0.95;
      setShowBackToTop(hasScrolledEnough || contactReached);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const t = copyByLanguage[language];
  const skillGroups = skillGroupsByLanguage[language];
  const experiencePoints = experiencePointsByLanguage[language];
  const courseList = courseListByLanguage[language];
  const yearsOfExperience = calculateExperienceYears(WORK_START_DATE);
  const yearsLabel =
    language === "es"
      ? `${formatExperienceYears(yearsOfExperience, language)} anos de experiencia`
      : `${formatExperienceYears(yearsOfExperience, language)} years of experience`;

  return (
    <Box sx={{ color: "#f5f7fa", minHeight: "100vh" }}>
      <AppBar
        position={isHeaderCompact ? "fixed" : "sticky"}
        elevation={0}
        sx={{
          top: isHeaderCompact ? { xs: 8, md: 12 } : 0,
          left: 0,
          right: 0,
          bgcolor: isHeaderCompact ? "transparent" : "rgba(6, 8, 17, 0.62)",
          backgroundImage: isHeaderCompact
            ? "none"
            : "linear-gradient(to bottom, rgba(7, 10, 20, 0.9) 0%, rgba(7, 10, 20, 0.72) 52%, rgba(7, 10, 20, 0.45) 100%)",
          backdropFilter: isHeaderCompact ? "none" : "blur(15px)",
          borderBottom: "none",
          boxShadow: isHeaderCompact ? "none" : "0 20px 44px rgba(2, 5, 14, 0.46)",
          overflow: "visible",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -42,
            height: 56,
            pointerEvents: "none",
            background: isHeaderCompact
              ? "linear-gradient(to bottom, rgba(7, 10, 20, 0.42) 0%, rgba(7, 10, 20, 0.22) 40%, rgba(7, 10, 20, 0.08) 74%, rgba(7, 10, 20, 0) 100%)"
              : "linear-gradient(to bottom, rgba(6, 8, 17, 0.58) 0%, rgba(6, 8, 17, 0.26) 42%, rgba(6, 8, 17, 0.09) 76%, rgba(6, 8, 17, 0) 100%)",
            opacity: isHeaderCompact ? 0.82 : 1,
            transition: "opacity 0.3s ease, background 0.3s ease",
          },
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: { xs: isHeaderCompact ? 58 : "auto", sm: isHeaderCompact ? 58 : 72 },
              py: { xs: isHeaderCompact ? 0.7 : 1.15, sm: isHeaderCompact ? 0.3 : 0 },
              px: isHeaderCompact ? { xs: 0, sm: 1.2 } : 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              rowGap: { xs: isHeaderCompact ? 0.65 : 1.1, sm: 0 },
              borderRadius: { xs: 0, md: isHeaderCompact ? 999 : 0 },
              bgcolor: { xs: "transparent", md: isHeaderCompact ? "rgba(20, 28, 52, 0.72)" : "transparent" },
              border: { xs: "none", md: isHeaderCompact ? "1px solid rgba(152, 176, 255, 0.28)" : "none" },
              boxShadow: { xs: "none", md: isHeaderCompact ? "0 12px 30px rgba(7, 13, 33, 0.45)" : "none" },
              backdropFilter: { xs: "none", md: isHeaderCompact ? "blur(14px)" : "none" },
              transition: "all 0.3s ease",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.2, minWidth: 0 }}>
              <Box
                sx={{
                  width: isHeaderCompact ? 28 : 34,
                  height: isHeaderCompact ? 28 : 34,
                  borderRadius: 2,
                  bgcolor: "#f5f7fa",
                  color: "#0b0c10",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: isHeaderCompact ? 13 : 16,
                  transition: "all 0.3s ease",
                }}
              >
                LC
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: titleColorPrimary,
                  fontSize: { xs: 19, sm: 22, md: isHeaderCompact ? 24 : 34 },
                  lineHeight: 1.05,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: { xs: "58vw", sm: "none" },
                  transition: "all 0.3s ease",
                }}
              >
                Luis Colmenares
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: isHeaderCompact ? 1.5 : 3, transition: "all 0.3s ease" }}>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  underline="none"
                  sx={{
                    color: "#dfe3ea",
                    fontSize: isHeaderCompact ? 12.5 : 14,
                    lineHeight: 1,
                    px: isHeaderCompact ? 1 : 0,
                    py: isHeaderCompact ? 0.55 : 0,
                    borderRadius: 999,
                    opacity: 0.9,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      bgcolor: isHeaderCompact ? "rgba(255,255,255,0.08)" : "transparent",
                    },
                  }}
                >
                  {language === "es" ? item.es : item.en}
                </Link>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                px: isHeaderCompact ? 0.8 : 1,
                py: isHeaderCompact ? 0.55 : 0.7,
                borderRadius: 2.5,
                bgcolor: "rgba(18, 24, 43, 0.58)",
                border: "1px solid rgba(146,166,255,0.18)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, minWidth: 0, pr: 0.6 }}>
                <Box
                  sx={{
                    width: isHeaderCompact ? 26 : 30,
                    height: isHeaderCompact ? 26 : 30,
                    borderRadius: 1.8,
                    bgcolor: "#f5f7fa",
                    color: "#0b0c10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: isHeaderCompact ? 11.5 : 13,
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  LC
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: titleColorPrimary,
                    fontSize: isHeaderCompact ? 16 : 18,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    minWidth: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  Luis Colmenares
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, flexShrink: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 0.24,
                    borderRadius: 999,
                    bgcolor: "rgba(12,16,28,0.72)",
                    border: "1px solid rgba(158,178,255,0.22)",
                  }}
                >
                  <Button
                    onClick={() => setLanguage("es")}
                    size="small"
                    sx={{
                      minWidth: 32,
                      height: 24,
                      borderRadius: 999,
                      px: 0.8,
                      py: 0,
                      fontSize: 10,
                      letterSpacing: 0.35,
                      fontWeight: 700,
                      color: language === "es" ? "#f4f7ff" : "#aab6d8",
                      bgcolor: language === "es" ? "rgba(104,128,255,0.36)" : "transparent",
                      border: "1px solid",
                      borderColor: language === "es" ? "rgba(177,194,255,0.36)" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ES
                  </Button>
                  <Button
                    onClick={() => setLanguage("en")}
                    size="small"
                    sx={{
                      minWidth: 32,
                      height: 24,
                      borderRadius: 999,
                      px: 0.8,
                      py: 0,
                      fontSize: 10,
                      letterSpacing: 0.35,
                      fontWeight: 700,
                      color: language === "en" ? "#f4f7ff" : "#aab6d8",
                      bgcolor: language === "en" ? "rgba(104,128,255,0.36)" : "transparent",
                      border: "1px solid",
                      borderColor: language === "en" ? "rgba(177,194,255,0.36)" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    EN
                  </Button>
                </Box>

                <Button
                  component="a"
                  href="/docs/CV%20Luis%20Colmenare%20Developer.pdf"
                  download="CV Luis Colmenare Developer.pdf"
                  variant="contained"
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #1c2347 0%, #24316b 52%, #2d3f8b 100%)",
                    color: "#e9efff",
                    textTransform: "none",
                    px: isHeaderCompact ? 1.1 : 1.45,
                    py: isHeaderCompact ? 0.45 : 0.6,
                    minHeight: isHeaderCompact ? 32 : 36,
                    minWidth: isHeaderCompact ? 78 : 88,
                    fontWeight: 700,
                    fontSize: isHeaderCompact ? 11.5 : 12.5,
                    whiteSpace: "nowrap",
                    boxShadow: "0 8px 18px rgba(18, 28, 74, 0.5)",
                    border: "1px solid rgba(145, 168, 255, 0.28)",
                    transition: "all 0.3s ease",
                    "& .MuiButton-startIcon": {
                      mr: isHeaderCompact ? 0.25 : 0.45,
                      "& svg": {
                        fontSize: isHeaderCompact ? 14 : 16,
                      },
                    },
                  }}
                >
                  CV
                </Button>
              </Box>
            </Box>

            {isHeaderCompact ? (
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  width: "100%",
                  gap: 0.5,
                  overflowX: "auto",
                  justifyContent: "flex-start",
                  px: 0.7,
                  py: 0.48,
                  borderRadius: 2,
                  bgcolor: "rgba(15, 21, 39, 0.62)",
                  border: "1px solid rgba(146,166,255,0.16)",
                  backdropFilter: "blur(10px)",
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                }}
              >
                {navItems.map((item) => (
                  <Link
                    key={`mobile-${item.id}`}
                    href={`#${item.id}`}
                    underline="none"
                    sx={{
                      color: "#dfe3ea",
                      fontSize: 11.5,
                      lineHeight: 1,
                      px: 1.1,
                      py: 0.52,
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      border: "1px solid rgba(148,168,255,0.18)",
                      bgcolor: "rgba(12,16,28,0.38)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(90,112,196,0.22)",
                        borderColor: "rgba(170,191,255,0.26)",
                      },
                    }}
                  >
                    {language === "es" ? item.es : item.en}
                  </Link>
                ))}
              </Box>
            ) : null}

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: isHeaderCompact ? 0.7 : 1,
                width: "auto",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
                transition: "all 0.3s ease",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 0.3,
                  borderRadius: 999,
                  bgcolor: "rgba(12,16,28,0.72)",
                  border: "1px solid rgba(158,178,255,0.22)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Button
                  onClick={() => setLanguage("es")}
                  size="small"
                  sx={{
                    minWidth: 34,
                    height: 26,
                    borderRadius: 999,
                    px: 0.9,
                    py: 0.15,
                    fontSize: 10.5,
                    letterSpacing: 0.4,
                    fontWeight: 700,
                    color: language === "es" ? "#f4f7ff" : "#aab6d8",
                    bgcolor: language === "es" ? "rgba(104,128,255,0.36)" : "transparent",
                    border: "1px solid",
                    borderColor: language === "es" ? "rgba(177,194,255,0.36)" : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: language === "es" ? "rgba(104,128,255,0.42)" : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  ES
                </Button>
                <Button
                  onClick={() => setLanguage("en")}
                  size="small"
                  sx={{
                    minWidth: 34,
                    height: 26,
                    borderRadius: 999,
                    px: 0.9,
                    py: 0.15,
                    fontSize: 10.5,
                    letterSpacing: 0.4,
                    fontWeight: 700,
                    color: language === "en" ? "#f4f7ff" : "#aab6d8",
                    bgcolor: language === "en" ? "rgba(104,128,255,0.36)" : "transparent",
                    border: "1px solid",
                    borderColor: language === "en" ? "rgba(177,194,255,0.36)" : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: language === "en" ? "rgba(104,128,255,0.42)" : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  EN
                </Button>
              </Box>

              <Button
                component="a"
                href="/docs/CV%20Luis%20Colmenare%20Developer.pdf"
                download="CV Luis Colmenare Developer.pdf"
                variant="contained"
                startIcon={<DownloadRoundedIcon />}
                sx={{
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #1c2347 0%, #24316b 52%, #2d3f8b 100%)",
                  color: "#e9efff",
                  textTransform: "none",
                  px: { xs: 1.6, sm: 2.1, md: isHeaderCompact ? 1.5 : 2.4 },
                  py: { xs: 0.62, sm: 0.8, md: isHeaderCompact ? 0.55 : 0.9 },
                  minHeight: { xs: 38, sm: 44, md: isHeaderCompact ? 36 : 46 },
                  minWidth: { xs: 98, sm: 146, md: isHeaderCompact ? 82 : "auto" },
                  fontWeight: 700,
                  fontSize: { xs: 13, sm: 15, md: isHeaderCompact ? 12.5 : 16 },
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  boxShadow: "0 12px 24px rgba(18, 28, 74, 0.52)",
                  border: "1px solid rgba(145, 168, 255, 0.28)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, border-color 0.2s ease",
                  "& .MuiButton-startIcon": {
                    mr: { xs: 0.45, sm: 0.9 },
                    "& svg": {
                      fontSize: { xs: 17, sm: 21, md: 22 },
                    },
                  },
                  "&::before": {
                    content: '\"\"',
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(120deg, transparent 20%, rgba(188,210,255,0.18) 48%, transparent 76%)",
                    opacity: 0.55,
                    transform: "translateX(-25%)",
                  },
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 18px 34px rgba(20, 34, 92, 0.62)",
                    filter: "brightness(1.06)",
                    borderColor: "rgba(170, 192, 255, 0.38)",
                  },
                }}
              >
                {isHeaderCompact ? (
                  "CV"
                ) : (
                  <>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      {t.downloadCv}
                    </Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                      CV
                    </Box>
                  </>
                )}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isHeaderCompact ? <Box sx={{ height: { xs: 74, md: 86 } }} /> : null}

      <Container id="home" maxWidth="lg" sx={{ py: { xs: 4, md: 9 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 3, md: 12 },
            position: "relative",
            minHeight: { xs: 960, md: "auto" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: 600 },
              width: "100%",
              zIndex: 2,
              mt: { xs: 34, md: 0 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Chip
              label={t.availableForWork}
              sx={{
                bgcolor: "rgba(136, 255, 191, 0.12)",
                color: "#8ef5b8",
                border: "1px solid rgba(142,245,184,0.3)",
                fontWeight: 600,
                mb: 3,
              }}
            />

            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.2, fontSize: { xs: 42, sm: 54, md: 40 }, color: titleColorPrimary }}>
              {t.hello} <span style={{ color: "#d9e2f1" }}>Luis Colmenares</span>
            </Typography>

            <Typography variant="h3" sx={{ mt: 2, fontWeight: 700, color: "#a9b6cf", fontSize: { xs: 26, md: 32 } }}>
              {t.role}
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, color: "#d6deed", maxWidth: 620, fontSize: 19, lineHeight: 1.8 }}>
              {`${t.heroSummaryBefore} ${yearsLabel} ${t.heroSummaryAfter}`}
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexDirection: { xs: "row", sm: "row" }, justifyContent: { xs: "center", md: "flex-start" }, flexWrap: "wrap" }}>
              <Button variant="contained" href="mailto:luiszrita@gmail.com" sx={{ borderRadius: 999, bgcolor: "#f2f5f9", color: "#0b0c10", px: 3, py: 1.3, textTransform: "none", fontWeight: 700, minWidth: { xs: 160, sm: "auto" } }}>
                {t.contactMe}
              </Button>
              <Button variant="outlined" href="https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/" target="_blank" rel="noreferrer" sx={{ borderRadius: 999, borderColor: "rgba(255,255,255,0.2)", color: "#fff", px: 3, py: 1.3, textTransform: "none", minWidth: { xs: 160, sm: "auto" } }}>
                LinkedIn
              </Button>
            </Box>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, color: "#dfe3ea" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#a9b6cf" }} />
                <Typography variant="body2">Caracas, Venezuela</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailOutlinedIcon sx={{ fontSize: 18, color: "#a9b6cf" }} />
                <Typography variant="body2">luiszrita@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneOutlinedIcon sx={{ fontSize: 18, color: "#a9b6cf" }} />
                <Typography variant="body2">+58 424-1070060</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 0.9,
              width: "100%",
              maxWidth: { xs: 420, md: 500 },
              height: { xs: 520, md: 500 },
              ml: { xs: 0, md: 12 },
              mt: { xs: 0, md: 0 },
              mb: { xs: 0, md: 0 },
              pt: { xs: 0, md: 0 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: { xs: "absolute", md: "relative" },
              top: { xs: -12, md: "auto" },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "translateX(48px)" },
              zIndex: 1,
              opacity: { xs: 0.95, md: 1 },
              overflow: "visible",
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: { xs: 360, md: 450 },
                height: { xs: 360, md: 450 },
                borderRadius: "50%",
                border: "1px solid rgba(165,175,255,0.24)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: { xs: 245, md: 290 },
                height: { xs: 245, md: 290 },
                borderRadius: "50%",
                border: "1px solid rgba(165,175,255,0.24)",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: { xs: 360, md: 450 },
                height: { xs: 360, md: 450 },
                borderRadius: "50%",
                animation: `orbit-spin ${outerOrbitDuration} linear infinite`,
              }}
            >
              {outerOrbitItems.map(({ name, Icon, color, angle }) => {
                const { top, left } = getOrbitPosition(angle);
                return (
                  <Box
                    key={name}
                    sx={{
                      position: "absolute",
                      top,
                      left,
                      width: { xs: 44, md: 50 },
                      height: { xs: 44, md: 50 },
                      borderRadius: "50%",
                      bgcolor: "#f8faff",
                      border: "1px solid rgba(11,15,26,0.24)",
                      boxShadow: "0 4px 12px rgba(4,6,14,0.38)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      cursor: "default",
                      transform: "translate(-50%, -50%)",
                      "&:hover": {
                        transform: "translate(-50%, -50%) scale(1.14)",
                        boxShadow: "0 8px 20px rgba(4,6,14,0.48)",
                      },
                      "&:hover .orbit-tooltip": {
                        opacity: 1,
                        transform: "translate(-50%, -8px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: `orbit-spin-reverse ${outerOrbitDuration} linear infinite`,
                        transformOrigin: "center center",
                      }}
                    >
                      {Icon ? <Icon size={22} color={color} /> : null}
                      <Box
                        className="orbit-tooltip"
                        sx={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translate(-50%, -2px)",
                          bgcolor: "rgba(9,12,20,0.95)",
                          color: "#edf2ff",
                          border: "1px solid rgba(255,255,255,0.14)",
                          borderRadius: 1.2,
                          fontSize: 11,
                          lineHeight: 1,
                          px: 1,
                          py: 0.7,
                          whiteSpace: "nowrap",
                          opacity: 0,
                          pointerEvents: "none",
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                          zIndex: 4,
                        }}
                      >
                        {name}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                position: "absolute",
                width: { xs: 245, md: 290 },
                height: { xs: 245, md: 290 },
                borderRadius: "50%",
                animation: `orbit-spin-reverse ${innerOrbitDuration} linear infinite`,
              }}
            >
              {innerOrbitItems.map(({ name, Icon, color, angle }) => {
                const { top, left } = getOrbitPosition(angle);
                return (
                  <Box
                    key={name}
                    sx={{
                      position: "absolute",
                      top,
                      left,
                      width: { xs: 40, md: 46 },
                      height: { xs: 40, md: 46 },
                      borderRadius: "50%",
                      bgcolor: "#f8faff",
                      border: "1px solid rgba(11,15,26,0.24)",
                      boxShadow: "0 4px 12px rgba(4,6,14,0.38)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      cursor: "default",
                      transform: "translate(-50%, -50%)",
                      "&:hover": {
                        transform: "translate(-50%, -50%) scale(1.14)",
                        boxShadow: "0 8px 20px rgba(4,6,14,0.48)",
                      },
                      "&:hover .orbit-tooltip": {
                        opacity: 1,
                        transform: "translate(-50%, -8px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: `orbit-spin ${innerOrbitDuration} linear infinite`,
                        transformOrigin: "center center",
                      }}
                    >
                      {Icon ? <Icon size={20} color={color} /> : null}
                      <Box
                        className="orbit-tooltip"
                        sx={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translate(-50%, -2px)",
                          bgcolor: "rgba(9,12,20,0.95)",
                          color: "#edf2ff",
                          border: "1px solid rgba(255,255,255,0.14)",
                          borderRadius: 1.2,
                          fontSize: 11,
                          lineHeight: 1,
                          px: 1,
                          py: 0.7,
                          whiteSpace: "nowrap",
                          opacity: 0,
                          pointerEvents: "none",
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                          zIndex: 4,
                        }}
                      >
                        {name}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                width: { xs: 112, md: 132 },
                height: { xs: 112, md: 132 },
                borderRadius: "50%",
                background: "linear-gradient(140deg, #f5f4ff 0%, #e9ebff 100%)",
                border: "1px solid rgba(122,146,255,0.32)",
                boxShadow: "0 16px 45px rgba(6,8,24,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Typography sx={{ fontSize: { xs: 42, md: 50 }, fontWeight: 900, letterSpacing: -3, color: "#4f47ff", lineHeight: 0.8 }}>
                LC
              </Typography>
            </Box>

          </Box>
        </Box>

        <Box sx={{ mt: 6, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
          <ArrowDownwardRoundedIcon sx={{ color: "#a9b6cf", fontSize: 36 }} />
        </Box>
      </Container>

      <Container id="about" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 5, alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.8, color: titleColorAccent }}>
              {t.aboutTitle}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#dfe3ea", mb: 1 }}>
              {t.aboutSubtitle}
            </Typography>
            <Typography variant="body1" sx={{ color: "#c6cfdf", lineHeight: 1.9 }}>
              {t.aboutText}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4, bgcolor: "rgba(18,21,29,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box>
                  <Typography variant="overline" sx={{ color: "#8fa1bf", letterSpacing: 1.5 }}>{t.roleLabel}</Typography>
                  <Typography variant="body1" sx={{ color: "#f3f6fb", fontWeight: 600 }}>{t.currentRole}</Typography>
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: "#8fa1bf", letterSpacing: 1.5 }}>{t.companyLabel}</Typography>
                  <Typography variant="body1" sx={{ color: "#f3f6fb", fontWeight: 600 }}>Grupo Venemergencia</Typography>
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: "#8fa1bf", letterSpacing: 1.5 }}>{t.experienceLabel}</Typography>
                  <Typography variant="body1" sx={{ color: "#f3f6fb", fontWeight: 600 }}>{language === "es" ? "Diciembre 2020 - Actualidad" : "December 2020 - Present"}</Typography>
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: "#8fa1bf", letterSpacing: 1.5 }}>{t.educationLabel}</Typography>
                  <Typography variant="body1" sx={{ color: "#f3f6fb", fontWeight: 600 }}>{t.degreeTitle} - Universidad Santa Maria (2017)</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Container id="experience" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, letterSpacing: -0.8, color: titleColorAccent }}>
          {t.experienceTitle}
        </Typography>

        <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, bgcolor: "rgba(18,21,29,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: titleColorPrimary }}>{t.currentRole}</Typography>
              <Typography variant="body1" sx={{ color: "#a7b7d0", mt: 0.5 }}>Grupo Venemergencia</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#a7b7d0", fontWeight: 600 }}>
              {t.currentTime}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pl: { xs: 0, md: 1 } }}>
            {experiencePoints.map((point) => (
              <Box key={point} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#8ef5b8", mt: 1.2, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ color: "#dfe3ea", lineHeight: 1.8 }}>{point}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="overline" sx={{ display: "block", mt: 4, color: "#8fa1bf", letterSpacing: 1.4 }}>
            {t.technologiesUsed}
          </Typography>
          <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            {[
              "React",
              "Next.js",
              "JavaScript",
              "HTML5",
              "CSS3",
              "Figma",
              "Git",
              "Bitbucket",
              "Jira",
              "Adobe",
            ].map((tool) => (
              <Chip key={tool} label={tool} sx={{ bgcolor: "rgba(255,255,255,0.04)", color: "#edf2ff", border: "1px solid rgba(255,255,255,0.08)" }} />
            ))}
          </Box>
        </Paper>
      </Container>

      <Container id="skills" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, letterSpacing: -0.8, color: titleColorAccent }}>
          {t.skillsTitle}
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {skillGroups.map((group) => (
            <Box key={group.title} sx={{ flex: "1 1 280px", minWidth: 0 }}>
              <Paper sx={{ p: 3, borderRadius: 4, height: "100%", bgcolor: "rgba(18,21,29,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: titleColorPrimary }}>
                  {group.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {group.items.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: "rgba(122,146,255,0.12)", color: "#dfe6ff", border: "1px solid rgba(122,146,255,0.2)" }} />
                  ))}
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 280px" }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "rgba(18,21,29,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: titleColorPrimary }}>{t.educationTitle}</Typography>
              <Typography variant="body1" sx={{ color: "#f4f7fb", fontWeight: 600 }}>{t.degreeTitle}</Typography>
              <Typography variant="body2" sx={{ color: "#a7b7d0", mt: 0.5 }}>Universidad Santa Maria · 2017</Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: "1 1 280px" }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: "rgba(18,21,29,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: titleColorPrimary }}>{t.certificationTitle}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {courseList.slice(0, 8).map((course) => (
                  <Typography key={course} variant="body2" sx={{ color: "#dfe3ea" }}>• {course}</Typography>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Container id="contact" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, background: "linear-gradient(135deg, rgba(103,112,255,0.16), rgba(18,21,29,0.94))", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 3 }}>
            <Box>
              <Typography variant="overline" sx={{ color: "#afc2ff", letterSpacing: 1.5 }}>{t.contactSectionLabel}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: titleColorPrimary }}>{t.contactSectionTitle}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <Button startIcon={<EmailOutlinedIcon />} href="mailto:luiszrita@gmail.com" sx={{ borderRadius: 999, bgcolor: "#f3f6fb", color: "#0b0c10", px: 2.5, py: 1.2, textTransform: "none", fontWeight: 700 }}>
                Email
              </Button>
              <Button startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/" target="_blank" rel="noreferrer" sx={{ borderRadius: 999, borderColor: "rgba(255,255,255,0.2)", color: "#fff", px: 2.5, py: 1.2, textTransform: "none" }}>
                LinkedIn
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      <Button
        aria-label={t.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{
          position: "fixed",
          right: { xs: 14, sm: 18, md: 24 },
          bottom: { xs: 18, sm: 24, md: 28 },
          minWidth: 0,
          width: { xs: 44, md: 48 },
          height: { xs: 44, md: 48 },
          borderRadius: "50%",
          p: 0,
          zIndex: 1200,
          bgcolor: "rgba(34, 51, 110, 0.88)",
          color: "#eef3ff",
          border: "1px solid rgba(170, 191, 255, 0.34)",
          boxShadow: "0 12px 28px rgba(6, 12, 34, 0.46)",
          backdropFilter: "blur(10px)",
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? "translateY(0) scale(1)" : "translateY(14px) scale(0.9)",
          pointerEvents: showBackToTop ? "auto" : "none",
          transition: "opacity 0.26s ease, transform 0.26s ease, box-shadow 0.24s ease, background-color 0.24s ease",
          "&:hover": {
            bgcolor: "rgba(52, 77, 166, 0.94)",
            boxShadow: "0 16px 34px rgba(10, 19, 50, 0.58)",
            transform: "translateY(-2px) scale(1.04)",
          },
        }}
      >
        <ArrowDownwardRoundedIcon sx={{ fontSize: 24, transform: "rotate(180deg)" }} />
      </Button>

      <Box sx={{ py: 3, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "#a7b7d0" }}>© 2026 Luis Colmenares</Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Link href="mailto:luiszrita@gmail.com" underline="none" sx={{ color: "#dfe3ea" }}>{t.footerEmail}</Link>
              <Link href="https://github.com" target="_blank" rel="noreferrer" underline="none" sx={{ color: "#dfe3ea" }}>
                <GitHubIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
              </Link>
              <Link href="https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/" target="_blank" rel="noreferrer" underline="none" sx={{ color: "#dfe3ea" }}>
                <LinkedInIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
