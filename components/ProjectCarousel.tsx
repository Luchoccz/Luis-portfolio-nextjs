'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/**
 * Modelo de datos de un proyecto destacado del portafolio.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectUrl: string;
}

/**
 * Proyectos reales, tomados de la cuenta de Vercel del autor (luchoccz)
 * el 2026-08-16. Capturas generadas con Playwright contra cada URL de
 * producción y guardadas en `/public/projects/`.
 */
export const PROJECTS: Project[] = [
  {
    id: 'ia-interview-prep',
    title: 'AI Interview Prep',
    description:
      'Micro-SaaS para practicar entrevistas de trabajo con feedback de IA en streaming (Vercel AI SDK) palabra por palabra, y dashboard con historial de progreso vía TanStack Query.',
    imageUrl: '/projects/ia-interview-prep.png',
    technologies: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'TanStack Query'],
    projectUrl: 'https://ia-interview-prep.vercel.app',
  },
  {
    id: 'pulse-fi',
    title: 'PulseFi — Real Time Finance',
    description:
      'Dashboard financiero SaaS con métricas en vivo (ingresos, gastos, balance), gráfico de tendencia y stream de transacciones simuladas con soporte multi-divisa.',
    imageUrl: '/projects/pulse-fi.png',
    technologies: ['Next.js', 'TypeScript', 'MUI'],
    projectUrl: 'https://pulse-fi-flax.vercel.app',
  },
  {
    id: 'ecommerce-multitenant',
    title: 'Aurora Market',
    description:
      'Tienda e-commerce multi-tenant de bebidas premium (tés, matchas, kombuchas) con catálogo, búsqueda, filtros y carrito por tienda/tenant.',
    imageUrl: '/projects/ecommerce-multitenant-frontend.png',
    technologies: ['Next.js', 'TypeScript', 'Multi-tenant'],
    projectUrl: 'https://ecommerce-multitenant-frontend.vercel.app',
  },
  {
    id: 'miro-realtime-showcase',
    title: 'Pizarra Colaborativa en Tiempo Real',
    description:
      'MVP frontend-only de una pizarra tipo Miro: actualizaciones optimistas con TanStack Query, presencia en vivo entre pestañas vía BroadcastChannel y persistencia local.',
    imageUrl: '/projects/miro-realtime-showcase.png',
    technologies: ['Next.js', 'TypeScript', 'TanStack Query', 'BroadcastChannel'],
    projectUrl: 'https://miro-realtime-showcase.vercel.app',
  },
  {
    id: 'landing-email-builder',
    title: 'Editor Visual Landing / Email Builder',
    description:
      'Constructor visual de landings y emails por bloques con drag & drop, panel inspector de propiedades y exportación a HTML/CSS, 100% frontend.',
    imageUrl: '/projects/landing-email-builder-frontend.png',
    technologies: ['Next.js', 'TypeScript', 'MUI', 'Drag & Drop'],
    projectUrl: 'https://landing-email-builder-frontend.vercel.app',
  },
];

interface ProjectCarouselProps {
  projects?: Project[];
  title?: string;
  ctaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}

/**
 * Carrusel de proyectos destacados con scroll horizontal snapping
 * y cards flotantes con efecto hover.
 *
 * El esquema de color está tomado del lenguaje visual oscuro del resto
 * del portafolio (ver `app/page.tsx`: fondos `rgba(18,21,29,0.9)`, bordes
 * `rgba(255,255,255,0.08)`, texto `#dfe3ea`/`#f3f7ff`), en lugar de los
 * tokens de tema de MUI, ya que este proyecto no usa `ThemeProvider`.
 */
export default function ProjectCarousel({
  projects = PROJECTS,
  title = 'Proyectos Destacados',
  ctaLabel = 'Ver Proyecto',
  prevLabel = 'Desplazar a la izquierda',
  nextLabel = 'Desplazar a la derecha',
}: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth ?? 320;
    const scrollAmount = cardWidth + 24; // ancho de card + gap aproximado

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <Box component="section" sx={{ position: 'relative', width: '100%', py: { xs: 4, md: 6 } }}>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ fontWeight: 700, color: '#dfe3ea' }}
        >
          {title}
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label={prevLabel}
            onClick={() => scrollByAmount('left')}
            sx={{
              color: '#dfe3ea',
              border: '1px solid rgba(255,255,255,0.14)',
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={nextLabel}
            onClick={() => scrollByAmount('right')}
            sx={{
              color: '#dfe3ea',
              border: '1px solid rgba(255,255,255,0.14)',
              display: { xs: 'none', sm: 'inline-flex' },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Box
        ref={scrollRef}
        role="list"
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          px: { xs: 2, md: 4 },
          py: 2,
          // Da espacio a la sombra/elevación del hover sin recortarla
          mx: { xs: -2, md: -4 },
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255,255,255,0.22)',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.38)',
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.22) rgba(255,255,255,0.05)',
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} ctaLabel={ctaLabel} />
        ))}
      </Box>
    </Box>
  );
}

function ProjectCard({ project, ctaLabel }: { project: Project; ctaLabel: string }) {
  return (
    <Card
      role="listitem"
      elevation={0}
      sx={{
        flex: '0 0 auto',
        scrollSnapAlign: 'center',
        width: { xs: '85vw', sm: 340 },
        minWidth: { xs: '85vw', sm: 340 },
        maxWidth: 380,
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'rgba(18,21,29,0.9)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.32)',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease',
        willChange: 'transform',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          borderColor: 'rgba(122,146,255,0.35)',
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', bgcolor: 'rgba(255,255,255,0.04)' }}>
        <Image
          src={project.imageUrl}
          alt={`Captura de pantalla del proyecto ${project.title}`}
          fill
          sizes="(max-width: 600px) 85vw, 340px"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                bgcolor: 'rgba(122,146,255,0.12)',
                color: '#dfe6ff',
                border: '1px solid rgba(122,146,255,0.2)',
              }}
            />
          ))}
        </Stack>

        <Typography variant="h5" component="h5" sx={{ fontSize: '1.15rem', fontWeight: 600, color: '#f3f7ff' }}>
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#a7b7d0',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          component="a"
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<LaunchIcon fontSize="small" />}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 999,
            borderColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.4)',
              bgcolor: 'rgba(255,255,255,0.06)',
            },
          }}
        >
          {ctaLabel}
        </Button>
      </CardActions>
    </Card>
  );
}
