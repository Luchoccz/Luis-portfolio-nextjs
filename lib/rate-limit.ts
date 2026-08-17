import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Límite de envíos del formulario de contacto: 2 por IP cada 24h, en una
 * ventana fija (fixed window) — se resetea a medianoche UTC del día en que
 * empezó a contar, no "24h desde el primer envío". Es más simple de razonar
 * y de comunicar al usuario ("2 por día") que una ventana deslizante.
 *
 * Respaldado por Upstash Redis (API REST, sin conexiones persistentes) para
 * que el conteo sea correcto sin importar en qué instancia serverless de
 * Vercel caiga cada request — un `Map` en memoria no sirve aquí porque cada
 * invocación puede aterrizar en una instancia distinta.
 *
 * Requiere las variables de entorno UPSTASH_REDIS_REST_URL y
 * UPSTASH_REDIS_REST_TOKEN (ver .env.example). Si faltan, `Redis.fromEnv()`
 * no lanza al importar el módulo — solo emite un `console.warn` — y el
 * error real ocurre recién en la primera llamada a `.limit()`, como
 * cualquier otro fallo de red (ver el catch en app/api/contact/route.ts).
 */
export const contactRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(2, '1 d'),
  prefix: 'ratelimit:contact',
  analytics: true,
});
