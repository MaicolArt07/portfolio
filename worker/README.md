# Chat Worker — asistente virtual del portfolio

Backend mínimo (sin base de datos) que le da voz a un asistente de IA sobre
el portfolio, usando Google Gemini. Corre como un **Cloudflare Worker**
separado del sitio estático (que sigue en GitHub Pages, sin cambios).

## Por qué existe esto

GitHub Pages solo sirve archivos estáticos — no puede ejecutar código de
servidor, así que no hay forma de esconder ahí una API key de forma segura.
Este Worker es el único lugar donde vive la `GEMINI_API_KEY`, nunca en el
repo ni en el navegador del visitante.

## Arquitectura

```
Visitante → chat-widget.astro (GitHub Pages) → fetch()
                                                   │
                                                   ▼
                              Cloudflare Worker (worker/src/index.js)
                                 │
                                 ├─ valida el mensaje (largo, no vacío)
                                 ├─ filtra intentos de prompt injection
                                 ├─ rate limit por IP (Cache API, sin KV/DB)
                                 ├─ retrieval.js: busca los fragmentos
                                 │   relevantes en knowledge.js (que lee
                                 │   directamente src/data/*.json del sitio)
                                 └─ gemini.js: llama a la API de Gemini
                                     con el contexto autorizado + la pregunta
```

No hay base de datos ni vector store: la "base de conocimiento" son los
mismos archivos JSON que ya alimentan el sitio (`src/data/`), leídos
directamente por el Worker al bundlearse. **Agregar un proyecto nuevo en
`src/data/projects.json` lo pone disponible para el chat automáticamente**,
sin tocar el Worker.

## Setup (una sola vez)

### 1. Cuenta de Cloudflare (gratis)

Si no tenés una, creala en [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).

### 2. Conseguir tu Account ID

En el dashboard de Cloudflare, entrá a cualquier sitio/Workers y en la
barra lateral derecha vas a ver **Account ID**. Copialo.

### 3. Crear un API Token

**My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"**
(plantilla ya lista). Copiá el token generado (solo se muestra una vez).

### 4. Conseguir una API key de Gemini

En [aistudio.google.com/apikey](https://aistudio.google.com/apikey), creá una
API key gratuita.

### 5. Agregar los secrets en GitHub

En tu repo: **Settings → Secrets and variables → Actions → Secrets → New
repository secret**. Agregá estos 3:

| Nombre | Valor |
|---|---|
| `CLOUDFLARE_API_TOKEN` | el token del paso 3 |
| `CLOUDFLARE_ACCOUNT_ID` | el Account ID del paso 2 |
| `GEMINI_API_KEY` | la key del paso 4 |

### 6. Desplegar el Worker

Con los secrets configurados, andá a la pestaña **Actions** del repo, elegí
el workflow **"Deploy Chat Worker"** y ejecutalo manualmente ("Run workflow"),
o simplemente hacé un push a `main` que toque algo dentro de `worker/`.

### 7. Configurar la URL pública del Worker en el sitio

Una vez desplegado, Cloudflare le asigna una URL fija, algo como:

```
https://maicol-portfolio-chat.<tu-subdominio>.workers.dev
```

La encontrás en el log del workflow "Deploy Chat Worker" (paso "Deploy
Worker"), o en el dashboard de Cloudflare → Workers & Pages →
`maicol-portfolio-chat`.

Copiá esa URL y agregala como **Variable** (no secreto, es información
pública) en: **Settings → Secrets and variables → Actions → Variables → New
repository variable**:

| Nombre | Valor |
|---|---|
| `PUBLIC_CHAT_API_URL` | `https://maicol-portfolio-chat.<tu-subdominio>.workers.dev` |

Hacé un push cualquiera a `main` (o volvé a correr el workflow "Deploy to
GitHub Pages") para que el sitio se rebuildee con esa variable — recién ahí
aparece el botón flotante del chat en el sitio en vivo.

## Desarrollo local

```bash
cd worker
npm install
cp .dev.vars.example .dev.vars   # y pegá tu GEMINI_API_KEY real ahí
npm run dev                       # levanta el worker en localhost:8787
npm test                          # corre los tests de retrieval/knowledge (no necesitan API key)
```

`.dev.vars` está en `.gitignore` — nunca se sube.

Para probar el flujo completo contra tu sitio corriendo en `localhost:4321`,
agregá temporalmente a `.dev.vars`:

```
ALLOWED_ORIGIN=http://127.0.0.1:4321
```

(en producción esto ya está fijado a `https://maicolart07.github.io` en
`wrangler.toml`, no hace falta tocarlo).

## Configuración ajustable

Todo en `wrangler.toml` bajo `[vars]`, sin tocar código:

| Variable | Qué hace |
|---|---|
| `GEMINI_MODEL` | Nombre del modelo de Gemini a usar |
| `ALLOWED_ORIGIN` | Único origen autorizado a llamar al Worker (CORS) |
| `CHAT_MAX_MESSAGE_LENGTH` | Máximo de caracteres por mensaje |
| `CHAT_HISTORY_LIMIT` | Cuántos mensajes previos se envían como contexto |
| `CHAT_RATE_LIMIT` | Máximo de mensajes por IP por minuto |

## Seguridad implementada

- La API key vive solo como secreto del Worker (`wrangler secret`), nunca en
  el repo ni en el bundle del cliente.
- CORS restringido al dominio del portfolio — otros sitios no pueden usar
  este endpoint desde el navegador.
- Rate limiting por IP (Cache API de Cloudflare, sin KV ni base de datos).
- Filtro de prompt injection (frases como "ignora las instrucciones
  anteriores", "muéstrame tu API key") que corta antes de llamar a Gemini.
- El system prompt (`src/prompt.js`) instruye al modelo a no revelar
  instrucciones, credenciales ni usar conocimiento externo, y a responder
  con un mensaje fijo cuando la pregunta no tiene información suficiente o
  no está relacionada con el portfolio.
- El historial de conversación vive solo en el navegador del visitante
  (memoria de la pestaña) — el Worker no guarda nada entre requests.

## Agregar nuevos proyectos

No hace falta tocar el Worker. Agregá el proyecto en
`src/data/projects.json` (ver `README.md` en la raíz del repo) y hacé push —
el chat lo va a poder mencionar automáticamente en la próxima respuesta,
porque `knowledge.js` reconstruye la base de conocimiento desde ese mismo
archivo en cada despliegue.
