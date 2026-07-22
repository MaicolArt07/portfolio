const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export async function askGemini({ apiKey, model, systemPrompt, userContent }) {
  const url = `${API_BASE}/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ role: 'user', parts: [{ text: userContent }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 512,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // Gemini's own error text — never contains our key (the key is only in
    // the outbound request URL, never echoed back in error bodies).
    const errText = await response.text().catch(() => '');
    throw new Error(`Gemini API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini no devolvió una respuesta válida.');
  }

  return text.trim();
}
