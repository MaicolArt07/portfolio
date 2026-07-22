// Simple keyword-overlap retrieval. No vector DB, no external database —
// deliberately kept simple for v1, with room to swap in embeddings later
// without touching the rest of the pipeline (same input/output shape).

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function tokensOf(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function retrieveRelevantChunks(chunks, query, history = [], topK = 6) {
  const historyText = history.map((h) => h.content).join(' ');
  const queryTokens = new Set(tokensOf(`${query} ${historyText}`));

  const scored = chunks.map((chunk) => {
    let score = 0;
    for (const kw of chunk.keywords) {
      if (queryTokens.has(kw)) score += 1;
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const relevant = scored
    .filter((s) => s.score > 0)
    .slice(0, topK)
    .map((s) => s.chunk);

  // Always ground the model with the profile chunk, even for generic
  // greetings ("hola", "¿quién sos?") that don't lexically match anything.
  const profileChunk = chunks.find((c) => c.category === 'Perfil');
  if (profileChunk && !relevant.includes(profileChunk)) {
    relevant.unshift(profileChunk);
  }

  return relevant.slice(0, topK);
}
