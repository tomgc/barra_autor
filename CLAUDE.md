# barra de autor

Cocktail manager personal (PWA sin servidor): inventario de barra, recetas disponibles, ajustes de spec, Modo Barra, Laboratorio, historial y sugerencias. Publicada en https://tomgc.github.io/barra_autor/ (repo `tomgc/barra_autor`, rama `main`).

## Stack tecnológico

- HTML, CSS propio y JavaScript con módulos ES nativos; sin dependencias ni paso de compilación.
- Datos en `data/*.js`; catálogo de solo lectura, estado de usuario aparte (PLAN.md §2).
- PWA: `manifest.json` + `service-worker.js` (precache, stale-while-revalidate).
- Pruebas en el navegador: `tests.html` + `js/tests.js`.
- Scripts de mantenimiento en R (política del equipo: los entregables persistentes van en R), con `here::here()` y `|>`.
- Ilustraciones: SVG fuente escritos a mano → WebP generado con R.

## Estructura de archivos relevantes

- `index.html`, `app.js`, `styles.css`: interfaz y rutas.
- `data/recipes.js`: catálogo (36 recetas); `data/ingredients.js`, `data/collections.js`.
- `js/engine/`: motores puros (disponibilidad, escalado, ajuste, búsqueda, comparación, descubrimiento).
- `js/tests.js`: pruebas (se ven en `tests.html`).
- `assets/cocktails/src/`: SVG fuente de cada ilustración (plantillas aprobadas: `el-cardinale`, `pisco-sour`, `gin-tonic`).
- `assets/cocktails/`: WebP generados (`<id>.webp` 512 px, `<id>-256.webp`).
- `assets/glassware/`: cristalería vacía en SVG.
- `assets/reference/`: referencia de estilo (solo estilo, su contenido tiene errores).
- `R/10_ilustraciones_a_webp.R`: convierte los SVG a WebP, genera la hoja de contacto y falla si falta alguna receta (usa `rsvg`, `webp`, `magick`, `here`).
- `encargos/`: encargos redactados para Claude Code.
- `PLAN.md`: decisiones, fases, pendientes y registro de errores. `README.md`: guía de uso y mantenimiento.

## Convenciones del proyecto

- Español en mensajes de commit, comentarios y textos de la app.
- Autor de commits: `tomgc <10123542+tomgc@users.noreply.github.com>`. El push lo hace Tomás.
- No se corrigen specs, cantidades ni textos de recetas sin aprobación; si algo parece un error, se reporta.
- Ilustraciones: respetar las plantillas de `assets/cocktails/src/` (lienzo 512×512, mismos `<defs>`, contorno `#3B332C`, sin texto en la imagen, `aria-label` en español).
- Al cambiar archivos precacheados, subir `CACHE_VERSION` en `service-worker.js`.

## Últimos cambios

- 2026-10-07: iconografía integrada (campo `image` en las 36 recetas, miniaturas, ilustración en la ficha, genérica de respaldo, precache `mba-v2`, README §9).
- 2026-10-07: 36 SVG + genérica + 11 vasos de cristalería y script R que genera los WebP (512 y 256 px).
- 2026-10-07: plantillas de estilo aprobadas y encargo de iconografía redactado (PLAN v12).
- 2026-10-07: app publicada en GitHub Pages (PLAN v11).
- 2026-10-07: versión inicial (F1, F2 y F3).
