# Portfolio de Maicol Arteaga — Notas del proyecto

> Este archivo se llama `CLAUDE.md` a propósito: Claude Code lo lee automáticamente
> al abrir este proyecto en **cualquier sesión nueva**, así que no hace falta que
> repitas el contexto — simplemente abre el proyecto y pide continuar. También es
> un markdown normal, ábrelo cuando quieras para ver en qué quedamos.

## Documentación del proyecto

Hay 5 documentos, cada uno con un rol distinto — no son redundantes:

- **`README.md`** — descripción pública del proyecto para quien visite el repo en GitHub.
- **`TEMPLATE-README.md`** — README original de la plantilla Astro, conservado tal cual (créditos e instrucciones genéricas del autor original).
- **`CLAUDE.md`** (este archivo) — estado técnico actual: qué está hecho, qué falta, reglas acordadas. Se lee automáticamente al abrir el proyecto en una sesión nueva.
- **`HISTORIAL.md`** — relato narrativo de cómo se construyó todo, sesión por sesión (el "por qué", no el "qué hay ahora").
- **`worker/README.md`** — guía de setup del backend del chat (cuenta Cloudflare, secrets, despliegue).

## Qué es este proyecto

Portfolio personal de **Maicol Erick Arteaga Guzmán** (Ingeniero de Sistemas /
Desarrollador Fullstack), basado en la plantilla Astro **"Career Portfolio"**
(100% data-driven: el contenido vive en JSON, los componentes solo renderizan).

- Stack: Astro 6 + Tailwind CSS 4 + astro-icon (Iconify)
- Todo el contenido sale del CV real del usuario — **regla acordada: no inventar
  nada que no esté en el CV**. Si un dato no existe, se omite.
- Idioma del sitio: español.

## Estado actual — última sesión: 2026-07-21

Se transformó el template genérico (datos de ejemplo "John Doe") en el portfolio
real de Maicol. Todo lo siguiente ya está hecho y verificado (build limpio +
capturas de pantalla con Playwright, sin errores de consola):

- ✅ `package.json` — se agregó `@iconify-json/simple-icons` (para logos que no
  estaban en los sets ya instalados: Livewire, Joomla, BigCommerce, cPanel,
  Asana, CodeIgniter).
- ✅ `src/data/home.json` — perfil, rol, especialidades, redes reales (LinkedIn,
  Email, WhatsApp).
- ✅ `src/data/career.json` — 5 experiencias laborales reales (SIAC Condominios,
  PBT SRL, Instituto Técnico Cumbre, Universidad Privada Cumbre, Biopetrol) con
  logros en bullets + stack tecnológico por trabajo.
- ✅ `src/data/education.json` (nuevo) — Ingeniero de Sistemas + Bachiller.
- ✅ `src/data/certifications.json` (nuevo) — taller de facturación (único dato
  de este tipo en el CV).
- ✅ `src/data/skills.json` (nuevo) — 10 habilidades blandas (liderazgo, ágil,
  arquitectura, optimización SQL, etc.), todas trazables a una línea del CV.
- ✅ `src/data/tech.json` — 26 tecnologías reales del CV, categorizadas (Backend,
  Frontend, CMS & E-commerce, Base de Datos, Herramientas, IA & Automatización).
- ✅ `src/data/projects.json` — 8 proyectos reales (SIAC ERP, SIAC Condominios,
  Sistema Portfolio, Sistema de Liquidación, MediaStock, CapitalLingo, Flores
  y Detalles, PBT Feria).
- ✅ `src/data/about.json` (nuevo) — bio de "Sobre mí" extraída a datos (antes
  hardcodeada en el componente), para que el chat de IA la pueda leer también.
- ✅ Componentes nuevos: `about.astro`, `stats.astro`, `education.astro`,
  `skills.astro`, `certifications.astro`, `chat-widget.astro`.
- ✅ Componentes actualizados: `home.astro` (especialidades + botones
  Contactarme/Ver Proyectos), `career.astro` / `career-card.astro` (logros +
  iconos de tech), `projects.astro` / `project-card.astro` (estado vacío
  elegante + campos repo/demo/status), `tech.astro` (textos en español),
  `contact.astro` (formulario funcional vía mailto + textos en español),
  `nav.astro` (español + link a "Sobre mí"), `index.astro` (ensambla todo).

### Orden final de las secciones
Inicio → Sobre mí → Experiencia → Proyectos → Tecnologías → Habilidades →
Estadísticas → Educación → Certificaciones → Contacto.

## Pendiente — decisiones que el usuario debe confirmar o completar

1. **WhatsApp**: se armó el link `wa.me/591...` asumiendo código de país de
   Bolivia (por la dirección del CV). Confirmar o corregir en `home.json` →
   `socials`.
2. **CV en PDF**: el botón "Descargar CV" apunta a `/cv-maicol-arteaga.pdf`.
   Falta subir el archivo real a la carpeta `public/` con ese nombre exacto.
3. **Foto de perfil**: queda con el placeholder por defecto. Cuando haya una
   foto real, ponerla en `src/assets/` y actualizar `photoUrl` en `home.json`.
4. **GitHub**: no aparece en el CV, así que el ícono queda oculto. Si el
   usuario tiene uno, agregar la URL en `home.json` → `socials`.
5. **Tecnologías no incluidas**: el prompt original mencionaba Node, Docker,
   TypeScript, Next.js, OpenAI, Claude, ChatGPT, etc. — no se incluyeron
   porque no aparecen en el CV (regla de "no inventar"). Si el usuario las
   maneja realmente, decírselo a Claude para agregarlas a `tech.json`.
6. **Imágenes de proyectos**: los 8 proyectos reales no tienen screenshots
   todavía (`images: []` en cada uno), así que muestran el placeholder por
   defecto. Agregar capturas a `src/assets/` y referenciarlas cuando estén
   disponibles.
7. **Asistente virtual con IA — setup pendiente del usuario**: el código está
   completo y probado, pero no funciona hasta que el usuario complete el
   setup de Cloudflare (cuenta gratuita, API token, Account ID, API key de
   Gemini) y agregue los secrets en GitHub. Guía paso a paso completa en
   [`worker/README.md`](worker/README.md). Sin este setup, el botón del chat
   simplemente no aparece en el sitio (comportamiento esperado, no es un bug).

## Cómo agregar un proyecto nuevo

Editar `src/data/projects.json` (ya tiene 8 proyectos reales). Cada proyecto:

```json
{
  "title": "Nombre del proyecto",
  "description": "Descripción corta.",
  "images": ["nombre-archivo.webp"],
  "tech": ["Laravel", "MySQL"],
  "platforms": ["web"],
  "category": "Proyecto Profesional",
  "status": "En producción",
  "repoUrl": "https://github.com/usuario/repo",
  "demoUrl": "https://demo-en-vivo.com"
}
```

- Las imágenes van en `src/assets/` (Astro las optimiza automáticamente).
- `repoUrl`/`demoUrl` son opcionales; si solo hay uno, se muestra solo ese ícono.
- `status` es opcional (badge tipo "En producción" / "En desarrollo").
- En cuanto el array tenga al menos un elemento, desaparece el estado vacío
  ("Próximamente") y se muestran las tarjetas normales.

## Mapa de dónde vive cada cosa

| Sección          | Datos                              | Componente(s)                          |
|------------------|-------------------------------------|-----------------------------------------|
| Hero             | `home.json`                         | `home.astro`                            |
| Sobre mí         | `about.json`                        | `about.astro`                           |
| Experiencia      | `career.json`                       | `career.astro`, `career-card.astro`     |
| Proyectos        | `projects.json`                     | `projects.astro`, `project-card.astro`  |
| Tecnologías      | `tech.json`                         | `tech.astro`                            |
| Habilidades      | `skills.json`                       | `skills.astro`                          |
| Estadísticas     | calculado desde career/tech/projects/certifications | `stats.astro`      |
| Educación        | `education.json`                    | `education.astro`                       |
| Certificaciones  | `certifications.json`               | `certifications.astro`                  |
| Contacto         | `home.json` (socials)               | `contact.astro`                         |
| Navegación       | fijo en el componente               | `nav.astro`                             |
| Tema/colores     | `config.ts` + `styles/global.css`   | —                                        |
| Asistente IA     | `src/data/*.json` (vía el Worker)   | `chat-widget.astro` + `worker/`         |

### Tema de color actual: **Cyan Tech**

`config.ts` → `baseTheme: 'cyan'`. Paleta nueva (no venía en la plantilla),
definida en `global.css` como `[data-theme="cyan-dark"]` / `[data-theme="cyan-light"]`:
acento cian (`#22D3EE` oscuro / `#0E7490` claro) sobre fondo azul-negro casi
puro. Opciones disponibles en `baseTheme`: `default`, `strategic`, `innovator`,
`executive`, `cyan`. Para probar otra, solo cambiar ese valor en `config.ts`.

Los íconos se usan vía `astro-icon` (Iconify). Sets instalados: `mdi`,
`devicon-plain`, `skill-icons`, `vscode-icons`, `simple-icons`. Antes de usar
un ícono nuevo, conviene verificar que el slug existe en
`node_modules/@iconify-json/<set>/icons.json` para no romper el build.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (localhost:4321)
npm run build     # build de producción → dist/
npm run preview   # previsualizar el build
```

## Reglas de contenido acordadas con el usuario

- **No inventar nada** que no esté en el CV. Si falta un dato, se omite (no se
  rellena con algo genérico).
- Preferir **iconos** sobre texto plano cuando exista un ícono representativo.
- **No romper** la estructura visual, animaciones ni calidad gráfica del
  template existente — solo reemplazar/ampliar contenido.
- Sitio en **español**.

## Repositorio y despliegue

- **Repo**: https://github.com/MaicolArt07/portfolio (rama `main`)
- **Hosting**: GitHub Pages, vía GitHub Actions (`.github/workflows/deploy.yml`,
  ya incluido en la plantilla original — usa `withastro/action` + `actions/deploy-pages`).
  Se dispara automáticamente en cada push a `main`.
- **URL pública**: https://MaicolArt07.github.io/portfolio/
- **`astro.config.mjs`**: `site` y `base` configurados para este repo
  (`base: '/portfolio/'`). Si el repo cambia de nombre, hay que actualizar
  `base` acá.
- **Assets con ruta absoluta**: como el sitio vive bajo `/portfolio/` y no en
  la raíz del dominio, cualquier ruta hardcodeada tipo `/favicon.ico` se rompe.
  Ya se corrigió esto usando `import.meta.env.BASE_URL` en: `Layout.astro`
  (favicon), `home.astro` (foto de perfil placeholder + link de CV) y
  `project-card.astro` (imagen placeholder). Si se agrega alguna ruta nueva
  a un archivo de `public/`, hay que prefijarla igual con `BASE_URL`.
- **Pendiente (acción manual única del usuario)**: la primera vez, GitHub
  Pages necesita habilitarse a mano en el repo: **Settings → Pages → Build
  and deployment → Source: "GitHub Actions"**. Sin este paso el job `deploy`
  del workflow falla aunque el build esté bien. Después de habilitarlo, hay
  que volver a correr el workflow (Actions → el run fallido → "Re-run all
  jobs") o hacer un push nuevo.

## Asistente virtual con IA (Cloudflare Worker + Gemini)

Arquitectura completa en [`worker/README.md`](worker/README.md). Resumen:

- **Por qué un Worker separado**: GitHub Pages no ejecuta backend, y la API
  key de Gemini nunca puede vivir en el frontend. El sitio estático sigue
  igual en GitHub Pages; el Worker es 100% independiente (repo `worker/`,
  despliegue propio vía `.github/workflows/deploy-worker.yml`).
- **Sin base de datos**: la base de conocimiento (`worker/src/knowledge.js`)
  se construye en cada build importando directamente los JSON de
  `src/data/` — agregar un proyecto nuevo lo hace disponible para el chat
  automáticamente, sin tocar el Worker.
- **Retrieval**: búsqueda simple por coincidencia de palabras clave
  (`worker/src/retrieval.js`), sin vector DB ni embeddings — dejado así
  a propósito para v1, con la arquitectura lista para agregar embeddings
  después si hace falta.
- **Seguridad**: CORS restringido al dominio del portfolio, rate limiting
  por IP vía Cache API (sin KV), filtro anti prompt-injection antes de
  llamar a Gemini, y un system prompt (`worker/src/prompt.js`) que instruye
  al modelo a no inventar información y a no revelar credenciales/instrucciones.
- **Probado sin necesitar una API key real**: 8 tests unitarios
  (`worker/test/retrieval.test.mjs`, corren con `npm test` dentro de
  `worker/`) más pruebas manuales end-to-end con `wrangler dev` (CORS,
  rate limit, validación, filtro de inyección, manejo de errores de Gemini)
  — todo verificado. Lo único que no se probó es una respuesta real de
  Gemini, porque eso requiere la API key real del usuario, que nunca debe
  pasarse en la conversación con Claude.
- **Setup pendiente del usuario**: cuenta de Cloudflare, API token, Account
  ID, API key de Gemini, y 3 secrets + 1 variable en GitHub. Paso a paso en
  `worker/README.md`. Sin esto, el botón del chat no aparece (comportamiento
  esperado — `chat-widget.astro` no renderiza nada si `PUBLIC_CHAT_API_URL`
  no está configurada).

## Historial de sesiones

### Sesión 1 — 2026-07-21
Transformación completa del template genérico al portfolio real de Maicol
Arteaga a partir de su CV en PDF. Se crearon 5 secciones nuevas (Sobre mí,
Estadísticas, Educación, Habilidades, Certificaciones), se reescribieron todos
los datos existentes con información real, y se dejó la sección de Proyectos
lista (pero vacía) para que el usuario agregue sus proyectos reales más
adelante. Verificado con `npm run build` y capturas de pantalla por sección
vía Playwright — sin errores.

Más tarde en la misma sesión: se cambió la paleta de color. El usuario pidió
"algo más moderno y distintivo" que el violeta original; eligió la opción
**Cyan Tech** (nueva, no venía en la plantilla) sobre las alternativas ya
incluidas (ámbar ejecutivo, verde lima). Se agregó el tema en `global.css`
(`cyan-dark` / `cyan-light`) y se activó en `config.ts`. De paso se corrigió
un problema de contraste en modo claro que quedó expuesto al probar el tema
nuevo: los botones secundarios del hero y los campos del formulario de
contacto usaban `border-white/10` fijo (invisible sobre fondo claro) — se
cambiaron a `border-maintext/15` / `bg-maintext/5`, que se adaptan
correctamente a cualquier tema y modo. Verificado visualmente en dark y light
con Playwright.

Al final de la sesión: se subió el proyecto a GitHub
(`github.com/MaicolArt07/portfolio`) y se configuró para desplegarse solo en
GitHub Pages. Se detectó y corrigió el problema de rutas absolutas que se
rompen bajo un subpath (`/portfolio/`) — ver sección "Repositorio y
despliegue" arriba. Hubo un obstáculo de autenticación: Windows tenía
guardada una credencial de git para otra cuenta (`sistemaspbt`, del trabajo)
que bloqueaba el push a la cuenta personal; se eliminó esa credencial
cacheada (con confirmación del usuario) y el push funcionó. El primer run del
workflow de despliegue falló en el paso `deploy` porque GitHub Pages no
estaba habilitado todavía en el repo — es la única acción manual pendiente
(ver arriba).

Después: se reemplazó el logo de cohete de Astro (placeholder de foto de
perfil) por un ícono de silueta genérico que se adapta al tema, y se
simplificó el footer a solo el nombre centrado (sin atribución a la
plantilla). Por último, se reorganizó la documentación del proyecto en 4
archivos con roles distintos — ver "Documentación del proyecto" arriba y el
relato completo en [`HISTORIAL.md`](HISTORIAL.md).

### Sesión 2 — 2026-07-22
Se cargaron 8 proyectos reales en `projects.json` (SIAC ERP, SIAC
Condominios, Sistema Portfolio, Sistema de Liquidación, MediaStock,
CapitalLingo, Flores y Detalles, PBT Feria), reemplazando el estado vacío.

Se implementó el asistente virtual con IA que el usuario pidió (chat con
Google Gemini). Antes de escribir código se detectó un conflicto real: la
especificación exigía que la API key nunca sea accesible desde el
navegador, pero GitHub Pages no puede ejecutar backend — son requisitos
mutuamente excluyentes. Se le presentó al usuario el trade-off y eligió
mantener GitHub Pages sin cambios y agregar un Cloudflare Worker aparte
(gratis) solo para el endpoint del chat, desplegado desde el mismo repo.

Se construyó: la base de conocimiento sin base de datos (lee los JSON de
`src/data/` directamente), retrieval por palabras clave, el system prompt
con las reglas de "no inventar" y anti prompt-injection, el cliente REST de
Gemini, y el widget de chat en el frontend. Todo se probó exhaustivamente
sin necesitar una API key real: 8 tests unitarios de la lógica de
retrieval/knowledge, y pruebas manuales end-to-end con `wrangler dev`
(CORS, rate limiting, validación de mensajes, filtro de inyección, manejo
de errores de Gemini). Se encontraron y corrigieron dos problemas reales en
el proceso: el CORS bloqueando el origen local de pruebas (comportamiento
correcto de seguridad, no un bug) y un bug real — los mensajes del chat no
tenían estilo porque Astro no aplica el scope de CSS a elementos creados
por JavaScript del lado del cliente; se resolvió con `is:global`.

El setup final (cuenta de Cloudflare, secrets, primer despliegue) quedó
documentado paso a paso en `worker/README.md`, ya que requiere credenciales
que el usuario debe cargar él mismo, nunca a través de la conversación.
