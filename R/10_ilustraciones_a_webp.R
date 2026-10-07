# Convierte las ilustraciones SVG fuente a WebP para la app (encargo 2026-10-07, spec §37).
#
# Entrada : assets/cocktails/src/<id>.svg   (más _generica.svg)
# Salida  : assets/cocktails/<id>.webp (512 px) y assets/cocktails/<id>-256.webp (256 px)
#           assets/cocktails/_hoja_contacto.png (6 x 6, para revisar la coherencia del set)
#
# Motivo: los filtros SVG (feTurbulence, feDisplacementMap) son caros de pintar en el
# teléfono con muchas tarjetas en pantalla; el WebP ya viene pintado.
#
# Render: librsvg (paquete rsvg). Se comparó con Chrome en 3 recetas (negroni, gin-tonic,
# el-alfonso) y la textura de lápiz, el trazo y los colores son equivalentes. Si en el
# futuro difieren, renderizar con chromote y convertir con magick.
#
# Uso (desde la raíz del proyecto, en la consola de R o con Rscript):
#   source(here::here("R", "10_ilustraciones_a_webp.R"))

library(here)
library(rsvg)
library(webp)
library(magick)

tamanos <- c(512, 256)
calidad <- 90
dir_svg <- here("assets", "cocktails", "src")
dir_out <- here("assets", "cocktails")

# ids del catálogo: líneas "id: "..., name: ..." de data/recipes.js (una por receta)
ids_catalogo <- here("data", "recipes.js") |>
  readLines(encoding = "UTF-8") |>
  (\(x) regmatches(x, regexec('^\\s*id: "([a-z0-9-]+)", name:', x)))() |>
  lapply(\(m) if (length(m) == 2) m[2] else NA_character_) |>
  unlist() |>
  na.omit() |>
  as.character()

stopifnot(length(ids_catalogo) > 0, !anyDuplicated(ids_catalogo))

nombre_salida <- function(id, px) {
  sufijo <- if (px == 512) "" else paste0("-", px)
  file.path(dir_out, paste0(id, sufijo, ".webp"))
}

# SVG → WebP (render con rsvg, compresión con webp)
svg_a_webp <- function(id, px) {
  svg <- file.path(dir_svg, paste0(id, ".svg"))
  rsvg(svg, width = px, height = px) |>
    write_webp(target = nombre_salida(id, px), quality = calidad)
}

ids_con_svg <- list.files(dir_svg, pattern = "\\.svg$") |>
  sub(pattern = "\\.svg$", replacement = "")
ids_a_convertir <- c(intersect(ids_catalogo, ids_con_svg), intersect("_generica", ids_con_svg))

for (id in ids_a_convertir) {
  for (px in tamanos) svg_a_webp(id, px)
}
message("Convertidas ", length(ids_a_convertir), " ilustraciones (", paste(tamanos, collapse = " y "), " px).")

# hoja de contacto 6 x 6 con los WebP de 256 px, en el orden del catálogo
n_col <- 6
ids_hoja <- ids_catalogo[file.exists(nombre_salida(ids_catalogo, 256))]
if (length(ids_hoja) > 0) {
  mosaicos <- lapply(ids_hoja, \(id) image_read(nombre_salida(id, 256)))
  filas <- split(mosaicos, ceiling(seq_along(mosaicos) / n_col)) |>
    lapply(\(fila) do.call(c, fila) |> image_append())
  do.call(c, filas) |>
    image_append(stack = TRUE) |>
    image_write(file.path(dir_out, "_hoja_contacto.png"), format = "png")
}

# chequeo final: toda receta del catálogo necesita SVG y los dos WebP
sin_svg <- setdiff(ids_catalogo, ids_con_svg)
sin_webp <- ids_catalogo[!file.exists(nombre_salida(ids_catalogo, 512)) |
                           !file.exists(nombre_salida(ids_catalogo, 256))]
if (!file.exists(nombre_salida("_generica", 512)) || !file.exists(nombre_salida("_generica", 256))) {
  sin_webp <- c(sin_webp, "_generica")
}
if (length(sin_svg) > 0 || length(sin_webp) > 0) {
  stop(
    "Faltan ilustraciones.\n  Sin SVG: ", if (length(sin_svg)) paste(sin_svg, collapse = ", ") else "(ninguna)",
    "\n  Sin WebP: ", if (length(sin_webp)) paste(sin_webp, collapse = ", ") else "(ninguna)",
    call. = FALSE
  )
}

peso <- list.files(dir_out, pattern = "\\.webp$", full.names = TRUE) |> file.size() |> sum()
message("OK: ", length(ids_catalogo), " recetas del catálogo con SVG y WebP (512 y 256). ",
        "Peso total de assets/cocktails/*.webp: ", round(peso / 1024), " KB.")
