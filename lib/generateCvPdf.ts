import { jsPDF } from "jspdf";
import type { Language } from "./experience";

export type CvPdfData = {
  language: Language;
  fileName: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  sectionLabels: {
    profile: string;
    experience: string;
    education: string;
    skills: string;
    certifications: string;
    technologies: string;
  };
  experiences: Array<{
    role: string;
    company: string;
    period: string;
    points: string[];
    technologies: string[];
  }>;
  education: {
    degree: string;
    institution: string;
  };
  skillGroups: Array<{ title: string; items: string[] }>;
  courses: string[];
};

const PAGE_WIDTH = 210; // A4 mm
const PAGE_HEIGHT = 297;
const MARGIN_X = 18;
const MARGIN_BOTTOM = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const INK = "#141821";
const MUTED = "#54607a";
const ACCENT = "#3548c8";
const RULE = "#dbe0f0";

/**
 * Genera el PDF del CV en el idioma indicado y dispara la descarga en el
 * navegador. Es una función de renderizado "pura" respecto al contenido: no
 * conoce textos en español/inglés por sí misma, solo recibe ya resueltos los
 * strings del idioma activo (ver `handleDownloadCv` en `app/page.tsx`), así
 * que agregar un tercer idioma no requiere tocar este archivo.
 */
export const generateCvPdf = (data: CvPdfData): void => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let cursorY = 20;

  const ensureSpace = (height: number) => {
    if (cursorY + height > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage();
      cursorY = 20;
    }
  };

  const writeParagraph = (
    text: string,
    { fontSize = 10.5, color = INK, lineHeight = 5, bold = false }: { fontSize?: number; color?: string; lineHeight?: number; bold?: boolean } = {}
  ) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
    ensureSpace(lines.length * lineHeight);
    doc.text(lines, MARGIN_X, cursorY);
    cursorY += lines.length * lineHeight;
  };

  const writeBullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(INK);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 5);
    ensureSpace(lines.length * 4.8);
    doc.setFillColor(ACCENT);
    doc.circle(MARGIN_X + 1, cursorY - 1.3, 0.7, "F");
    doc.text(lines, MARGIN_X + 5, cursorY);
    cursorY += lines.length * 4.8;
  };

  const writeSectionTitle = (title: string) => {
    ensureSpace(12);
    cursorY += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(ACCENT);
    doc.text(title.toUpperCase(), MARGIN_X, cursorY);
    cursorY += 2;
    doc.setDrawColor(RULE);
    doc.setLineWidth(0.4);
    doc.line(MARGIN_X, cursorY, PAGE_WIDTH - MARGIN_X, cursorY);
    cursorY += 6;
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(INK);
  doc.text(data.name, MARGIN_X, cursorY);
  cursorY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(ACCENT);
  doc.text(data.role, MARGIN_X, cursorY);
  cursorY += 7;

  const contactLine = [data.location, data.email, data.phone, data.linkedin].join("   ·   ");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(MUTED);
  const contactLines = doc.splitTextToSize(contactLine, CONTENT_WIDTH);
  doc.text(contactLines, MARGIN_X, cursorY);
  cursorY += contactLines.length * 4.2 + 2;

  doc.setDrawColor(ACCENT);
  doc.setLineWidth(0.8);
  doc.line(MARGIN_X, cursorY, PAGE_WIDTH - MARGIN_X, cursorY);
  cursorY += 8;

  // Profile / summary
  writeSectionTitle(data.sectionLabels.profile);
  writeParagraph(data.summary, { lineHeight: 5.2 });

  // Experience
  writeSectionTitle(data.sectionLabels.experience);
  data.experiences.forEach((experience, index) => {
    writeParagraph(`${experience.role} — ${experience.company}`, { bold: true, fontSize: 11.5 });
    writeParagraph(experience.period, { fontSize: 9.5, color: MUTED });
    cursorY += 1;
    experience.points.forEach((point) => writeBullet(point));
    cursorY += 2;
    writeParagraph(`${data.sectionLabels.technologies}: ${experience.technologies.join(", ")}`, {
      fontSize: 9.5,
      color: MUTED,
    });
    if (index < data.experiences.length - 1) {
      cursorY += 3;
    }
  });

  // Education
  writeSectionTitle(data.sectionLabels.education);
  writeParagraph(data.education.degree, { bold: true, fontSize: 11 });
  writeParagraph(data.education.institution, { fontSize: 9.5, color: MUTED });

  // Skills
  writeSectionTitle(data.sectionLabels.skills);
  data.skillGroups.forEach((group) => {
    writeParagraph(group.title, { bold: true, fontSize: 10.5 });
    writeParagraph(group.items.join(", "), { fontSize: 9.5, color: MUTED, lineHeight: 4.6 });
    cursorY += 1.5;
  });

  // Certifications
  writeSectionTitle(data.sectionLabels.certifications);
  data.courses.forEach((course) => writeBullet(course));

  doc.save(data.fileName);
};
