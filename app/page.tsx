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
import ProjectCarousel, { PROJECTS } from "@/components/ProjectCarousel";
import ContactForm from "@/components/ContactForm";
import type { IconType } from "react-icons";
import type { Language } from "@/lib/experience";
import { calculateExperienceDuration, formatExperienceDuration } from "@/lib/experience";
import {
  WORK_START_DATE,
  currentCompany,
  freelanceCompany,
  educationInstitution,
  experienceTechnologies,
  freelanceExperienceTechnologies,
  experiencePointsByLanguage,
  courseListByLanguage,
  graduationYear,
  personalInfo,
  skillGroupsByLanguage,
} from "@/lib/cvContent";
import { generateCvPdf } from "@/lib/generateCvPdf";
import { trackEvent } from "@/lib/analytics";
import {
  SiCss,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiGsap,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiNpm,
  SiRadixui,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";

const navItems = [
  { id: "home", es: "Inicio", en: "Home" },
  { id: "about", es: "Sobre mí", en: "About" },
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
    contactMe: "Contáctame",
    aboutTitle: "Sobre mí",
    aboutSubtitle: "Desarrollador frontend enfocado en interfaces limpias y resultados medibles.",
    aboutText:
      "Soy un profesional orientado al detalle, con fuerte equilibrio entre ejecución técnica y visión UX. He construido y mantenido experiencias web modernas optimizando usabilidad, SEO, accesibilidad y velocidad de carga.",
    roleLabel: "Cargo",
    companyLabel: "Empresa",
    experienceLabel: "Experiencia",
    educationLabel: "Educación",
    experienceTitle: "Experiencia",
    currentRole: "Desarrollador Frontend",
    currentTime: "Diciembre 2020 - Actualidad · Caracas, Venezuela",
    freelanceRole: "Desarrollador Frontend",
    freelanceTime: "Octubre 2025 - Marzo 2026 (6 meses) · Remoto",
    technologiesUsed: "Tecnologías y herramientas utilizadas",
    projectsTitle: "Proyectos Destacados",
    projectsCta: "Ver Proyecto",
    projectsPrev: "Desplazar a la izquierda",
    projectsNext: "Desplazar a la derecha",
    skillsTitle: "Habilidades",
    educationTitle: "Educación",
    degreeTitle: "Licenciado en Contaduría Pública",
    certificationTitle: "Cursos y certificaciones",
    contactSectionLabel: "Conectemos",
    contactSectionTitle: "¿Tienes un proyecto en mente? Hagámoslo realidad.",
    contactFormEmailLabel: "Correo electrónico",
    contactFormEmailPlaceholder: "tu@correo.com",
    contactFormMessageLabel: "Mensaje",
    contactFormMessagePlaceholder: "Cuéntame sobre tu proyecto o consulta…",
    contactFormSubmitLabel: "Enviar mensaje",
    contactFormSubmittingLabel: "Enviando…",
    contactFormSuccessMessage: "¡Mensaje enviado! Te responderé lo antes posible.",
    contactFormGenericErrorMessage: "No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo por correo.",
    contactFormConfigMissingMessage: "El formulario aún no está configurado. Escríbeme directo por correo mientras tanto.",
    contactFormRateLimitedMessage: "Alcanzaste el límite de 2 mensajes por día. Intenta de nuevo mañana o escríbeme directo por correo.",
    contactFormRequiredEmailMessage: "Ingresa tu correo electrónico.",
    contactFormInvalidEmailMessage: "Ingresa un correo electrónico válido.",
    contactFormRequiredMessageMessage: "Escribe tu mensaje.",
    contactFormMinLengthMessageMessage: "El mensaje debe tener al menos 10 caracteres.",
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
    freelanceRole: "Frontend Developer",
    freelanceTime: "October 2025 - March 2026 (6 months) · Remote",
    technologiesUsed: "Technologies & tools used",
    projectsTitle: "Featured Projects",
    projectsCta: "View Project",
    projectsPrev: "Scroll left",
    projectsNext: "Scroll right",
    skillsTitle: "Skills",
    educationTitle: "Education",
    degreeTitle: "Bachelor\'s Degree in Public Accounting",
    certificationTitle: "Courses & certifications",
    contactSectionLabel: "Let\'s connect",
    contactSectionTitle: "Do you have a project in mind? Let's make it happen.",
    contactFormEmailLabel: "Email address",
    contactFormEmailPlaceholder: "you@email.com",
    contactFormMessageLabel: "Message",
    contactFormMessagePlaceholder: "Tell me about your project or question…",
    contactFormSubmitLabel: "Send message",
    contactFormSubmittingLabel: "Sending…",
    contactFormSuccessMessage: "Message sent! I'll get back to you as soon as possible.",
    contactFormGenericErrorMessage: "Couldn't send the message. Please try again or email me directly.",
    contactFormConfigMissingMessage: "The form isn't configured yet. Please email me directly in the meantime.",
    contactFormRateLimitedMessage: "You've reached the limit of 2 messages per day. Please try again tomorrow or email me directly.",
    contactFormRequiredEmailMessage: "Enter your email address.",
    contactFormInvalidEmailMessage: "Enter a valid email address.",
    contactFormRequiredMessageMessage: "Write your message.",
    contactFormMinLengthMessageMessage: "The message must be at least 10 characters long.",
    footerEmail: "Email",
    backToTop: "Back to top",
  },
} satisfies Record<Language, Record<string, string>>;

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
  { name: "Material UI", Icon: SiMui, color: "#007fff", angle: 2 },
  { name: "npm", Icon: SiNpm, color: "#cb3837", angle: 56 },
  { name: "Firebase", Icon: SiFirebase, color: "#ff9f00", angle: 110 },
  { name: "GSAP", Icon: SiGsap, color: "#8af7af", angle: 156 },
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

/**
 * Tokens de diseño compartidos. Centralizan combinaciones de color que antes
 * estaban repetidas y ligeramente distintas en cada sección (chips de
 * tecnología, superficies de panel), para que el mismo tipo de elemento se
 * vea siempre igual en toda la página.
 */
const surfacePanelSx = {
  bgcolor: "rgba(18,21,29,0.9)",
  border: "1px solid rgba(255,255,255,0.08)",
} as const;

const techChipSx = {
  bgcolor: "rgba(122,146,255,0.14)",
  color: "#dfe6ff",
  border: "1px solid rgba(122,146,255,0.3)",
  fontWeight: 600,
} as const;

/**
 * High-contrast keyboard-focus ring. MUI's Button/IconButton/Link
 * components reset `outline: 0` on their root and manage their own
 * `Mui-focusVisible` class internally, at a stylesheet-insertion order
 * a plain global CSS rule can't reliably win against. `sx` is the one
 * override channel MUI itself guarantees wins, so the ring lives here
 * and gets spread onto every focusable element's `sx`.
 */
const focusRingSx = {
  "&.Mui-focusVisible": {
    boxShadow: "0 0 0 2px #05070d, 0 0 0 4.5px #67e8ff",
  },
} as const;

const primaryButtonHoverActiveSx = {
  transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, background-color 0.2s ease",
  "&:hover": {
    filter: "brightness(0.96)",
    transform: "translateY(-1px)",
    boxShadow: "0 10px 24px rgba(6, 10, 26, 0.4)",
  },
  "&:active": {
    transform: "translateY(0) scale(0.98)",
    boxShadow: "0 4px 12px rgba(6, 10, 26, 0.32)",
  },
  ...focusRingSx,
} as const;

const outlinedButtonHoverActiveSx = {
  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.42)",
    bgcolor: "rgba(255,255,255,0.06)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0) scale(0.98)",
    bgcolor: "rgba(255,255,255,0.09)",
  },
  ...focusRingSx,
} as const;

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

    // La preferencia guardada manualmente por el usuario siempre gana
    // sobre la detección automática del navegador.
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "es") {
      return saved;
    }

    // Sin preferencia guardada (primera visita): usar el idioma del
    // navegador como arranque automático. `navigator.languages` refleja
    // el orden de preferencia real del usuario mejor que el único
    // `navigator.language`, así que se prioriza cuando está disponible.
    const browserLanguages = window.navigator.languages?.length
      ? window.navigator.languages
      : [window.navigator.language];
    const prefersEnglish = browserLanguages.some((lang) =>
      lang?.toLowerCase().startsWith("en")
    );

    // Cualquier idioma que no sea inglés (español incluido) cae al
    // español por defecto, como pide el requerimiento.
    return prefersEnglish ? "en" : "es";
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
  const experienceDuration = calculateExperienceDuration(WORK_START_DATE);
  const experienceDurationLabel = formatExperienceDuration(experienceDuration, language);
  const yearsLabel =
    language === "es"
      ? `${experienceDurationLabel} de experiencia`
      : `${experienceDurationLabel} of experience`;
  const experiences = [
    {
      role: t.currentRole,
      company: currentCompany,
      period: t.currentTime,
      points: experiencePoints,
      technologies: experienceTechnologies,
    },
    {
      role: t.freelanceRole,
      company: freelanceCompany,
      period: t.freelanceTime,
      points: experiencePoints,
      technologies: freelanceExperienceTechnologies,
    },
  ];

  const handleDownloadCv = () => {
    trackEvent("cv_download", { language });
    generateCvPdf({
      language,
      fileName:
        language === "es"
          ? "CV Luis Colmenares (ES).pdf"
          : "Luis Colmenares (EN).pdf",
      name: personalInfo.name,
      role: t.role,
      location: personalInfo.location,
      email: personalInfo.email,
      phone: personalInfo.phone,
      linkedin: personalInfo.linkedin,
      summary: `${t.heroSummaryBefore} ${yearsLabel} ${t.heroSummaryAfter}`,
      sectionLabels: {
        profile: t.aboutTitle,
        experience: t.experienceTitle,
        education: t.educationTitle,
        skills: t.skillsTitle,
        certifications: t.certificationTitle,
        technologies: t.technologiesUsed,
      },
      experiences,
      education: {
        degree: t.degreeTitle,
        institution: `${educationInstitution} · ${graduationYear}`,
      },
      skillGroups,
      courses: courseList,
    });
  };

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
              {/* Marca del nav, no un heading de contenido: usar
                  component="span" evita un <h6> duplicado del nombre que
                  ya es el <h1> del hero. */}
              <Typography
                variant="h6"
                component="span"
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
                    ...focusRingSx,
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
                  component="span"
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
                      "&:hover": {
                        bgcolor: language === "es" ? "rgba(104,128,255,0.42)" : "rgba(255,255,255,0.08)",
                      },
                      ...focusRingSx,
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
                      "&:hover": {
                        bgcolor: language === "en" ? "rgba(104,128,255,0.42)" : "rgba(255,255,255,0.08)",
                      },
                      ...focusRingSx,
                    }}
                  >
                    EN
                  </Button>
                </Box>

                <Button
                  onClick={handleDownloadCv}
                  variant="contained"
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    borderRadius: 999,
                    bgcolor: "rgba(22, 28, 52, 0.92)",
                    color: "#eaf0ff",
                    textTransform: "none",
                    px: isHeaderCompact ? 1.1 : 1.45,
                    py: isHeaderCompact ? 0.45 : 0.6,
                    minHeight: isHeaderCompact ? 32 : 36,
                    minWidth: isHeaderCompact ? 78 : 88,
                    fontWeight: 700,
                    fontSize: isHeaderCompact ? 11.5 : 12.5,
                    whiteSpace: "nowrap",
                    border: "1px solid rgba(145, 168, 255, 0.34)",
                    ...primaryButtonHoverActiveSx,
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
                      ...focusRingSx,
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
                    ...focusRingSx,
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
                    ...focusRingSx,
                  }}
                >
                  EN
                </Button>
              </Box>

              <Button
                onClick={handleDownloadCv}
                variant="contained"
                startIcon={<DownloadRoundedIcon />}
                sx={{
                  borderRadius: 999,
                  bgcolor: "rgba(22, 28, 52, 0.92)",
                  color: "#eaf0ff",
                  textTransform: "none",
                  px: { xs: 1.6, sm: 2.1, md: isHeaderCompact ? 1.5 : 2.4 },
                  py: { xs: 0.62, sm: 0.8, md: isHeaderCompact ? 0.55 : 0.9 },
                  minHeight: { xs: 38, sm: 44, md: isHeaderCompact ? 36 : 46 },
                  minWidth: { xs: 98, sm: 146, md: isHeaderCompact ? 82 : "auto" },
                  fontWeight: 700,
                  fontSize: { xs: 13, sm: 15, md: isHeaderCompact ? 12.5 : 16 },
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  border: "1px solid rgba(145, 168, 255, 0.34)",
                  "& .MuiButton-startIcon": {
                    mr: { xs: 0.45, sm: 0.9 },
                    "& svg": {
                      fontSize: { xs: 17, sm: 21, md: 22 },
                    },
                  },
                  ...primaryButtonHoverActiveSx,
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
              mt: { xs: 42, md: 0 },
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

            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.2, fontSize: { xs: 42, sm: 54, md: 40 }, color: titleColorPrimary }}
            >
              {t.hello} <span style={{ color: "#d9e2f1" }}>Luis Colmenares</span>
            </Typography>

            {/* Subtítulo del hero, no un heading nuevo: el h1 de arriba ya es
                el único encabezado de nivel 1 de la página. */}
            <Typography
              variant="h3"
              component="p"
              sx={{ mt: 2, fontWeight: 700, color: "#a9b6cf", fontSize: { xs: 26, md: 32 } }}
            >
              {t.role}
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, color: "#d6deed", maxWidth: 620, fontSize: 19, lineHeight: 1.8 }}>
              {`${t.heroSummaryBefore} ${yearsLabel} ${t.heroSummaryAfter}`}
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexDirection: { xs: "row", sm: "row" }, justifyContent: { xs: "center", md: "flex-start" }, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                href="mailto:luiszrita@gmail.com"
                onClick={() => trackEvent("contact_click", { method: "email", location: "hero" })}
                sx={{
                  borderRadius: 999,
                  bgcolor: "#f2f5f9",
                  color: "#0b0c10",
                  px: 3,
                  py: 1.3,
                  textTransform: "none",
                  fontWeight: 700,
                  minWidth: { xs: 160, sm: "auto" },
                  ...primaryButtonHoverActiveSx,
                }}
              >
                {t.contactMe}
              </Button>
              <Button
                variant="outlined"
                href="https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("contact_click", { method: "linkedin", location: "hero" })}
                sx={{
                  borderRadius: 999,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  px: 3,
                  py: 1.3,
                  textTransform: "none",
                  minWidth: { xs: 160, sm: "auto" },
                  ...outlinedButtonHoverActiveSx,
                }}
              >
                LinkedIn
              </Button>
            </Box>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, color: "#dfe3ea" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#a9b6cf" }} />
                <Typography variant="body2">Caracas, Venezuela</Typography>
              </Box>
              <Link
                href="mailto:luiszrita@gmail.com"
                underline="none"
                onClick={() => trackEvent("contact_click", { method: "email", location: "hero_info" })}
                sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "#f5f7fa" }, ...focusRingSx }}
              >
                <EmailOutlinedIcon sx={{ fontSize: 18, color: "#a9b6cf" }} />
                <Typography variant="body2">luiszrita@gmail.com</Typography>
              </Link>
              <Link
                href="tel:+584241070060"
                underline="none"
                onClick={() => trackEvent("contact_click", { method: "phone", location: "hero_info" })}
                sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "#f5f7fa" }, ...focusRingSx }}
              >
                <PhoneOutlinedIcon sx={{ fontSize: 18, color: "#a9b6cf" }} />
                <Typography variant="body2">+58 424-1070060</Typography>
              </Link>
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
              overflow: { xs: "hidden", md: "visible" },
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maskImage: {
                  xs: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.22) 76%, rgba(0,0,0,0.08) 100%)",
                  md: "none",
                },
                WebkitMaskImage: {
                  xs: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.22) 76%, rgba(0,0,0,0.08) 100%)",
                  md: "none",
                },
              }}
            >
            <Box
              sx={{
                position: "absolute",
                width: { xs: 290, md: 450 },
                height: { xs: 290, md: 450 },
                borderRadius: "50%",
                border: "1px solid rgba(165,175,255,0.24)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: { xs: 198, md: 290 },
                height: { xs: 198, md: 290 },
                borderRadius: "50%",
                border: "1px solid rgba(165,175,255,0.24)",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: { xs: 290, md: 450 },
                height: { xs: 290, md: 450 },
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
                      width: { xs: 34, md: 50 },
                      height: { xs: 34, md: 50 },
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
                width: { xs: 198, md: 290 },
                height: { xs: 198, md: 290 },
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
                      width: { xs: 32, md: 46 },
                      height: { xs: 32, md: 46 },
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
              <Typography sx={{ fontSize: { xs: 42, md: 50 }, fontWeight: 900, letterSpacing: -3, color: "#0b0c10", lineHeight: 0.8 }}>
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
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.8, color: titleColorAccent }}>
              {t.aboutTitle}
            </Typography>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: "#dfe3ea", mb: 1 }}>
              {t.aboutSubtitle}
            </Typography>
            <Typography variant="body1" sx={{ color: "#c6cfdf", lineHeight: 1.9 }}>
              {t.aboutText}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4, ...surfacePanelSx }}>
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
        <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 4, letterSpacing: -0.8, color: titleColorAccent }}>
          {t.experienceTitle}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {experiences.map((experience) => (
            <Paper key={experience.company} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, ...surfacePanelSx }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: titleColorPrimary }}>{experience.role}</Typography>
                  <Typography variant="body1" sx={{ color: "#a7b7d0", mt: 0.5 }}>{experience.company}</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#a7b7d0", fontWeight: 600 }}>
                  {experience.period}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pl: { xs: 0, md: 1 } }}>
                {experience.points.map((point) => (
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
                {experience.technologies.map((tool) => (
                  <Chip key={tool} label={tool} sx={techChipSx} />
                ))}
              </Box>
            </Paper>
          ))}
        </Box>

        <ProjectCarousel
          projects={PROJECTS}
          title={t.projectsTitle}
          ctaLabel={t.projectsCta}
          prevLabel={t.projectsPrev}
          nextLabel={t.projectsNext}
        />
      </Container>

      <Container id="skills" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 4, letterSpacing: -0.8, color: titleColorAccent }}>
          {t.skillsTitle}
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {skillGroups.map((group) => (
            <Box key={group.title} sx={{ flex: "1 1 280px", minWidth: 0 }}>
              <Paper sx={{ p: 3, borderRadius: 4, height: "100%", ...surfacePanelSx }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 2, color: titleColorPrimary }}>
                  {group.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {group.items.map((item) => (
                    <Chip key={item} label={item} sx={techChipSx} />
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
            <Paper sx={{ p: 3, borderRadius: 4, ...surfacePanelSx }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2, color: titleColorPrimary }}>{t.educationTitle}</Typography>
              <Typography variant="body1" sx={{ color: "#f4f7fb", fontWeight: 600 }}>{t.degreeTitle}</Typography>
              <Typography variant="body2" sx={{ color: "#a7b7d0", mt: 0.5 }}>Universidad Santa Maria · 2017</Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: "1 1 280px" }}>
            <Paper sx={{ p: 3, borderRadius: 4, ...surfacePanelSx }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2, color: titleColorPrimary }}>{t.certificationTitle}</Typography>
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
              <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mt: 1, color: titleColorPrimary }}>{t.contactSectionTitle}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <Button
                startIcon={<EmailOutlinedIcon />}
                href="mailto:luiszrita@gmail.com"
                onClick={() => trackEvent("contact_click", { method: "email", location: "contact_section" })}
                sx={{
                  borderRadius: 999,
                  bgcolor: "#f3f6fb",
                  color: "#0b0c10",
                  px: 2.5,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 700,
                  ...primaryButtonHoverActiveSx,
                }}
              >
                Email
              </Button>
              <Button
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("contact_click", { method: "linkedin", location: "contact_section" })}
                sx={{
                  borderRadius: 999,
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  px: 2.5,
                  py: 1.2,
                  textTransform: "none",
                  ...outlinedButtonHoverActiveSx,
                }}
              >
                LinkedIn
              </Button>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: { xs: 4, md: 5 } }} />

          <Box sx={{ maxWidth: 560 }}>
            <ContactForm
              labels={{
                emailLabel: t.contactFormEmailLabel,
                emailPlaceholder: t.contactFormEmailPlaceholder,
                messageLabel: t.contactFormMessageLabel,
                messagePlaceholder: t.contactFormMessagePlaceholder,
                submitLabel: t.contactFormSubmitLabel,
                submittingLabel: t.contactFormSubmittingLabel,
                successMessage: t.contactFormSuccessMessage,
                genericErrorMessage: t.contactFormGenericErrorMessage,
                configMissingMessage: t.contactFormConfigMissingMessage,
                rateLimitedMessage: t.contactFormRateLimitedMessage,
                requiredEmailMessage: t.contactFormRequiredEmailMessage,
                invalidEmailMessage: t.contactFormInvalidEmailMessage,
                requiredMessageMessage: t.contactFormRequiredMessageMessage,
                minLengthMessageMessage: t.contactFormMinLengthMessageMessage,
              }}
            />
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
          "&:active": {
            transform: "translateY(0) scale(0.96)",
          },
          ...focusRingSx,
        }}
      >
        <ArrowDownwardRoundedIcon sx={{ fontSize: 24, transform: "rotate(180deg)" }} />
      </Button>

      <Box sx={{ py: 3, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "#a7b7d0" }}>© 2026 Luis Colmenares</Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Link href="mailto:luiszrita@gmail.com" underline="none" sx={{ color: "#dfe3ea", ...focusRingSx }}>{t.footerEmail}</Link>
              <Link href="https://github.com/Luchoccz" target="_blank" rel="noreferrer" underline="none" sx={{ color: "#dfe3ea", ...focusRingSx }}>
                <GitHubIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
              </Link>
              <Link href="https://www.linkedin.com/in/luis-carlos-colmenares-zurita-18557413a/" target="_blank" rel="noreferrer" underline="none" sx={{ color: "#dfe3ea", ...focusRingSx }}>
                <LinkedInIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
