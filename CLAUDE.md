# Portfolio de Maicol Arteaga — Notas del proyecto

> Este archivo se llama `CLAUDE.md` a propósito: Claude Code lo lee automáticamente
> al abrir este proyecto en **cualquier sesión nueva**, así que no hace falta que
> repitas el contexto — simplemente abre el proyecto y pide continuar. También es
> un markdown normal, ábrelo cuando quieras para ver en qué quedamos.

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
- ✅ `src/data/projects.json` — vaciado a `[]` a propósito (ver sección de abajo).
- ✅ Componentes nuevos: `about.astro`, `stats.astro`, `education.astro`,
  `skills.astro`, `certifications.astro`.
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
6. **Proyectos**: `src/data/projects.json` está vacío a propósito — el CV no
   menciona proyectos concretos y no se debían inventar. Ver siguiente sección
   para el esquema a usar cuando el usuario los tenga listos.

## Cómo agregar un proyecto real (cuando el usuario los traiga)

Editar `src/data/projects.json` (array vacío `[]` actualmente). Cada proyecto:

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
| Sobre mí         | (texto fijo en el componente)       | `about.astro`                           |
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
