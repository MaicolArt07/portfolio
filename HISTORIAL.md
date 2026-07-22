# Historial del proyecto

Registro narrativo de todo lo que se fue construyendo en este portfolio,
sesión por sesión. Pensado para que cualquiera (vos en el futuro, u otra
persona) pueda entender cómo llegó el proyecto a su estado actual sin tener
que adivinar por qué se tomó cada decisión.

> Para el estado técnico actual (qué archivo hace qué, qué falta, reglas de
> contenido) ver [`CLAUDE.md`](CLAUDE.md). Este documento es el "cómo llegamos
> hasta acá", no el "cómo está armado ahora".

---

## Sesión 1 — 2026-07-21

### 1. De plantilla genérica a portfolio real

Se partió de la plantilla Astro *Career Portfolio* con datos de ejemplo
("John Doe"). A partir del CV en PDF de Maicol Erick Arteaga Guzmán, se
extrajo toda su información real (experiencia, educación, tecnologías,
habilidades) y se reescribió el contenido del sitio de punta a punta, con una
regla estricta acordada desde el inicio: **no inventar ningún dato que no
apareciera en el CV**. Si algo no estaba documentado, se omitía en vez de
rellenarlo con contenido genérico.

Se agregaron 5 secciones que la plantilla original no tenía: **Sobre mí**,
**Estadísticas**, **Educación** (separada de la experiencia laboral, que en
la plantilla venía mezclada en una sola timeline), **Habilidades** (blandas,
en tarjetas con ícono) y **Certificaciones**. La sección de **Proyectos** se
dejó vacía a propósito — el CV no mencionaba proyectos concretos — pero con
el esquema de datos listo para que Maicol los agregue cuando los tenga.

Se tradujo todo el sitio al español y se amplió el stack de íconos
(`@iconify-json/simple-icons`) para poder representar tecnologías del CV que
no tenían ícono en los sets ya instalados (Livewire, Joomla, BigCommerce,
cPanel, Asana, CodeIgniter).

Todo se verificó con `npm run build` y con capturas de pantalla por sección
usando Playwright en un navegador headless real — no solo lectura de código.

### 2. Cambio de paleta de color

Maicol pidió algo "más moderno y distintivo" que el violeta original de la
plantilla. Se le ofrecieron las paletas ya incluidas (ámbar ejecutivo, verde
lima, azul estratégico) más la opción de crear una nueva. Eligió crear una
paleta nueva: **Cyan Tech** — acento cian sobre fondo azul-negro casi puro,
con su propio modo claro. Al verificar el nuevo tema en modo claro se detectó
(no reportado por Maicol, encontrado durante la prueba visual) que los
botones secundarios del hero y los campos del formulario de contacto usaban
un borde blanco fijo que se volvía invisible sobre fondo claro — se corrigió
usando colores que se adaptan al tema activo.

### 3. Publicación en GitHub + GitHub Pages

Maicol preguntó si el proyecto se podía subir a GitHub con una URL pública.
Se decidió junto con él: **GitHub Pages** como hosting (gratis, nativo,
sin necesitar otra cuenta) y que él crearía el repositorio manualmente
(`github.com/MaicolArt07/portfolio`) ya que no había GitHub CLI instalado en
la máquina.

Antes de subir el código, se detectó un problema que solo aparece al
desplegar bajo un subpath (`usuario.github.io/portfolio/` en vez de la raíz
de un dominio): varias rutas estaban hardcodeadas como absolutas
(`/favicon.ico`, `/placeholder.jpeg`, el link del CV), lo que las hubiera
roto en producción. Se corrigieron todas para que usen
`import.meta.env.BASE_URL`, y se configuró `astro.config.mjs` con el `site`
y `base` correctos.

Al hacer el primer `git push`, apareció un obstáculo: Windows tenía guardada
una credencial de git para **otra cuenta de GitHub** (`sistemaspbt`, la del
trabajo de Maicol en PBT SRL), y el push a su cuenta personal fue rechazado
con un 403. Se le explicó la situación antes de tocar nada — la credencial
guardada podía ser la que usa para repos del trabajo en esa misma máquina —
y él confirmó que se podía borrar. Tras eliminarla, el push funcionó.

El primer despliegue automático (GitHub Actions) falló en el paso de
`deploy`, aunque el `build` había salido bien: GitHub Pages no estaba
habilitado todavía en la configuración del repositorio. Maicol lo habilitó
manualmente (Settings → Pages → Source: "GitHub Actions") y, con un segundo
push, el despliegue terminó exitoso. Se verificó la URL pública en vivo
(https://maicolart07.github.io/portfolio/) con capturas de pantalla reales,
sin errores de consola ni recursos rotos.

### 4. Pulido del hero y el footer

Maicol pidió sacar el logo de cohete de Astro que quedaba como foto de
perfil por defecto (era la imagen placeholder genérica de la plantilla, sin
relación con él) y reemplazarlo por algo más apropiado para un placeholder de
foto de programador. Se reemplazó por un ícono de silueta genérico que se
adapta al color del tema activo, en vez de depender de una imagen estática.

También pidió simplificar el footer: quitar la línea de atribución "Built
using Career Portfolio Theme • Astro" y dejar únicamente su nombre
centrado, a modo de firma. Se implementó así y se subió el cambio.

### 5. Documentación del proyecto

Para que cualquier sesión futura (de Maicol o de Claude) pueda retomar el
proyecto sin perder contexto, se armaron tres documentos con roles distintos:

- **`README.md`** — descripción pública del proyecto, pensada para quien
  visite el repositorio en GitHub (qué es, stack, cómo correrlo, cómo
  agregar contenido).
- **`TEMPLATE-README.md`** — el README original de la plantilla Astro, que
  se conservó tal cual para no perder los créditos e instrucciones genéricas
  del autor original.
- **`CLAUDE.md`** — notas técnicas de estado del proyecto (qué está hecho,
  qué falta, reglas de contenido acordadas). Se lee automáticamente al abrir
  el proyecto en una sesión nueva de Claude Code.
- **`HISTORIAL.md`** (este archivo) — el relato de cómo se llegó hasta acá,
  sesión por sesión.

---

## Sesión 2 — 2026-07-22

### 1. Proyectos reales

Maicol trajo la información de 8 proyectos profesionales reales (SIAC ERP,
SIAC Condominios, Sistema Portfolio, Sistema de Liquidación, MediaStock,
CapitalLingo, Flores y Detalles, PBT Feria) — con roles, tecnologías,
descripciones y, para dos de ellos, URLs en producción. Se cargaron en
`src/data/projects.json`, reemplazando por fin el estado vacío que había
quedado pendiente desde la Sesión 1.

### 2. El pedido: un chat con IA (Gemini) — y un conflicto de arquitectura real

Maicol pidió integrar un asistente de chat con Google Gemini que respondiera
únicamente sobre su experiencia profesional, con una especificación muy
detallada y técnicamente correcta en su parte de seguridad: la API key de
Gemini nunca debía ser accesible desde el navegador ni vivir en el frontend.

Antes de escribir una sola línea de código se detectó el problema: **GitHub
Pages solo sirve archivos estáticos, no puede ejecutar ningún backend**. No
hay forma de cumplir "nunca expongas la API key al navegador" y "mantené
todo en GitHub Pages" al mismo tiempo — son requisitos mutuamente
excluyentes, no algo que se resuelva escribiendo más código. Se le explicó
esto a Maicol antes de tocar nada, junto con las opciones reales: migrar
todo el hosting a una plataforma con soporte de backend (Cloudflare Pages o
Vercel), o mantener GitHub Pages intacto y agregar un backend mínimo aparte
solo para el chat. Maicol eligió la segunda opción, para no perder la URL
que ya tenía funcionando.

### 3. La solución: un Cloudflare Worker aparte, sin base de datos

Se construyó un backend mínimo como **Cloudflare Worker** (carpeta
`worker/`, proyecto independiente dentro del mismo repo), desplegado por su
propio GitHub Action (`deploy-worker.yml`) que solo se dispara cuando cambia
algo en `worker/` o en `src/data/`. El sitio estático en GitHub Pages no se
tocó.

Siguiendo el pedido explícito de "no usaremos base de datos", la base de
conocimiento del asistente no vive en ningún lado nuevo: el Worker importa
directamente los mismos archivos JSON que ya alimentan el sitio
(`career.json`, `projects.json`, `tech.json`, etc.) y arma fragmentos de
contexto a partir de ellos. Esto significa que agregar un proyecto nuevo en
el futuro lo pone disponible para el chat automáticamente, sin tocar el
backend — exactamente lo que Maicol había pedido.

Para no depender de una base de datos vectorial (embeddings), el retrieval
de contexto relevante se implementó con una búsqueda simple por coincidencia
de palabras clave, dejando la arquitectura lista para incorporar embeddings
más adelante si hiciera falta — tal como el propio Maicol había sugerido en
su especificación para una "primera versión".

Se implementaron también todas las capas de seguridad pedidas: CORS
restringido únicamente al dominio del portfolio, rate limiting por IP
(usando la Cache API de Cloudflare, sin necesitar KV ni base de datos), un
filtro que corta intentos de prompt injection antes de siquiera llamar a
Gemini, y un system prompt estricto que instruye al modelo a no usar
conocimiento externo, no inventar información, y no revelar credenciales ni
sus propias instrucciones bajo ningún pedido.

### 4. Cómo se probó todo sin tener (ni pedir) una API key real

Una regla que se respetó en todo momento: nunca pedirle a Maicol que pegue
su API key de Gemini en la conversación. Eso significó verificar todo lo
que se pudiera sin necesitar una key real:

- 8 tests unitarios (`worker/test/retrieval.test.mjs`) que prueban que la
  base de conocimiento se arma bien, que el retrieval encuentra los
  fragmentos correctos para preguntas sobre Laravel, contacto o educación,
  que el filtro de prompt injection detecta los intentos comunes, y que la
  validación de mensajes funciona.
- Pruebas manuales end-to-end levantando el Worker localmente con
  `wrangler dev` y una key falsa: se verificó que el CORS solo deja pasar
  el origen correcto, que el rate limiting corta exactamente en el límite
  configurado (se probó mandando 12 requests seguidas y contando en qué
  request exacta empezaba a bloquear), que un mensaje vacío se rechaza, y
  que un intento de inyección ("ignora las instrucciones anteriores...")
  devuelve la respuesta genérica sin siquiera llamar a Gemini.
- El widget de chat se probó visualmente con capturas de pantalla reales
  (Playwright), incluyendo el flujo completo botón → panel → pregunta
  sugerida → respuesta (o error, dado que la key de prueba era falsa).

En el camino se encontraron y corrigieron dos cosas:

1. Un falso positivo al principio: las respuestas del chat no llegaban en
   una prueba local, y parecía un bug — resultó ser el CORS bloqueando
   correctamente un origen (`localhost`) que no era el configurado para
   producción. Comportamiento correcto, no un bug; se ajustó solo la
   configuración local de prueba.
2. Un bug real: los mensajes que aparecían en el chat no tenían ningún
   estilo (sin color, sin alineación), porque Astro aísla el CSS de cada
   componente agregándole un atributo automático a los elementos — pero
   los mensajes del chat se crean dinámicamente con JavaScript en el
   navegador, así que nunca reciben ese atributo. Se resolvió marcando el
   bloque de estilos del widget como `is:global`.

### 5. Lo que queda en manos de Maicol

El código está completo y probado, pero no va a funcionar hasta que Maicol
haga un setup de una sola vez: crear una cuenta gratuita de Cloudflare,
generar un API token y conseguir su Account ID, generar una API key de
Gemini, y cargar todo eso como secrets en GitHub. Cada paso, con capturas
de dónde hacer clic, quedó documentado en `worker/README.md`. Hasta que ese
setup esté hecho, el botón del chat simplemente no aparece en el sitio — es
el comportamiento esperado (el widget no se renderiza sin la URL del
backend configurada), no un error.
