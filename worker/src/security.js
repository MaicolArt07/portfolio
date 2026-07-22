// Defense-in-depth against prompt injection: the system prompt (see prompt.js,
// rule 8) is the primary defense — this is a cheap secondary filter that
// short-circuits the most blatant attempts without even calling Gemini.
const INJECTION_PATTERNS = [
  /ignor[a-z]*\s+(las\s+)?instruccion/i,
  /olvida[a-z]*\s+(las\s+)?instruccion/i,
  /system\s*prompt/i,
  /muestra[a-z]*\s+(tu|el|los)\s+(prompt|instruccion)/i,
  /revela[a-z]*\s+(tu|el|las|los)\s+(prompt|instruccion|credencial|api)/i,
  /api[\s_-]*key/i,
  /variable[s]?\s+de\s+entorno/i,
  /environment\s+variable/i,
  /credential/i,
  /act[uú]a\s+como\s+otro/i,
  /act\s+as\s+(a\s+)?different/i,
];

export function looksLikeInjection(message) {
  return INJECTION_PATTERNS.some((re) => re.test(message));
}

export function validateMessage(message, maxLength) {
  if (typeof message !== 'string') return 'El mensaje es inválido.';
  const trimmed = message.trim();
  if (!trimmed) return 'El mensaje no puede estar vacío.';
  if (trimmed.length > maxLength) {
    return `El mensaje supera el máximo de ${maxLength} caracteres.`;
  }
  return null;
}
