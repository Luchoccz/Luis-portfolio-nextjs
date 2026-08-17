import { NextRequest, NextResponse } from 'next/server';
import { contactRateLimit } from '@/lib/rate-limit';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN_LENGTH = 10;
const RECIPIENT_EMAIL = 'luiszrita@gmail.com';

interface ContactRequestBody {
  email?: unknown;
  message?: unknown;
  /** Honeypot: real visitors never fill this. Checked again here because a
   *  bot can POST straight to this route, skipping the client entirely. */
  company?: unknown;
}

/**
 * Reads the visitor's IP the way Vercel's edge network hands it to us.
 *
 * `NextRequest.ip`/`.geo` were removed in Next.js 15+, so this has to come
 * from headers. `x-forwarded-for` can carry a comma-separated chain
 * (client, proxy1, proxy2, …) — Vercel's proxy sets/appends this reliably,
 * so the first entry is the real client. Falls back to `x-real-ip`, then to
 * a fixed bucket for local dev (no proxy in front of `next dev`, so this
 * header is normally absent there).
 */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    if (firstIp?.trim()) return firstIp.trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp?.trim()) return realIp.trim();

  return '127.0.0.1';
}

function isValidBody(body: ContactRequestBody): body is { email: string; message: string; company?: string } {
  return (
    typeof body.email === 'string' &&
    EMAIL_PATTERN.test(body.email.trim()) &&
    typeof body.message === 'string' &&
    body.message.trim().length >= MESSAGE_MIN_LENGTH
  );
}

function isEmailJsConfigured(): boolean {
  return Boolean(
    process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY &&
      process.env.EMAILJS_PRIVATE_KEY
  );
}

/** Sends the message via EmailJS's REST API (server-side, using the Private
 *  Key) instead of the browser SDK — see .env.example for the dashboard
 *  setting this requires. */
async function sendViaEmailJs(email: string, message: string) {
  const serviceId = process.env.EMAILJS_SERVICE_ID!;
  const templateId = process.env.EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY!;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY!;

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      // Param names must match the placeholders configured in the EmailJS
      // template dashboard (Email Templates → this template → Content /
      // Settings) — see .env.example step 3 for what each one is for.
      template_params: {
        email,
        name: email,
        title: 'Nuevo mensaje desde el portafolio',
        time: new Date().toLocaleString('es-VE', { dateStyle: 'medium', timeStyle: 'short' }),
        to_email: RECIPIENT_EMAIL,
        message,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`EmailJS request failed (${response.status}): ${detail}`);
  }
}

export async function POST(request: NextRequest) {
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body', message: 'El cuerpo de la petición no es JSON válido.' }, { status: 400 });
  }

  // Honeypot tripped: silently "succeed" without sending or touching the
  // rate limit, so a bot gets no signal that anything was rejected.
  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      { error: 'invalid_body', message: 'Correo o mensaje inválidos.' },
      { status: 400 }
    );
  }

  if (!isEmailJsConfigured()) {
    return NextResponse.json(
      { error: 'not_configured', message: 'El formulario aún no está configurado.' },
      { status: 500 }
    );
  }

  const ip = getClientIp(request);
  // Fail OPEN: if Upstash is unreachable or misconfigured, this throws (a
  // fetch failure), not returns `{ success: false }`. For a low-stakes
  // contact form, losing a legitimate message to a rate-limiter outage is
  // worse than the small window of unlimited sends until it recovers —
  // EmailJS's own 200/month free-tier cap is the backstop for that window.
  let rateLimit: { success: boolean; reset: number } = { success: true, reset: 0 };
  try {
    rateLimit = await contactRateLimit.limit(ip);
  } catch (error) {
    console.error('Rate limit check failed, allowing request through:', error);
  }

  if (!rateLimit.success) {
    const retryAfterSeconds = Math.max(0, Math.ceil((rateLimit.reset - Date.now()) / 1000));
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: 'Alcanzaste el límite de 2 mensajes por día. Intenta de nuevo mañana.',
      },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  try {
    await sendViaEmailJs(body.email.trim(), body.message.trim());
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'send_failed', message: 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
