# Encargo a Claude Code: iconografía de Mi Barra de Autor

Fecha: 2026-10-07 · Repo: `tomgc/barra_autor` · Pendiente de origen: `PLAN.md` §8.

## 1. Objetivo

Producir una ilustración por receta del catálogo (36), en el estilo del piloto que Tomás aprobó, y conectarlas a la app: tarjetas, ficha y precache offline. Las imágenes deben verse igual de bien en el navegador del teléfono que en el escritorio.

## 2. Estilo aprobado (no reinterpretar)

Las plantillas son los tres SVG del piloto, aprobados por Tomás el 2026-10-07:

- `assets/cocktails/src/el-cardinale.svg` (copa Nick & Nora, sin hielo)
- `assets/cocktails/src/pisco-sour.svg` (copa con espuma y gotas de amargo)
- `assets/cocktails/src/gin-tonic.svg` (highball con hielo y burbujas)

Referencia de origen del estilo: `assets/reference/estilo-iconos-referencia.png` (solo estilo; su contenido tiene errores y no se copia).

Reglas que cada ilustración nueva debe cumplir, tal como están en las plantillas:

1. Lienzo 512×512, `viewBox="0 0 512 512"`, fondo papel `#F3EBDD` con el filtro `paper`.
2. Halo hachurado detrás del vaso (patrones `hatch` y `hatch2` con el filtro `pencil`), en un tono del cóctel.
3. Sombra hachurada bajo la base (`shadow`).
4. Líquido con degradé vertical y filtro `pencil`; brillo blanco en el lado izquierdo del vaso.
5. Contorno del vaso en `#3B332C`, trazo 2,2 a 2,4, con filtro `line` (trazo levemente tembloroso).
6. Vaso centrado en x = 256, base cerca de y = 404, misma escala entre recetas del mismo tipo de vaso.
7. Sin texto dentro de la imagen. `role="img"` y un `aria-label` en español que describa vaso, color y garnish.
8. Reutilizar los mismos `<defs>` (filtros y patrones) cambiando solo colores y `seed`, para que el set sea coherente.

## 3. Contenido de cada ilustración

Vaso, hielo y garnish salen de `data/recipes.js` (`glass`, `ice.serve`, `garnish`) y mandan sobre esta tabla si difieren. El color del líquido y del halo es una propuesta de diseño: mantenerla salvo que se vea mal, y anotar cualquier cambio.

| id | Vaso | Hielo | Líquido | Halo | Garnish |
|---|---|---|---|---|---|
| el-cardinale | Nick & Nora | sin | rojo anaranjado translúcido | coral | piel de naranja (hecho) |
| satans-tarde | highball | cubos | ámbar rojizo con burbujas | mandarina | gajo de mandarina |
| dry-martini | copa Martini | sin | casi transparente, levemente pajizo | verde salvia pálido | piel de limón |
| vodka-martini | copa Martini | sin | transparente cristalino | gris azulado pálido | aceituna verde en palillo |
| lucien-gaudin | coupe | sin | rosado anaranjado | durazno | piel de naranja |
| perfect-negroni | Old Fashioned | cubo grande | rojo rubí | rojo pálido | piel de naranja |
| negroni-pajarillo | Old Fashioned | cubos | rojo rubí oscuro | verde hierba pálido | media rodaja de naranja |
| vesper | copa Martini | sin | pajizo dorado pálido | dorado pálido | piel de limón larga |
| elderflower-martini | copa Martini | sin | transparente con brillo amarillo pálido | lila pálido | piel de limón |
| boulevardier-seco | coupe | sin | rojo anaranjado ámbar | cobre | piel de naranja |
| paper-plane-casa | coupe | sin | naranja rojizo turbio | durazno | sin garnish |
| calafate-sour | coupe | sin | violeta calafate, espuma lila | lavanda | gotas de amargo sobre la espuma |
| pisco-sour | copa (goblet) | sin | amarillo pálido, espuma blanca | amarillo verdoso pálido | gotas de amargo (hecho) |
| mandarina-mule | taza Mule (cobre) | cubos | naranja pálido turbio | mandarina | rodaja de mandarina |
| highland-sauco | highball | cubos | ámbar claro con burbujas | crema amarillo (flor de saúco) | piel de limón |
| el-claridge | Nick & Nora | sin | dorado ámbar pálido | damasco | piel de limón |
| el-alfonso | flauta | sin | rosado dorado con burbujas, terrón en el fondo | rosa pálido | piel de limón |
| vermut-cooler | highball | cubos | ámbar rojizo claro con burbujas | naranja | rodaja de naranja |
| negroni | Old Fashioned | cubos | rojo rubí | rojo pálido | media rodaja de naranja |
| boulevardier | coupe | sin | rojo ámbar profundo | cobre | piel de naranja |
| americano | Old Fashioned | cubos | rojo claro con burbujas | coral | media rodaja de naranja y piel de limón |
| manhattan | coupe | sin | ámbar caoba | ámbar | cereza |
| rob-roy | coupe | sin | ámbar caoba más claro | marrón claro | piel de naranja y cereza |
| old-fashioned | Old Fashioned | cubos | ámbar | miel | piel de naranja y cereza |
| whiskey-sour | Old Fashioned | cubos | amarillo ámbar turbio | amarillo | media rodaja de naranja y cereza |
| moscow-mule | taza Mule (cobre) | cubos | pálido turbio | verde lima pálido | rodaja de lima |
| dark-n-stormy | highball | cubos | ginger beer pálido abajo, ron oscuro flotando arriba | ámbar oscuro | gajo de lima |
| daiquiri | coupe | sin | verde blanquecino turbio | lima | sin garnish |
| white-lady | coupe | sin | blanco opalino | gris perla | sin garnish |
| tom-collins | Collins | cubos | amarillo muy pálido turbio con burbujas | limón | rodaja de naranja y cereza |
| gin-fizz | tumbler alto | sin | blanco turbio con burbujas | limón pálido | rodaja de limón |
| gimlet | Nick & Nora | sin | verde lima pálido | lima | piel de lima |
| chilcano | Collins | cubos | amarillo pálido con burbujas y vetas de amargo | amarillo pisco | gajo de lima |
| paper-plane | coupe | sin | naranja ámbar turbio | naranja | sin garnish |
| gin-tonic | highball | cubos | transparente con burbujas | turquesa pálido | piel de limón (hecho) |
| scotch-highball | highball | cubos | ámbar muy pálido con burbujas | ocre pálido | piel de limón |

Además:

- **Cristalería** (`assets/glassware/<vaso>.svg`): coupe, nick-and-nora, martini, old-fashioned, highball, collins, flauta, taza-mule, goblet, balon, tumbler-alto. Vaso vacío, mismo estilo, sin halo de color (halo gris muy suave).
- **Genérica** (`assets/cocktails/src/_generica.svg`): coupe vacía con halo neutro, para recetas personales o del Laboratorio sin ilustración.

## 4. Formato y flujo (R)

- **Fuente:** un SVG por receta en `assets/cocktails/src/<id>.svg` (archivos de asset, escritos directamente; no hace falta script generador).
- **Salida para la app:** WebP 512 px y 256 px en `assets/cocktails/<id>.webp` y `assets/cocktails/<id>-256.webp` (spec §37). Motivo: los filtros SVG (`feTurbulence`, `feDisplacementMap`) son caros de pintar en el teléfono con muchas tarjetas en pantalla; el WebP ya viene pintado.
- **Conversión en R:** `R/10_ilustraciones_a_webp.R`, con `here::here()` para todas las rutas (nunca rutas absolutas) y R moderno (`|>`). Lee cada SVG de `assets/cocktails/src/` y escribe los WebP.
  - Primera opción: `rsvg::rsvg_webp()`.
  - Riesgo conocido: librsvg puede pintar `feTurbulence`/`feDisplacementMap` distinto que Chrome. Comparar visualmente 3 recetas (Chrome vs WebP). Si difieren, renderizar con Chrome desde R (`chromote`, captura del SVG a 512×512) y convertir con `magick`.
  - El script termina con un chequeo: lista los `id` de `data/recipes.js` sin SVG o sin WebP y falla (`stop()`) si falta alguno.
- No se entrega código en otro lenguaje que deba mantenerse (política del equipo: los entregables persistentes van en R).

## 5. Integración en la app

1. Cada receta del catálogo gana su campo `image` (spec §37):
   `image: { src: "assets/cocktails/<id>.webp", thumb: "assets/cocktails/<id>-256.webp", alt: "Ilustración de <nombre>", artist: "Mi Barra de Autor", style: "colored-pencil" }`.
2. **Ficha:** ilustración arriba del nombre, cuadrada, ancho máximo 320 px, esquinas de 10 px (la tarjeta de papel sobre el dark mode es parte del estilo).
3. **Tarjetas** (listados, Inicio, Lab, similares): miniatura de 56 px a la izquierda, con `loading="lazy"`, `width`/`height` declarados y `alt=""` (el nombre ya está al lado).
4. **Sin imagen** (recetas personales, Laboratorio, catálogo futuro): la tarjeta y la ficha usan la genérica; nunca un `<img>` roto. Si el archivo no carga (`onerror`), se cae a la genérica.
5. **Modo Barra:** sin ilustración (prioriza ingredientes y cantidades, spec §17).
6. Agregar todos los WebP y la genérica a `PRECACHE` en `service-worker.js` y subir `CACHE_VERSION` a `mba-v2`.
7. `js/tests.js`: prueba de que toda receta del catálogo tiene `image.src` e `image.thumb` con el patrón de ruta correcto. La existencia real de los archivos la verifica el script de R.
8. `README.md` §9: actualizar con el flujo SVG → WebP y el script de R.

## 6. Criterios de aceptación

- [ ] 36 SVG en `assets/cocktails/src/` + genérica + 11 vasos en `assets/glassware/`.
- [ ] 36 × 2 WebP generados por `R/10_ilustraciones_a_webp.R`, que termina sin faltantes.
- [ ] Vaso, hielo y garnish de cada ilustración coinciden con `data/recipes.js` (revisión una por una contra la tabla §3).
- [ ] Coherencia: lado a lado en una hoja de contacto (`assets/cocktails/_hoja_contacto.png`, 6×6) se ven como un solo set.
- [ ] `tests.html` sin fallas; consola del navegador sin errores; la app funciona offline con las imágenes.
- [ ] Peso total de `assets/cocktails/*.webp` informado en el mensaje de cierre (fuente: comando ejecutado).
- [ ] Un commit por bloque (SVG, WebP + script, integración), autor `tomgc <10123542+tomgc@users.noreply.github.com>`. Sin push: lo hace Tomás.

## 7. Fuera de alcance

- Íconos de la PWA (`assets/icons/`): siguen provisionales; se decidirá aparte si se derivan del set.
- Cambios en specs, cantidades o textos de recetas: si una ilustración revela un error en `data/recipes.js`, se reporta, no se corrige.
