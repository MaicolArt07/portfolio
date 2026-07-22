// Runs entirely in the browser — no network calls, no AI generation. Matches
// the visitor's question against the pre-built knowledge base (see
// chatKnowledge.js) by keyword overlap, plus a small set of canned intents
// (greeting/thanks/who-are-you) so the chat doesn't feel broken on the most
// common non-informational messages.

// Common Spanish/English function words that would otherwise pollute
// scoring — without this, long prose chunks (bio, job achievements) win on
// sheer word count instead of the chunk actually being relevant.
const STOPWORDS = new Set([
  'que', 'los', 'las', 'por', 'para', 'con', 'una', 'uno', 'del', 'sus', 'como',
  'mas', 'este', 'esta', 'esto', 'sobre', 'entre', 'cual', 'cuales', 'donde',
  'cuando', 'quien', 'quienes', 'tengo', 'tiene', 'tienes', 'eres', 'soy', 'sos',
  'utilizas', 'utiliza', 'utilizo', 'hiciste', 'hizo', 'hago', 'puedo', 'puedes',
  'the', 'and', 'for', 'you', 'your', 'are', 'have', 'has', 'with', 'about',
  'what', 'which', 'when', 'where', 'who', 'how', 'can', 'did', 'does',
]);

function normalize(text) {
  return text
    // Split compound/CamelCase names ("CapitalLingo" -> "Capital Lingo",
    // "MediaStock" -> "Media Stock") so their component words are
    // individually searchable instead of glued into one long token.
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .normalize('NFD')
    .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

// Crude prefix-based stemming: groups conjugations/declensions of the same
// word (contacto/contactar/contactarte, estudios/estudié/estudiaste) without
// needing a real Spanish stemmer for this small a corpus.
function stem(word) {
  return word.length > 6 ? word.slice(0, 6) : word;
}

function stemsOf(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    .map(stem);
}

const GREETINGS = ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hi', 'hello', 'hey', 'que tal'];
const THANKS = ['gracias', 'muchas gracias', 'thank you', 'thanks'];
const WHO_ARE_YOU = [
  'quien sos', 'quien eres', 'que eres', 'como te llamas',
  'eres un bot', 'sos un bot', 'eres una ia', 'sos una ia', 'eres ia',
];

const NO_INFO_REPLY =
  'No tengo información suficiente sobre ese tema dentro de este portfolio. Puedo contarte sobre experiencia profesional, tecnologías, proyectos, educación, certificaciones o cómo contactarme.';

// Word-boundary matching — a naive `.includes('hi')` would false-positive
// inside unrelated words like "hiciste".
function includesPhrase(normalizedText, phrases) {
  return phrases.some((phrase) => {
    const pattern = new RegExp(`\\b${phrase.replace(/\s+/g, '\\s+')}\\b`);
    return pattern.test(normalizedText);
  });
}

function scoreChunks(chunks, query, history) {
  const historyText = history.map((h) => h.content).join(' ');
  const queryStems = new Set(stemsOf(`${query} ${historyText}`));

  const scored = chunks
    .map((chunk) => {
      let score = 0;
      for (const kw of chunk.keywords) {
        if (queryStems.has(kw)) score += 1;
      }
      return { chunk, score };
    })
    .filter((s) => s.score > 0);

  if (!scored.length) return [];

  scored.sort((a, b) => b.score - a.score);
  const topScore = scored[0].score;

  // Only widen to "topScore - 1" when the top match itself is strong
  // (>= 2 keyword hits) — otherwise, with topScore == 1, that threshold
  // would collapse to "any single keyword overlap", pulling in unrelated
  // chunks that just happen to share one word with the query.
  const threshold = topScore >= 2 ? topScore - 1 : topScore;

  return scored
    .filter((s) => s.score >= threshold)
    .slice(0, 3)
    .map((s) => s.chunk);
}

/**
 * @returns {{ text: string, sources: {type: string, name: string}[] }}
 */
export function answerQuestion(chunks, query, history = []) {
  const normalizedQuery = normalize(query).trim();
  const wordCount = stemsOf(query).length;

  if (includesPhrase(normalizedQuery, WHO_ARE_YOU)) {
    return {
      text: 'Soy un asistente que responde preguntas sobre la experiencia, habilidades y proyectos de Maicol Arteaga, usando únicamente la información publicada en este portfolio.',
      sources: [],
    };
  }

  if (includesPhrase(normalizedQuery, THANKS)) {
    return {
      text: '¡De nada! Si tenés otra pregunta sobre mi experiencia, tecnologías o proyectos, con gusto te respondo.',
      sources: [],
    };
  }

  if (includesPhrase(normalizedQuery, GREETINGS) && wordCount <= 5) {
    return {
      text: 'Hola. Puedo contarte sobre mi experiencia profesional, tecnologías, proyectos, educación o cómo contactarme. ¿Qué te gustaría saber?',
      sources: [],
    };
  }

  const relevant = scoreChunks(chunks, query, history);

  if (!relevant.length) {
    return { text: NO_INFO_REPLY, sources: [] };
  }

  return {
    text: relevant.map((c) => c.text).join('\n\n'),
    sources: relevant.map((c) => ({ type: c.category, name: c.title })),
  };
}

// Exported so chatKnowledge.js can build keywords as stems (must use the
// exact same stemming logic on both sides for matching to work).
export { stemsOf };
