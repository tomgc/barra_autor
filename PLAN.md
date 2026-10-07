# Mi Barra de Autor: plan de proyecto

Versión 13 (2026-10-07). Leyenda: [x] hecho · [~] motor listo, falta UI · [ ] pendiente. Fuente: `mi-barra-de-autor-especificacion.md` (50 secciones).

## 1. Decisiones tomadas

| # | Decisión | Motivo |
|---|----------|--------|
| D1 | CSS propio con variables (sin Tailwind) | Cero dependencias, offline sin trucos, la spec ya fija la paleta. |
| D2 | Entrega por fases; cada fase es desplegable en GitHub Pages | 50 secciones en un bloque son imposibles de verificar. |
| D3 | Specs: Claude investiga clásicos y propone las de la casa; Tomás valida | Solo 2 de 18 obligatorias traen spec. |
| D4 | Catálogo inmutable + capa de usuario separada | La spec mezcla `favorite/rating/notes/status` dentro de RECIPE; eso rompe "spec original intacto" y complica migraciones. |
| D5 | ES modules nativos (`<script type="module">`) | Organización por motores sin build. Exige servidor local (ver §6). |
| D6 | Datos en `data/*.js` (exportan objetos) | Se cargan sin `fetch`, se cachean igual que el código. |
| D7 | Tests en `tests.html` (corre en el navegador) | Sin Node; los motores son funciones puras y se prueban ahí. |
| D9 | Reglas de ajuste v2 aprobadas por Tomás (2026-10-07), en `js/engine/adjust.js` (`RULES`) | Solo vermut rosso es dulce; amargos, vinos aperitivo, clara, mixers y líneas top nunca cambian; si una base es protegida la intensidad no aplica; terrones no se fraccionan. |
| D10 | Terrones y azúcar con alternativa en jarabe (`alternatives` por línea, cantidad propia) | Pedido de Tomás: los terrones no son comunes en casa. Equivalencias desde Difford's (jarabe 2:1) convertidas a jarabe 1:1. |
| D11 | Dilución estimada por método con fuente (Cocktails & Bars, 2018: stir 40-45 %, shake ~30 %, con soda ~20 %); build sin mixer 20 % marcado como supuesto. Se eliminó el campo `dilution` fijo de las recetas | El campo fijo contradecía la fuente (sours marcados "alta" con ~30 %) |
| D12 | Íconos de la PWA provisionales (copa geométrica ámbar) | Se reemplazan con el encargo de iconografía (§8) |
| D13 | Ilustraciones dibujadas como SVG (Claude Design / Claude Code) y servidas como WebP generado en R | Tomás eligió Claude Design y aprobó el estilo del piloto; WebP evita pintar filtros SVG pesados en el teléfono |
| D8 | `validation` en cada receta: owner / verified / approved | Trazabilidad de cada spec: entregada por Tomás, contrastada con la referencia, o propuesta y aprobada. |

## 2. Modelo de datos (corrección clave de la spec)

```
CATÁLOGO (data/, solo lectura, versionado en git)
  ingredients   id, name, category, abv, aliases[], substitutes[{id, quality}]
  recipes       id, name, family, source, baseSpirit, ingredients[{ingredientId, amount, unit, role}],
                method, ice, glass, garnish, profile[], difficulty, dilution, image?, parentId?
  collections   id, name, recipeIds[]

ESTADO DE USUARIO (localStorage, exportable)
  mba_inventory     { ingredientId: "available" | "low" | "out", price? }
  mba_user_state    { recipeId: { favorite, rating, status, notes } }
  mba_recipes       recetas personales y variantes (parentId apunta al original)
  mba_history       [{ date, recipeId, servings, adjustments, substitutions, rating, notes }]
  mba_lab           borradores experimentales
  mba_preferences   unidad, porciones, filtros
  mba_schema_version
```

Reglas: `role` es obligatorio (base, modifier, acid, sweetener, bitter, mixer, egg, garnish); los motores de ajuste deciden qué tocar según `role`, nunca por nombre. `abv` vive en el ingrediente (necesario para el ABV estimado).

## 3. Fases

### F1. Núcleo usable
- [x] Investigación y normalización de specs (36 recetas; 10 propuestas aprobadas por Tomás el 2026-10-07)
- [x] `ingredients.js`, `recipes.js`, `collections.js` + validador de catálogo (en `js/tests.js`)
- [x] Inventario (disponible / poco / agotado) con persistencia
- [x] Motor de disponibilidad (`canMake`, `missing`, `missingCount`) + filtros 0 / 1 / 2 / todo
- [x] Sustituciones (exacta / aceptable / faltante)
- [x] Buscador sin acentos ni mayúsculas; filtros de perfil combinables
- [x] Ficha de receta: oz/ml, escala 1-15, regla de juguera para sours
- [x] Favoritos, rating, estado, notas
- [x] Exportar / importar backup con validación y resumen previo; `migrateState()` desde v1
- [x] Layout mobile-first, dark mode, accesibilidad base

### F2. Experimentación
- [x] Modo Barra (pantalla simplificada + temporizador)
- [x] Ajuste de intensidad y dulce/seco (spec original vs ajustado)
- [x] Historial de preparaciones (rating de sesión ≠ rating general)
- [x] Variantes versionadas y Laboratorio
- [x] Comparador de specs

### F3. Inteligencia y PWA
- [x] Similitud ("Si te gusta este cóctel…")
- [x] ¿Qué tomo hoy? (con penalización por repetición reciente)
- [x] ¿Qué debería comprar? (recetas desbloqueadas / costo)
- [x] Costo por cóctel, ABV estimado, dilución estimada
- [x] Dashboard completo
- [x] Manifest, iconos, service worker, prueba offline
- [x] README completo y schema de importación documentado

## 4. Recetas obligatorias: clasificación preliminar

Clasificación hipotética, verificar con la investigación de F1.

| Receta | Tipo probable | Observación |
|--------|---------------|-------------|
| El Cardinale | Clásico | Spec entregada |
| Satan's Tarde | Personal | Spec entregada |
| Dry Martini, Vesper, Pisco Sour | Clásico (IBA) | |
| Vodka Martini, Lucien Gaudin, El Claridge, El Alfonso | Clásico | Claridge y Alfonso usan ingredientes fuera del inventario |
| Perfect Negroni, Elderflower Martini | Riff | |
| Paper Plane Casa | Riff de autor | El original requiere Aperol y amaro, fuera del inventario |
| Negroni Pajarillo, Boulevardier Seco, Calafate Sour, Mandarina Mule, Highland Saúco, Vermut Cooler | Personal | Spec propuesta por Claude, a validar |

## 5. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Reglas de intensidad y dulce/seco arbitrarias | Definir tabla de reglas por `role` antes de programar F2; validarla con Tomás |
| Escalar egg sours a 15 porciones | Huevo y aquafaba se redondean a unidades enteras; aviso de juguera |
| `localStorage` bloqueado (modo privado) | Fallback en memoria + aviso visible |
| Backup antiguo tras cambio de modelo | `schemaVersion` desde el día 1 y migraciones encadenadas |

## 6. Ejecución local y despliegue

- Local (ES modules necesitan servidor): en R, `servr::httd(here::here())`.
- Despliegue: repo `tomgc/barra_autor` (público) → Settings → Pages → rama `main`, carpeta raíz.

## 7. Próximo paso

F1, F2 y F3 cerradas; validación §49 completa (ver §10). Publicada en https://tomgc.github.io/barra_autor/ (repo `tomgc/barra_autor`, rama `main`; verificado 2026-10-07: 79/79 pruebas, sin errores de consola, offline OK). Siguiente: ejecutar el encargo de iconografía en Claude Code; luego la sesión de búsqueda de recetas (§8).

## 8. Pendientes fuera de fase

- [ ] Sesión dedicada a búsqueda intensa en internet de recetas para ampliar la biblioteca de cócteles (pedido de Tomás, 2026-10-07). Mantener criterios §3 de la spec: verificar specs con fuentes reconocidas, distinguir clásico / riff / autor / personal, no copiar texto.

- [x] Encargo a Claude Code: generación de la iconografía del proyecto (pedido de Tomás, 2026-10-07). **Ejecutado el 2026-10-07 (pendiente de push y de revisión visual de Tomás):** 36 SVG + genérica en `assets/cocktails/src/`, 11 vasos en `assets/glassware/`, WebP 512/256 px vía `R/10_ilustraciones_a_webp.R` (hoja de contacto en `assets/cocktails/_hoja_contacto.png`), campo `image` en las 36 recetas, miniaturas en tarjetas, ilustración en la ficha, precache `mba-v2`. Lo de abajo es el diseño original; el encargo prevalece donde difieran. **Estado previo:** estilo aprobado por Tomás sobre un piloto de 3 ilustraciones hecho en Claude Design (SVG con textura de lápiz simulada); plantillas en `assets/cocktails/src/`; encargo redactado en `encargos/2026-10-07_iconografia_claude_code.md` (SVG fuente → WebP vía R). Lo que sigue en este punto queda como diseño original, reemplazado por el encargo donde difieran. Referencia de estilo: `assets/reference/estilo-iconos-referencia.png`.
  - **Estilo:** ilustración a mano en lápiz de colores, con trazo visible y sombreado por hachurado; papel color crema con textura; un halo suave de color detrás de cada vaso, del tono del cóctel; contorno del vaso fino y oscuro, con brillos blancos; líquido con degradé; hielo translúcido; garnish detallado (piel de cítrico, cereza, menta, rodaja); colores cálidos y saturados sin ser chillones; elegante, no infantil (spec §37).
  - **Qué tomar de la referencia y qué no:** solo el estilo. Su contenido tiene errores ("Negroni" repetido y dibujado como shot en capas, "Chemones" mal escrito), así que cada dibujo debe partir de la ficha real de la receta: vaso (`glass`), color del líquido según ingredientes, hielo (`ice.serve`) y `garnish`.
  - **Sin texto dentro de la imagen:** el nombre lo pone la app (accesibilidad, sin errores de tipeo como en la referencia).
  - **Alcance:** (1) una ilustración por receta del catálogo, en `assets/cocktails/<id>.webp`, con el campo `image` de cada receta (§37); (2) un set de cristalería (coupe, Nick & Nora, copa Martini, Old Fashioned, Highball/Collins, flauta, taza Mule, copa goblet, copa balón) en `assets/glassware/`; (3) placeholder genérico para recetas sin ilustración. Los íconos de navegación siguen como SVG de línea.
  - **Formato:** cuadrado 1:1, webp, con fondo de papel crema incluido (funciona como tarjeta sobre el dark mode); tamaños 512 y 256 px; mismo encuadre y escala de vaso en todo el set.
  - **Restricción técnica a resolver en el encargo:** Claude Code escribe código y no genera imágenes rasterizadas en lápiz de colores. El encargo debe definir la herramienta de generación de imágenes (fuera de Claude Code) y dejar a Claude Code el pipeline: prompts por receta generados desde `data/recipes.js`, nombres de archivo, conversión a webp y tamaños, campo `image` en el catálogo y verificación de que no falte ninguna. El pipeline va en R (política de entregables).

## 9. Registro de errores del asistente

| Fecha | Error | Corrección |
|-------|-------|------------|
| 2026-10-07 | Tabla de spec propuestas sin unidad de medida en cada cantidad | Toda cantidad se expresa con unidad (ml y oz) |
| 2026-10-07 | Regla dulce/seco trataba "vermut" como un solo ingrediente: subía vermut dry en "Dulce" y lo bajaba en el ejemplo del Cardinale | Solo el vermut rosso es componente dulce; el vermut dry no se toca en el ajuste dulce/seco |
| 2026-10-07 | Negroni (IBA) cargado con "cubo grande"; la IBA indica vaso lleno de cubos. Negroni Pajarillo, descrito como "Negroni IBA con gin botánico", tenía stir y piel de naranja | Negroni y Negroni Pajarillo: build, cubos, media rodaja de naranja (aprobado por Tomás) |
| 2026-10-07 | Old Fashioned (IBA) cargado con "cubo grande"; la IBA indica llenar el vaso con cubos. Detectado al revisar método, hielo, vaso y garnish de las 24 recetas verificadas | Old Fashioned: cubos. Resto de recetas verificadas coincide con su referencia |
| 2026-10-07 | Se subió el README al documento `claude/PLAN.md` del proyecto en claude.ai (ruta de origen equivocada) | Se reescribió `claude/PLAN.md` con el contenido del plan |
| 2026-10-07 | Repo local configurado con el correo personal como autor de los commits; GitHub rechazó el push (GH007, correo privado) | Correo de autor cambiado a la dirección noreply de GitHub (`10123542+tomgc@users.noreply.github.com`) y commits reescritos antes del primer push |

## 10. Validación final (§49 de la spec), 2026-10-07

| Bloque | Resultado |
|---|---|
| Datos | 36 recetas, 18/18 obligatorias, IDs únicos, ingredientes normalizados, cantidades válidas (pruebas en `tests.html`) |
| Motor | Matching, faltantes, sustituciones, alternativas, escala, oz/ml, intensidad, dulce/seco, juguera, ABV, dilución, similitud, recomendaciones, compras: 79 pruebas sin fallas |
| Usuario | Favoritos, ratings, notas, historial, variantes, laboratorio: probados en navegador |
| Persistencia | Inventario, recetas, historial, favoritos, ratings, notas, laboratorio: persisten al recargar; sin localStorage funciona en memoria con aviso |
| Respaldo | Exportar, importar con resumen, JSON inválido, receta incompleta, duplicados, campos desconocidos, migraciones |
| UI | Móvil 390 px sin desborde, escritorio, Modo Barra, foco visible y navegación por teclado nativa, offline verificado con red cortada |
| Código | 0 errores de consola en 6 recorridos de navegador; 0 archivos inexistentes en el precache; sin secretos ni dependencias externas; rutas relativas compatibles con GitHub Pages |
