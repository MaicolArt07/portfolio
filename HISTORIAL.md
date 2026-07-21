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
