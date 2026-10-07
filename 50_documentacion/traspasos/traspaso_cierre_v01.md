# Traspaso de cierre v01: barra de autor

## 1. Identificación

| Campo | Valor |
|---|---|
| Proyecto | barra de autor (repo `tomgc/barra_autor`, carpeta local `~/Projects/barra_autor`) |
| Versión del traspaso | v01 |
| Fecha | 2026-10-07 |
| Sesión | 1 (NEW PROJECT) |
| Foco | Construir desde cero un cocktail manager personal sin backend (catálogo, inventario, motores, Modo Barra, Laboratorio, PWA), ilustrarlo y publicarlo en GitHub Pages |
| Entorno | Claude (Cowork) con acceso a la carpeta local y a la nube; Claude Code para el encargo de iconografía; Claude Design para el piloto de estilo |
| Normativos usados | `POLITICA_PROYECTO.md`: "Versión 5.9 — vigente." · `SETTINGS_Y_PROMPTS_OPERACIONALES.md`: "Versión 39." (ambos leídos al cierre desde la knowledge base; no estuvieron disponibles durante la sesión, ver §15) |
| Canal de cierre | Fallback manual (SETTINGS §2.1): repo fuera de la cartera (`hooks.cartera false`) y sin estructura canónica; no se usó paquete ni `/cierre` |
| `main` | `0a4958a` previo al commit de cierre (fuente: `git log` en esta sesión) |
| Publicación | https://tomgc.github.io/barra_autor/ (caché `mba-v4`, fuente: `curl` en esta sesión) |

Archivos principales: `index.html`, `app.js`, `styles.css`, `data/recipes.js`, `data/ingredients.js`, `data/collections.js`, `js/engine/*.js`, `js/storage.js`, `js/backup.js`, `js/lab.js`, `js/history.js`, `js/timer.js`, `js/tests.js`, `service-worker.js`, `manifest.json`, `R/10_ilustraciones_a_webp.R`, `assets/cocktails/`, `PLAN.md`, `README.md`, `CLAUDE.md`.

## 2. Resumen ejecutivo

La sesión partió de una especificación de 50 secciones y entregó una aplicación web estática completa, publicada en GitHub Pages. Se investigaron y normalizaron 36 recetas (18 obligatorias), con 10 specs de la casa propuestas por el asistente y aprobadas por Tomás. Se construyeron, en tres fases, los motores de disponibilidad y sustitución, búsqueda, escala con regla de juguera, ajustes de intensidad y dulce/seco con reglas aprobadas, Modo Barra con temporizador, historial, Laboratorio con variantes, comparador de specs, ABV, dilución y costo estimados, similitud, "¿Qué tomo hoy?", compras sugeridas, respaldo con migraciones y modo sin conexión. La iconografía se definió con un piloto en Claude Design y se produjo con un encargo a Claude Code (36 ilustraciones, genérica y 11 vasos, convertidas a WebP con un script de R). Después de publicar se corrigieron los márgenes seguros de iPhone y se aplicaron las reglas de texto de Tomás (marca en minúsculas, sin mayúsculas sostenidas, sin diminutivos, menos negritas). Quedan pendientes la sesión de búsqueda de recetas, las ilustraciones de esas recetas nuevas, la confirmación visual en el iPhone real y la adecuación del repo a la gobernanza. El estado general es funcional: 80 de 80 pruebas pasan (fuente: `runTests()` con node en la carpeta local, esta sesión).

## 3. Estado al cierre

**Funciona** (última ejecución exitosa: 2026-10-07, sitio publicado y carpeta local):

- App publicada, sin errores de consola en navegador automatizado, offline verificado con red cortada (fuente: Playwright sobre el sitio publicado, esta sesión).
- `tests.html`: 80 pruebas, 0 fallas (fuente: `runTests()` en la carpeta local, esta sesión).
- Catálogo: 36 recetas, 37 ingredientes, 36 recetas con ilustración (fuente: node sobre `data/*.js`, esta sesión).
- 74 WebP en `assets/cocktails/` y 11 vasos en `assets/glassware/` (fuente: `ls | wc -l`, esta sesión).

**No verificado o no funciona del todo:**

- Márgenes seguros en el iPhone real tras `mba-v4`: verificados solo con emulación de insets en Chromium (ver compuerta de dudas, §11).
- Nombre del ícono instalado en iOS: queda el antiguo hasta reinstalar la app (comportamiento de iOS).

**Delta respecto de v00:** no hay traspaso anterior (NEW PROJECT).

## 4. Registro detallado de cambios

Un bloque por cambio conceptual; la numeración coincide con el backlog (§5).

1. **Planificación inicial** · `PLAN.md` · Planificación y gobernanza. Lectura de la especificación; decisiones D1 a D7 (CSS propio en vez de Tailwind CDN, entrega por fases, specs de la casa propuestas y validadas, catálogo inmutable separado del estado de usuario, ES modules sin build, datos en `data/*.js`, pruebas en `tests.html`). Por qué: Tailwind CDN es de desarrollo y complica el offline; la spec mezclaba estado de usuario dentro de las recetas. Verificado: aprobación explícita de Tomás (AskUserQuestion).
2. **Catálogo inicial** · `data/recipes.js`, `data/ingredients.js`, `data/collections.js`, `data/demo-user-state.js` · Catálogo de recetas. Investigación en IBA, Difford's, Punch y Wikipedia; 36 recetas con `source`, `validation` (`owner`/`verified`/`approved`), `references` y roles. Verificado: validador programático (IDs, referencias, cantidades) y luego `tests.html`.
3. **Unidades explícitas en specs** · comunicación · Catálogo de recetas. A pedido de Tomás, toda cantidad se comunica con unidad (ml y oz). Ver §15.
4. **Motores F1** · `js/engine/matching.js`, `scaling.js`, `search.js`, `js/storage.js`, `js/backup.js`, `js/units.js`, `js/util.js` · Motores de cálculo. Disponibilidad (exacta, sustitución, faltante, "poco"), búsqueda sin tildes, escala 1 a 15 con redondeo práctico, regla de juguera para sours desde 5 porciones, persistencia con fallback en memoria, migraciones y respaldo con resumen previo. Verificado: 34 pruebas en esa etapa.
5. **Interfaz F1** · `index.html`, `app.js`, `styles.css` · Interfaz y experiencia. Inicio, Recetas, ficha, Mi barra, Respaldo. Verificado: Playwright móvil y escritorio, sin desborde a 390 px.
6. **Modo Barra, temporizador e historial** · `app.js`, `js/history.js`, `js/timer.js` · Interfaz y experiencia. Checklist táctil, temporizador manual sin tiempos asumidos, wake lock, registro de preparación con rating de sesión distinto del general. Verificado: pruebas unitarias y e2e.
7. **Ajustes de intensidad y dulce/seco** · `js/engine/adjust.js`, `data/ingredients.js` (`balanceClass`) · Ajustes de spec. Tabla de reglas v1 corregida por Tomás (solo el vermut rosso es dulce) y aprobada como v2; casos no previstos resueltos y declarados (Americano: intensidad sin efecto; terrones no se fraccionan). Verificado: 12 pruebas de ajustes en esa etapa.
8. **Alternativa en jarabe para el azúcar** · `data/recipes.js` (`alternatives`), `js/engine/matching.js` (`applyAlternatives`) · Catálogo de recetas. Old Fashioned y Alfonso 1 terrón → 10 ml de jarabe de goma; Daiquiri 2 cucharas de bar → 15 ml; equivalencias desde Difford's (jarabe 2:1) convertidas a 1:1. Verificado: 4 pruebas.
9. **Variantes y Laboratorio** · `js/lab.js`, `app.js` · Experimentación. Borradores editables, duplicar, eliminar con confirmación, convertir en receta personal; variante desde la ficha sin tocar el original. Verificado: 7 pruebas y e2e.
10. **Pendiente: búsqueda intensa de recetas** · `PLAN.md` §8 · Planificación y gobernanza.
11. **Pendiente: iconografía con referencia de estilo** · `PLAN.md` §8, `assets/reference/estilo-iconos-referencia.png` · Identidad visual e iconografía. Se anotó que la referencia tiene errores de contenido y que solo se toma el estilo.
12. **Comparador de specs** · `js/engine/compare.js`, `app.js` · Experimentación. Hasta 3 columnas, cantidades normalizadas a ml, sustitutos resumidos como cambio. Verificado: 5 pruebas y e2e.
13. **Correcciones de specs contra la IBA** · `data/recipes.js` · Catálogo de recetas. Negroni Pajarillo alineado con el Negroni IBA (build, cubos, media rodaja); Negroni y Old Fashioned corregidos de "cubo grande" a cubos tras revisar las 24 recetas verificadas. Ver §15.
14. **Motores F3 y PWA** · `js/engine/estimates.js`, `js/engine/discovery.js`, `service-worker.js`, `manifest.json`, `assets/icons/`, `README.md` · Motores de cálculo. ABV, dilución por método con fuente (Cocktails & Bars, 2018), costo opcional, similitud, "¿Qué tomo hoy?" con variedad, compras con desbloqueos y mejoras, dashboard, modo sin conexión, README con schema. Se eliminó el campo fijo `dilution` de las recetas porque contradecía la fuente.
15. **Repositorio y publicación** · `.gitignore`, `.nojekyll`, git · Publicación y repositorio. Repo creado, `hooks.cartera false` (repo fuera de la cartera), correo de autor cambiado a noreply tras el rechazo GH007 (ver §15), push por Tomás, Pages activado.
16. **Descripción para GitHub** · comunicación · Publicación y repositorio.
17. **Iconografía** · `assets/cocktails/src/`, `encargos/2026-10-07_iconografia_claude_code.md`, `R/10_ilustraciones_a_webp.R`, `assets/cocktails/*.webp`, `assets/glassware/` · Identidad visual e iconografía. Piloto de 3 ilustraciones en Claude Design aprobado; encargo redactado; ejecutado por Claude Code (4 commits); revisión de la hoja de contacto por el asistente.
18. **Márgenes seguros de iPhone** · `styles.css`, `service-worker.js` (`mba-v3`) · Interfaz y experiencia. El encabezado quedaba bajo la barra de estado translúcida.
19. **Marca y reglas de texto** · `index.html`, `manifest.json`, `app.js`, `styles.css`, `js/units.js`, `js/backup.js`, `README.md`, `CLAUDE.md`, `PLAN.md` (`mba-v4`) · Identidad visual e iconografía. "barra de autor" en minúsculas; sin mayúsculas sostenidas (salvo siglas); "cucharita" → "cuchara de bar"; menos negritas; encabezado sólido (el desenfoque se veía borroso en iOS); franja inferior de 34 a 20 px.
20. **Pendiente: ilustraciones para las recetas nuevas** · `PLAN.md` §8 · Planificación y gobernanza.

## 5. Backlog acumulativo (embebido; primer cierre)

### Objetivo del proyecto

barra de autor es una aplicación web personal de Tomás, sin backend y publicada en GitHub Pages, que funciona como sistema operativo de una barra doméstica: registra el inventario, calcula qué cócteles se pueden preparar hoy y cuáles están a uno o dos ingredientes, ajusta specs sin perder el original, registra preparaciones, permite experimentar con variantes y sugiere qué tomar y qué comprar. Está hecha en HTML, CSS y JavaScript sin dependencias, con datos en módulos JS, ilustraciones en lápiz de colores generadas como SVG y convertidas a WebP con R. Nace el 2026-10-07.

### Nota metodológica

Un cambio es una solicitud distinguible de Tomás (un pedido, una aprobación que abre trabajo, una corrección), no cada acción técnica que la implementa. No cuentan los errores del asistente corregidos de inmediato sin pedido; sí cuentan las correcciones que Tomás pidió. La clasificación es por intención primaria de la solicitud. Fuentes del conteo: la conversación de la sesión 1 y el historial de git.

### Clasificación temática

| Categoría | N° | % | Descripción |
|---|---|---|---|
| Planificación y gobernanza | 3 | 15 | Plan, fases, pendientes registrados (p. ej. sesión de búsqueda de recetas) |
| Catálogo de recetas | 4 | 20 | Specs, unidades, alternativas de ingredientes, correcciones contra referencia (p. ej. Negroni Pajarillo) |
| Motores de cálculo | 2 | 10 | Lógica pura de disponibilidad, escala, ABV, compras (p. ej. motor de matching) |
| Ajustes de spec | 1 | 5 | Reglas de intensidad y dulce/seco (p. ej. solo vermut rosso es dulce) |
| Interfaz y experiencia | 3 | 15 | Vistas, Modo Barra, márgenes de iPhone |
| Experimentación | 2 | 10 | Laboratorio, variantes, comparador |
| Identidad visual e iconografía | 3 | 15 | Ilustraciones, marca, reglas de texto (p. ej. "barra de autor" en minúsculas) |
| Publicación y repositorio | 2 | 10 | Git, GitHub Pages, descripción del repo |

Recuento: 20 cambios (fuente: recuento con python sobre el reparto de esta tabla, esta sesión).

### Resumen estadístico por sesión

| Sesión | Traspasos generados | N° de cambios | Modelo | Foco |
|---|---|---|---|---|
| 1 | v01 | 20 | claude-opus-5-5 | App completa, iconografía, publicación |
| Refinamientos menores no atribuibles | | 0 | | |
| **Total** | | **20** | | |

### Detalle cronológico

**Sesión 1 (2026-10-07)**

1. Planificación inicial del proyecto y decisiones D1 a D7 (`PLAN.md`).
2. Catálogo de 36 recetas y 37 ingredientes, investigado y normalizado.
3. Toda cantidad de spec se comunica con unidad (ml y oz).
4. Motores F1: disponibilidad, sustitución, búsqueda, escala, juguera, persistencia, respaldo.
5. Interfaz F1: Inicio, Recetas, ficha, Mi barra, Respaldo.
6. Modo Barra con temporizador manual e historial de preparaciones.
7. Ajustes de intensidad y dulce/seco con reglas v2 aprobadas.
8. Alternativa en jarabe para terrones y azúcar (Old Fashioned, Alfonso, Daiquiri).
9. Laboratorio y variantes versionadas.
10. Pendiente registrado: sesión dedicada a búsqueda intensa de recetas.
11. Pendiente registrado: iconografía con referencia de estilo.
12. Comparador de specs.
13. Negroni Pajarillo alineado con el IBA; hielo del Negroni y del Old Fashioned corregido.
14. Motores F3 (ABV, dilución, costo, similitud, ¿Qué tomo hoy?, compras), dashboard, PWA y README.
15. Repositorio git y publicación en GitHub Pages.
16. Descripción del repositorio para GitHub.
17. Iconografía: piloto aprobado, encargo a Claude Code y ejecución (36 + genérica + 11 vasos).
18. Corrección de márgenes seguros de iPhone (`mba-v3`).
19. Marca en minúsculas y reglas de texto (sin mayúsculas sostenidas, sin diminutivos, menos negritas) (`mba-v4`).
20. Pendiente registrado: ilustraciones para las recetas nuevas tras la búsqueda.

### Delta del backlog

20 entradas nuevas; taxonomía inicial de 8 categorías; sin reclasificaciones.

## 6. Bugs de la sesión

| Síntoma | Causa raíz | Solución | Verificación | Patrón aprendido | Estado |
|---|---|---|---|---|---|
| "Exacto: 12 ¼ oz" para 12,17 oz | `formatAmount` usaba fracciones también para el valor exacto | Opción `fractions: false` (`js/units.js`) | e2e | Un valor "exacto" nunca se formatea con redondeo | Resuelto |
| Badge "Sour" duplicado en la ficha | Familia y tag de perfil con el mismo nombre | Filtrar tags iguales a la familia (`app.js`) | Captura | Deduplicar etiquetas de fuentes distintas | Resuelto |
| Estado "No" del inventario parecía no seleccionado | Estilo del botón presionado igual al fondo | Fondo gris propio (`styles.css`) | Captura | Todo estado seleccionado debe verse distinto | Resuelto |
| Base en inglés ("vermouth", "whiskey") | `baseSpirit` mostrado crudo | `BASE_LABELS` (`app.js`) | Captura | Ningún id interno llega a la UI sin etiqueta | Resuelto |
| "Spec ajustado (0 cambios)" | Etiqueta según ajuste elegido, no según efecto | Usar `changes.length` (`app.js`) | e2e | Informar efecto, no intención | Resuelto |
| Historial guardaba ajustes sin efecto | Se registraba el ajuste elegido | Registrar solo los ajustes con efecto | e2e | Igual que el anterior | Resuelto |
| Selector de rol truncado en Laboratorio | Cuatro controles en una fila de 300 px | Rol y "top" en una segunda fila | Captura | Medir el ancho real antes de apilar controles | Resuelto |
| "Otra sugerencia" repetía los favoritos | El puntaje de favoritos dominaba el azar | Excluir lo ya mostrado (`discovery.js`) | Prueba unitaria | La variedad se garantiza por exclusión, no por azar | Resuelto |
| Lillet "no desbloqueaba" el Vesper | El Vesper ya salía con sustituto | Campo `upgrades` en compras | Prueba unitaria | Distinguir desbloquear de mejorar | Resuelto |
| Título bajo la barra de estado en iPhone | `black-translucent` + `viewport-fit=cover` sin `safe-area-inset-top` | Padding con `env(safe-area-inset-top)` | Emulación de insets | Toda app con barra translúcida reserva los insets | Resuelto en emulación, ver §11 |
| Título borroso en el encabezado (iOS) | `backdrop-filter` sobre la barra translúcida | Fondo sólido | Emulación | Evitar desenfoque bajo la barra de estado | Resuelto en emulación, ver §11 |

## 7. Aprendizajes y restricciones descubiertas

- **Specs con unidad siempre.** Toda cantidad comunicada lleva unidad (ml y oz). Contexto: una tabla sin unidades no es validable. Ejemplo: tabla de specs de la casa.
- **"Vermut" no es una clase dulce.** Solo el vermut rosso se ajusta en dulce/seco; el dry nunca. Principio C.10 (decisiones como constantes nombradas): vive en `balanceClass` y `RULES`.
- **Una nota de spec obliga a todo el spec.** Si la nota dice "Negroni IBA con gin botánico", método, hielo y garnish deben ser los del IBA. El comparador es la herramienta para detectarlo.
- **Repo fuera de la cartera.** Este repo declara `hooks.cartera false`; el hook global rechazaba `manifest.json` como dato.
- **Correo de autor.** Los commits usan `10123542+tomgc@users.noreply.github.com`; GitHub rechaza el correo privado (GH007).
- **Git en carpeta conectada.** Desde la VM de Cowork, git necesita permiso de borrado en la carpeta para sus archivos temporales; sin él deja `HEAD.lock` y un rebase a medias.
- **Reglas de texto de Tomás.** Marca "barra de autor" en minúsculas; sin mayúsculas sostenidas salvo siglas; sin diminutivos; negritas solo en nombre y cifras clave (D14, D15 de `PLAN.md`).

## 8. Decisiones de diseño

Las decisiones vigentes D1 a D15 viven en `PLAN.md` §1 (fuente: `PLAN.md` v14, leído en esta sesión). Las de mayor peso: catálogo inmutable separado del estado de usuario (D4); reglas de ajuste v2 aprobadas (D9); terrones con alternativa en jarabe (D10); dilución por método con fuente (D11); ilustraciones SVG servidas como WebP generado en R (D13); nombre en minúsculas (D14); reglas de texto (D15). No se replicaron como archivos en `50_documentacion/activa/decisiones/` porque el repo no tiene esa estructura (deuda, §11).

## 9. Constantes y parámetros

Primera sesión: todas nacen aquí. Fuentes canónicas: `js/engine/adjust.js` (`RULES`: suave 0,75, fuerte 1,25; seco jarabe/licor 0,75, rosso 0,67, cítricos 1,15; dulce jarabe/licor 1,25, rosso 1,33), `js/engine/estimates.js` (dilución stir 0,425, shake 0,3, con soda 0,2, build supuesto 0,2), `js/engine/scaling.js` (`SERVING_OPTIONS` 1, 2, 4, 6, 12, 15; `BATCH_THRESHOLD` 5), `js/units.js` (`ML_PER_OZ` 29,5735), `service-worker.js` (`CACHE_VERSION` `mba-v4`).

## 10. Arquitectura de archivos

Sin escáner: el proyecto no tiene `00_escanear_proyecto.R` (deuda, §11). Sustituto programático: 160 archivos versionados (fuente: `git ls-files | wc -l`, esta sesión), de los cuales 128 en `assets/` (fuente: mismo comando por carpeta). Árbol: `index.html`, `app.js`, `styles.css`, `manifest.json`, `service-worker.js`, `tests.html`, `data/` (4), `js/` (15), `R/` (1), `assets/` (íconos, cocktails, glassware, reference), `encargos/` (1), `50_documentacion/traspasos/` (este archivo), `PLAN.md`, `README.md`, `CLAUDE.md`. La estructura no sigue la canónica de POLITICA §1.1 (sitio estático en JavaScript, no pipeline R): declarado como deuda heredada, no se ajustó en silencio.

## 11. Pendientes y ruta sugerida

### Inventario

| # | Descripción | Tipo | Impacto | Dependencias | Complejidad | Precauciones | Enfoque | Criterio de éxito |
|---|---|---|---|---|---|---|---|---|
| P1 | Sesión de búsqueda intensa de recetas para ampliar la biblioteca | Funcionalidad | Alto | Ninguna | Alta | Verificar specs con fuentes reconocidas; distinguir clásico, riff, autor y personal; no copiar texto; unidad en cada cantidad | Lista priorizada por ingredientes del inventario, specs con referencia, validación de Tomás antes de cargar | Recetas nuevas en `data/recipes.js` con `references`, `tests.html` sin fallas |
| P2 | Ilustraciones de las recetas nuevas | Mejora visual | Medio | P1 | Media | Mismo estilo y flujo del encargo de iconografía; expediente según POLITICA §1.3.2 | Encargo a Claude Code con auditoría de redacción | Cada receta nueva con `image`; `R/10_ilustraciones_a_webp.R` sin faltantes |
| P3 | Confirmar en el iPhone real los márgenes de `mba-v4` | Bug activo (sin confirmar) | Medio | Reinstalar la app | Baja | iOS conserva nombre e ícono hasta reinstalar | Captura tras reinstalar | Título bajo la barra de estado y franja inferior ≤ 20 px en la app instalada |
| P4 | Decidir el encaje del repo en la gobernanza (estructura canónica, `50_documentacion/`, ESTADO.md, escáner, backlog en archivo propio, expediente del encargo de iconografía) | Deuda técnica | Medio | Decisión de Tomás | Media | Sitio estático en GitHub Pages: no romper rutas publicadas | Proponer adaptación mínima o excepción declarada | Decisión registrada y aplicada; cierre siguiente por el canal que corresponda |
| P5 | Confirmar proporción del jarabe de goma y graduaciones supuestas (Pajarillo, licor de calafate) | Documentación | Bajo | Etiquetas de las botellas | Baja | Son valores de cálculo, no de spec | Leer etiquetas y ajustar `data/` | `abvNote` y notas de jarabe reemplazadas por valores reales |
| P6 | Íconos de la PWA definitivos | Mejora visual | Bajo | Set de ilustraciones | Baja | Zona segura del ícono maskable | Derivar de una ilustración del set | Ícono nuevo en `assets/icons/` y `manifest.json` |

### Evaluación de deuda técnica

- `app.js` concentra toda la UI en un archivo largo (más de 1.200 líneas, hipótesis, verificar con: `wc -l app.js`); zona frágil para cambios futuros (C.5, responsabilidad única). Oportunidad: separar vistas en `js/views/`.
- Estructura no canónica y sin escáner (POLITICA §1.1 y §7).

### Auditoría de cierre (POLITICA 5.6, preguntas "Cierre")

| # | Pregunta | Respuesta |
|---|---|---|
| 2 | ¿El pipeline corre de cero sin intervención manual? | Sí para la app (estática); el script R de ilustraciones corre solo (`source(here::here("R", "10_ilustraciones_a_webp.R"))`) |
| 5 | ¿Cada transformación crítica tiene check de validación? | Sí: 80 pruebas y chequeo de faltantes en el script R |
| 6 | ¿Outputs reproducibles e idempotentes? | Sí para WebP (regenerables desde SVG); no aplica semilla |
| 7 | ¿Decisiones metodológicas como constantes nombradas? | Sí (`RULES`, dilución, umbrales) |
| 8 | ¿Nombres sin tildes, ñ ni espacios? | Sí, salvo el expediente del encargo con guiones (`2026-10-07_iconografia_claude_code.md`): no → incluido en P4 |
| 9 | ¿Guarda `asegurar_locale_utf8()` instalada? | No aplica estructura R canónica; el único script R no la tiene → incluido en P4 |

### Compuerta de dudas

4 dudas registradas.

| supuesto | predicado | medicion |
|---|---|---|
| Los márgenes de `mba-v4` se ven bien en el iPhone real | En la app reinstalada, el título queda bajo la barra de estado y la franja bajo los íconos mide ≤ 20 px | Captura de pantalla de la app instalada tras reinstalar |
| librsvg pinta igual que Chrome las 36 ilustraciones | Ninguna ilustración WebP difiere visiblemente de su SVG en Chrome | Hoja de comparación SVG (Chrome) vs WebP para las 36 recetas |
| El jarabe de goma de Tomás es 1:1 | La etiqueta o receta del jarabe indica 1:1 | Leer la etiqueta de la botella |
| Un respaldo exportado antes de `mba-v4` se importa sin advertencias nuevas | La importación de un `mi-barra-de-autor-backup-*.json` da el mismo resumen que antes | Importar un respaldo antiguo en la app publicada |

### Compuerta de repositorio (fallback manual)

`95_verificar_cierre.R` no se ejecutó: el kit no está accesible desde esta sesión y el repo no tiene la estructura que el verificador espera. Comprobaciones equivalentes a mano (fuente: comandos git en la carpeta local, esta sesión): I1 árbol limpio antes del commit de cierre; I2 sin stash; I3 `0 detrás, 1 adelante` antes de este cierre (falta el push de Tomás); I4 rama `main`; I5 un traspaso vigente (este); I6 `ESTADO.md` no adoptado; I7 sin escáner; I8 0 archivos de datos versionados; I9 no aplica (sin `ventana_insumos`).

`cierre_incompleto`: compuerta de repositorio no ejecutada (repo fuera de la cartera, sin estructura canónica ni kit accesible); push pendiente de Tomás.

### Ruta sugerida para la próxima sesión

1. **P1, búsqueda de recetas** (foco pedido por Tomás). Criterio: lista validada por Tomás y cargada con `tests.html` sin fallas.
2. **P3, confirmación en iPhone** al inicio, si Tomás trae la captura (baja complejidad, cierra un bug sin confirmar).
3. **P2, ilustraciones nuevas** al final o en sesión siguiente, ya con el expediente canónico.

Diferir: P4 (requiere decisión propia), P5 y P6 (bajo impacto).

## 12. Instrucciones específicas para la próxima sesión

- ⚠️ NO cargar recetas nuevas sin unidad en cada cantidad ni sin la validación de Tomás.
- ⚠️ NO comunicar una spec cuyo método, hielo o garnish contradigan su propia nota o referencia.
- ⚠️ NO usar mayúsculas sostenidas (salvo siglas), diminutivos ni negritas en exceso en textos de la app.
- ✅ ANTES de tocar el repo desde la VM de Cowork, pedir permiso de borrado en la carpeta (git deja `.lock` sin él).
- ✅ ANTES de un encargo a Claude Code, redactarlo en su expediente (POLITICA §1.3.2) y auditarlo (SETTINGS §1.2.6).
- 🔒 La marca es "barra de autor", en minúsculas, en todo texto visible.
- 🔒 El catálogo es inmutable: favoritos, ratings y notas viven en el estado de usuario.
- 🔒 Autor de commits: `tomgc <10123542+tomgc@users.noreply.github.com>`.
- 🔒 Al publicar cambios de la app, subir `CACHE_VERSION` en `service-worker.js`.

## 13. Fragmentos de código de referencia

Sin fragmentos nuevos fuera del código: los patrones estables viven en `README.md` (estructura de datos, schema de importación, flujo de ilustraciones) y `CLAUDE.md`.

## 14. Reapertura

**Mensaje de apertura pre-armado:**

> Sesión CONTINUATION de barra de autor. El protocolo (`POLITICA_PROYECTO.md`, `SETTINGS_Y_PROMPTS_OPERACIONALES.md`) vive en la knowledge base del Project y se lee desde ahí. Adjunto `traspaso_cierre_v01.md`. Estado: app publicada en https://tomgc.github.io/barra_autor/ con 36 recetas ilustradas y 80 pruebas en verde; cierre v01 hecho por fallback manual. Foco propuesto: P1, sesión dedicada a búsqueda intensa de recetas para ampliar la biblioteca (luego P2, sus ilustraciones).

**Documentos para la próxima sesión:**

1. *Protocolo en knowledge base (no se adjuntan):* `POLITICA_PROYECTO.md`, `SETTINGS_Y_PROMPTS_OPERACIONALES.md`.
2. *Opcionales:* `CLAUDE.md` si la sesión corre en Claude Code; `encargo_autonomo_claude_code_v1.md` (knowledge base) para P2.
3. *Específicos (se adjuntan):* `50_documentacion/traspasos/traspaso_cierre_v01.md`. La carpeta local `barra_autor` conectada basta para leer `data/recipes.js` y `PLAN.md`.

**Nota final:** si algún archivo listado cambió entre sesiones, adjuntar la versión más actualizada y avisarlo en el mensaje de apertura.

## 15. Errores del asistente

| momento | disparador | que_paso | regla_violada | causa_raiz | salvaguarda_presente | patron | gatillo_observable | intentos_previos | costo |
|---|---|---|---|---|---|---|---|---|---|
| Apertura | asistente lo señaló espontáneamente (al cierre) | Notó que POLITICA y SETTINGS no estaban en la knowledge base, siguió sin pedir que se agregaran y no hizo la pregunta de bifurcación de NEW PROJECT | POLITICA §0.2 (failsafe documental) y SETTINGS §1.3 (pregunta de bifurcación) | Se clasificó el proyecto como personal y se priorizó avanzar sobre el failsafe | POLITICA, SETTINGS, userPreferences | PAT-09, avanzar sobre el failsafe documental | costo-sobre-regla: el acuse de apertura declaró la ausencia de los normativos y no los pidió | 0 | Cierre por fallback manual; encargo fuera de expediente |
| Tabla de specs de la casa | usuario lo corrigió | Tabla de specs sin unidad en cada cantidad | Especificación del proyecto §11 (cantidades en oz/ml) | Se comprimió la tabla para brevedad | Especificación adjunta | PAT-08, brevedad sobre requisito de contenido | otro: tabla de cantidades sin columna ni sufijo de unidad | 0 | 1 turno |
| Reglas dulce/seco v1 | usuario lo corrigió | "Vermut" tratado como un solo componente: subía el dry en Dulce y lo bajaba en el ejemplo del Cardinale | Especificación §14 (modificar solo componentes relevantes) | Se agrupó por familia de ingrediente sin revisar el dulzor de cada uno | Especificación adjunta | PAT-07, restricción leída no propagada | restriccion-no-propagada: fila "Vermut" sin distinguir rosso y dry | 0 | 1 turno, tabla reemitida |
| Carga del catálogo | asistente lo señaló espontáneamente | Negroni y Old Fashioned con "cubo grande" cuando la IBA dice cubos; Negroni Pajarillo con método y garnish que contradecían su nota | Especificación §3 (normalizar y verificar specs) | Se verificaron cantidades contra la fuente, no hielo ni garnish | Especificación adjunta | PAT-01, sobre campos no contrastados | afirmar-sin-leer: campo `ice` cargado sin cotejar con la página de la IBA ya leída | 0 | 2 commits de corrección |
| Primer push | usuario lo señaló sin nombrarlo error | Repo configurado con el correo personal; GitHub rechazó el push (GH007) | Contexto de la cuenta: el correo del titular solo identifica, no se publica | Se configuró la identidad sin considerar que el commit es público | Instrucción del sistema sobre el correo | PAT-03, supuesto sobre entorno ajeno | comando-entorno: `git config user.email` con correo personal en repo público | 0 | 1 push fallido, reescritura de 3 commits |
| Rebase de corrección | asistente lo señaló espontáneamente | Rebase lanzado sin permiso de borrado vigente; dejó `HEAD.lock` y `rebase-merge` a medias | SETTINGS §1.2.6 (ningún comando asume el entorno) | Se supuso que el permiso de borrado seguía vigente tras la reconexión | SETTINGS | PAT-03, sobre permisos de la VM | comando-entorno: comando git en carpeta conectada sin verificar permiso de borrado | 0 | 1 recuperación manual del repo |
| Sincronización del Project | asistente lo señaló espontáneamente | `project_write` subió el README a `claude/PLAN.md` | SETTINGS §1.2.6 (generar, verificar, consumar) | Ruta de origen escrita sin verificar antes de consumar | SETTINGS | PAT-02, consumar sin verificación | entrega-sin-destino-o-nombre: `local_path` distinto del archivo declarado | 0 | 1 reescritura del documento |
| Encargo de iconografía | asistente lo señaló espontáneamente (al cierre) | Encargo escrito en `encargos/` con guiones y sin auditoría de redacción, fuera del expediente canónico | SETTINGS §1.2.6 (Encargos a Claude Code) y POLITICA §1.3.2 | Consecuencia del primer error: protocolo de encargos no leído | SETTINGS, POLITICA | PAT-07, restricción no propagada | encargos-premisas: encargo entregado sin `EXPEDIENTE:` ni anexo de auditoría | 0 | Deuda P4 |

**Fricciones:**

- friccion: franja vacía bajo la barra inferior en iPhone → se redujo de 34 a 20 px.
- friccion: títulos de sección en mayúsculas sostenidas → texto normal.
- friccion: negritas en botones, tarjetas y cifras → peso normal salvo marca y cifras clave.
- friccion: "cucharita de bar" → "cuchara de bar".
