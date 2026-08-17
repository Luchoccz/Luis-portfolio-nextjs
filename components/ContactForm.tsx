'use client';

import { useId, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN_LENGTH = 10;

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ContactFormLabels {
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  genericErrorMessage: string;
  configMissingMessage: string;
  requiredEmailMessage: string;
  invalidEmailMessage: string;
  requiredMessageMessage: string;
  minLengthMessageMessage: string;
}

const defaultLabels: ContactFormLabels = {
  emailLabel: 'Correo electrónico',
  emailPlaceholder: 'tu@correo.com',
  messageLabel: 'Mensaje',
  messagePlaceholder: 'Cuéntame sobre tu proyecto o consulta…',
  submitLabel: 'Enviar mensaje',
  submittingLabel: 'Enviando…',
  successMessage: '¡Mensaje enviado! Te responderé lo antes posible.',
  genericErrorMessage: 'No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo por correo.',
  configMissingMessage: 'El formulario aún no está configurado. Escríbeme directo por correo mientras tanto.',
  requiredEmailMessage: 'Ingresa tu correo electrónico.',
  invalidEmailMessage: 'Ingresa un correo electrónico válido.',
  requiredMessageMessage: 'Escribe tu mensaje.',
  minLengthMessageMessage: `El mensaje debe tener al menos ${MESSAGE_MIN_LENGTH} caracteres.`,
};

interface ContactFormProps {
  labels?: Partial<ContactFormLabels>;
  /** Destination inbox — informational only; the real recipient is set on the EmailJS template. */
  recipientEmail?: string;
}

/**
 * Miniformulario de contacto autónomo. Envía directamente desde el
 * navegador vía EmailJS (sin backend propio) usando las credenciales
 * públicas configuradas en variables de entorno `NEXT_PUBLIC_EMAILJS_*`
 * (ver `.env.example`). Si no están configuradas, el formulario lo indica
 * claramente en vez de fallar en silencio.
 */
export default function ContactForm({ labels, recipientEmail = 'luiszrita@gmail.com' }: ContactFormProps) {
  const t = { ...defaultLabels, ...labels };
  const formId = useId();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Honeypot: real users never see or fill this field. Any bot that fills
  // every input on the page will, so a non-empty value means "spam" and we
  // quietly no-op instead of tipping the bot off with an explicit rejection.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const isConfigured = Boolean(serviceId && templateId && publicKey);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError(t.requiredEmailMessage);
      return false;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setEmailError(t.invalidEmailMessage);
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateMessage = () => {
    if (!message.trim()) {
      setMessageError(t.requiredMessageMessage);
      return false;
    }
    if (message.trim().length < MESSAGE_MIN_LENGTH) {
      setMessageError(t.minLengthMessageMessage);
      return false;
    }
    setMessageError(null);
    return true;
  };

  /** Full-form validation, run on submit — checks every field regardless of which was last touched. */
  const validate = () => {
    // Intentionally not short-circuited with `&&`: both run so each field's
    // own error state is set even if an earlier one is already invalid.
    const emailValid = validateEmail();
    const messageValid = validateMessage();
    return emailValid && messageValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypotRef.current?.value) {
      // Silently "succeed" for bots without actually sending anything.
      setStatus('success');
      setFeedback(t.successMessage);
      return;
    }

    if (!validate()) {
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setFeedback(t.configMissingMessage);
      return;
    }

    setStatus('loading');
    setFeedback(null);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: email.trim(),
          reply_to: email.trim(),
          to_email: recipientEmail,
          message: message.trim(),
        },
        {
          publicKey,
          blockHeadless: true,
          limitRate: { id: 'portfolio_contact_form', throttle: 20_000 },
        }
      );

      setStatus('success');
      setFeedback(t.successMessage);
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setFeedback(t.genericErrorMessage);
    }
  };

  const isLoading = status === 'loading';

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
    >
      {/*
        Honeypot field: visually and semantically hidden from real users
        via the standard "visually-hidden" pattern. Sizes are explicit
        `'1px'` strings — MUI's `sx` treats bare numbers <= 1 for
        width/height as a *fraction* (e.g. `width: 1` becomes `100%`),
        which previously turned this into a full-size absolutely
        positioned box (no positioned ancestor to constrain it against)
        and inflated the page's scrollable height by ~4000px.
      */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          margin: '-1px',
          padding: 0,
          border: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          clip: 'rect(0, 0, 0, 0)',
        }}
      >
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          ref={honeypotRef}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </Box>

      <TextField
        id={`${formId}-email`}
        type="email"
        label={t.emailLabel}
        placeholder={t.emailPlaceholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={validateEmail}
        error={Boolean(emailError)}
        helperText={emailError ?? ' '}
        required
        fullWidth
        autoComplete="email"
        disabled={isLoading}
        sx={textFieldSx}
      />

      <TextField
        id={`${formId}-message`}
        label={t.messageLabel}
        placeholder={t.messagePlaceholder}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onBlur={validateMessage}
        error={Boolean(messageError)}
        helperText={messageError ?? ' '}
        required
        fullWidth
        multiline
        minRows={4}
        disabled={isLoading}
        sx={textFieldSx}
      />

      {status === 'success' && feedback ? (
        <Alert severity="success" sx={alertSx.success}>
          {feedback}
        </Alert>
      ) : null}

      {status === 'error' && feedback ? (
        <Alert severity="error" sx={alertSx.error}>
          {feedback}
        </Alert>
      ) : null}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          type="submit"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <SendRoundedIcon />}
          sx={submitButtonSx}
        >
          {isLoading ? t.submittingLabel : t.submitLabel}
        </Button>

        {!isConfigured ? (
          <Typography variant="caption" sx={{ color: '#8fa1bf' }}>
            {t.configMissingMessage}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

const textFieldSx = {
  '& .MuiInputBase-root': {
    color: '#f3f7ff',
    bgcolor: 'rgba(12,16,28,0.5)',
    borderRadius: 2,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.16)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.32)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#67e8ff',
    borderWidth: 2,
  },
  '& .MuiInputLabel-root': {
    color: '#a7b7d0',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#67e8ff',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#6b7a94',
    opacity: 1,
  },
  '& .MuiFormHelperText-root': {
    color: '#a7b7d0',
    minHeight: '1.25em',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#ff8a8a',
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff8a8a',
  },
} as const;

const alertSx = {
  success: {
    bgcolor: 'rgba(136,255,191,0.12)',
    color: '#8ef5b8',
    border: '1px solid rgba(142,245,184,0.32)',
    '& .MuiAlert-icon': { color: '#8ef5b8' },
  },
  error: {
    bgcolor: 'rgba(255,120,120,0.12)',
    color: '#ff8a8a',
    border: '1px solid rgba(255,138,138,0.32)',
    '& .MuiAlert-icon': { color: '#ff8a8a' },
  },
} as const;

const submitButtonSx = {
  borderRadius: 999,
  bgcolor: '#f3f6fb',
  color: '#0b0c10',
  px: 3,
  py: 1.2,
  textTransform: 'none',
  fontWeight: 700,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, background-color 0.2s ease',
  '&:hover': {
    filter: 'brightness(0.96)',
    transform: 'translateY(-1px)',
    boxShadow: '0 10px 24px rgba(6, 10, 26, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0) scale(0.98)',
  },
  '&.Mui-disabled': {
    bgcolor: 'rgba(243,246,251,0.5)',
    color: 'rgba(11,12,16,0.6)',
  },
  '&.Mui-focusVisible': {
    boxShadow: '0 0 0 2px #05070d, 0 0 0 4.5px #67e8ff',
  },
} as const;
