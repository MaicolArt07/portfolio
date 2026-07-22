import { buildKnowledgeBase } from './knowledge.js';
import { retrieveRelevantChunks } from './retrieval.js';
import { SYSTEM_PROMPT, buildUserContent } from './prompt.js';
import { askGemini } from './gemini.js';
import { validateMessage, looksLikeInjection } from './security.js';

// Built once per Worker isolate (cold start) and reused across requests —
// cheap since it's plain JSON, no I/O.
const KNOWLEDGE_BASE = buildKnowledgeBase();

const OFF_TOPIC_REPLY =
  'Soy un asistente especializado exclusivamente en la experiencia, habilidades y proyectos profesionales presentados en este portfolio.';

function corsHeaders(origin, allowedOrigin) {
  return {
    'Access-Control-Allow-Origin': origin === allowedOrigin ? origin : allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function jsonResponse(body, headers, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

// Best-effort per-IP rate limit using the Cache API (no KV/database needed).
// Not perfectly consistent across edge locations, but enough to deter casual
// abuse of a low-traffic portfolio chat widget.
async function checkRateLimit(ip, limit) {
  const cache = caches.default;
  const cacheKey = new Request(`https://rate-limit.internal/${ip}`);

  const cached = await cache.match(cacheKey);
  const count = cached ? parseInt(await cached.text(), 10) || 0 : 0;

  if (count >= limit) return false;

  await cache.put(
    cacheKey,
    new Response(String(count + 1), { headers: { 'Cache-Control': 'max-age=60' } })
  );
  return true;
}

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || 'https://maicolart07.github.io';
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin, allowedOrigin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ success: false, message: 'Método no permitido.' }, headers, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ success: false, message: 'JSON inválido.' }, headers, 400);
    }

    const maxLength = parseInt(env.CHAT_MAX_MESSAGE_LENGTH || '1000', 10);
    const validationError = validateMessage(body.message, maxLength);
    if (validationError) {
      return jsonResponse({ success: false, message: validationError }, headers, 400);
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimit = parseInt(env.CHAT_RATE_LIMIT || '10', 10);
    const allowed = await checkRateLimit(ip, rateLimit);
    if (!allowed) {
      return jsonResponse(
        { success: false, message: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
        headers,
        429
      );
    }

    const message = body.message.trim();
    const historyLimit = parseInt(env.CHAT_HISTORY_LIMIT || '6', 10);
    const history = Array.isArray(body.history) ? body.history.slice(-historyLimit) : [];

    if (looksLikeInjection(message)) {
      return jsonResponse({ success: true, answer: OFF_TOPIC_REPLY, sources: [] }, headers);
    }

    const relevantChunks = retrieveRelevantChunks(KNOWLEDGE_BASE, message, history);
    const userContent = buildUserContent(relevantChunks, history, message);

    try {
      const answer = await askGemini({
        apiKey: env.GEMINI_API_KEY,
        model: env.GEMINI_MODEL || 'gemini-2.0-flash',
        systemPrompt: SYSTEM_PROMPT,
        userContent,
      });

      const sources = relevantChunks.map((c) => ({ type: c.category, name: c.title }));

      return jsonResponse({ success: true, answer, sources }, headers);
    } catch (err) {
      console.error('Gemini request failed:', err.message);
      return jsonResponse(
        { success: false, message: 'No fue posible procesar la consulta.' },
        headers,
        502
      );
    }
  },
};
