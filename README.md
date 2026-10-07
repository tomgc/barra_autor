# Mi Barra de Autor

## 1. Qué es

Cocktail manager personal que funciona sin servidor: inventario de barra, recetas que puedes preparar hoy, ajustes de spec, Modo Barra, historial, Laboratorio de experimentos, comparador de specs, sugerencias ("¿Qué tomo hoy?", "¿Qué debería comprar?"), costo y ABV estimados. Funciona sin conexión una vez instalada (PWA).

Tecnología: HTML, CSS propio y JavaScript (módulos ES) sin dependencias ni paso de compilación. Se publica tal cual en GitHub Pages.

## 2. Ejecutar localmente

Los módulos ES y el service worker necesitan servirse por `http://`; abrir `index.html` con doble clic no funciona.

En la consola de R (Positron), con el proyecto abierto:

```r
servr::httd(here::here())
```

Abre la dirección que muestra la consola. Las pruebas del catálogo y los motores están en `tests.html` (misma dirección + `/tests.html`).

## 3. Desplegar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz de un repositorio (por ejemplo `tomgc/barra_autor`).
2. En GitHub: Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. La app queda en `https://tomgc.github.io/barra_autor/`.
4. Cada vez que publiques cambios, sube `CACHE_VERSION` en `service-worker.js` (`mba-v1` → `mba-v2`) para que los teléfonos con la app instalada descarguen la versión nueva.

## 4. Modificar recetas

El catálogo oficial está en `data/recipes.js` y es de solo lectura para la app: favoritos, ratings, estados y notas se guardan aparte (estado de usuario), así que editar una receta nunca borra tu historial.

- Cada receta tiene un `id` estable (minúsculas, números y guiones). No lo cambies si ya tiene historial.
- `source`: `classic` | `riff` | `author` | `personal`. No marques como clásico algo que es interpretación propia.
- `validation`: `verified` (contrastada con la referencia en `references`), `owner` (spec entregada por Tomás) o `approved` (propuesta y aprobada).
- Después de editar, abre `tests.html`: valida IDs, ingredientes, colecciones, cantidades y recetas obligatorias.

Para recetas propias no hace falta tocar archivos: usa el Laboratorio y "Guardar como receta personal".

## 5. Agregar ingredientes

En `data/ingredients.js`, agrega un objeto con:

- `id` estable, `name`, `category` (`spirit`, `modifier`, `bitters`, `mixer`, `sweetener`, `fresh`, `other`).
- `abv` (graduación típica, usada en el ABV estimado) y `spiritFamily` cuando aplique.
- `substitutes`: sustituciones aceptables (`[{ id, note }]`).
- `balanceClass` si debe moverse con el ajuste dulce/seco: `syrup`, `sweet-liqueur`, `sweet-vermouth` o `citrus`.
- `inInitialInventory: true` si debe aparecer disponible en una instalación nueva.

## 6. Importar y exportar

En la pestaña Respaldo:

- **Exportar** descarga `mi-barra-de-autor-backup-AAAA-MM-DD.json` con inventario, precios, favoritos, ratings, notas, recetas personales y variantes, historial, laboratorio, preferencias y `schemaVersion`.
- **Importar** valida el archivo (JSON, schema, IDs, estructura, duplicados, campos desconocidos) y muestra un resumen antes de aplicar. "Combinar" agrega lo nuevo y, ante un conflicto, conserva lo actual y guarda la receta entrante como copia `-importada`. "Reemplazar todo" exige confirmación.
- Los respaldos de versiones anteriores se migran con `migrateState()` (`js/storage.js`).

## 7. Cómo funciona el inventario

Cada ingrediente está en uno de tres estados: **Hay**, **Poco** o **No**. "Poco" cuenta como disponible y la receta muestra un aviso. El inventario se guarda en el navegador (`localStorage`, clave `mba_inventory`). Si el navegador bloquea el almacenamiento (modo privado), la app sigue funcionando en memoria y lo avisa.

Precios (opcionales): en Mi barra → Precios, anota el precio del envase y su contenido en ml. Se usan para el costo por cóctel y para ordenar las compras.

## 8. Cómo funciona el motor de disponibilidad

`js/engine/matching.js` evalúa cada ingrediente de la receta contra el inventario, en este orden:

1. **Coincidencia exacta**: el ingrediente está (Hay o Poco).
2. **Alternativa con cantidad propia** definida en la receta (p. ej. 1 terrón → 10 ml de jarabe de goma).
3. **Sustitución aceptable** del ingrediente (p. ej. Rye → Bourbon).
4. **Faltante**.

Con eso calcula `requiredIngredients`, `availableIngredients`, `missingIngredients`, `missingCount` y `canMake`. Los ingredientes `optional` no bloquean. No hay etiquetas manuales de disponibilidad.

Otros motores: escala y regla de juguera (`scaling.js`), ajustes de intensidad y dulce/seco con reglas aprobadas (`adjust.js`), ABV, dilución y costo estimados (`estimates.js`), similitud, sugerencias y compras (`discovery.js`), comparador (`compare.js`).

## 9. Agregar ilustraciones

1. Guarda la imagen en `assets/cocktails/<id-de-la-receta>.webp` (cuadrada, 512 px).
2. En la receta, agrega:

```js
image: {
  src: "assets/cocktails/el-cardinale.webp",
  alt: "Ilustración de El Cardinale",
  artist: "Mi Barra de Autor",
  style: "colored-pencil"
}
```

3. Agrega la ruta a `PRECACHE` en `service-worker.js` y sube `CACHE_VERSION`.

La app funciona igual si una receta no tiene imagen. La guía de estilo está en `PLAN.md` (§8) y la referencia visual en `assets/reference/`.

## 10. Estructura JSON

Estado guardado en el navegador:

| Clave | Contenido |
|---|---|
| `mba_inventory` | `{ [ingredientId]: { status, price?, sizeMl? } }` |
| `mba_recipes` | recetas personales y variantes |
| `mba_ingredients` | ingredientes creados por el usuario |
| `mba_user_state` | `{ [recipeId]: { favorite, rating, status, notes } }` |
| `mba_preferences` | unidad, porciones, filtros |
| `mba_history` | preparaciones (fecha, receta, porciones, cantidades, ajustes, sustituciones, rating y notas de la sesión) |
| `mba_lab` | borradores del Laboratorio |
| `mba_schema_version` | versión del modelo (hoy `1`) |

### Schema de importación de una receta

Un archivo con una sola receta también se puede importar:

```json
{
  "schemaVersion": 1,
  "recipe": {
    "id": "mi-receta",
    "name": "Mi Receta",
    "family": "Sour",
    "collections": ["house"],
    "baseSpirit": "gin",
    "ingredients": [
      { "ingredientId": "gin-london-dry", "amount": 2, "unit": "oz", "role": "base" },
      { "ingredientId": "lemon", "amount": 0.75, "unit": "oz", "role": "acid" },
      { "ingredientId": "simple-syrup", "amount": 0.5, "unit": "oz", "role": "sweetener" }
    ],
    "method": "shake",
    "ice": { "serve": "none" },
    "glass": "Coupe",
    "garnish": "Piel de limón",
    "profile": ["sour", "citrus"],
    "difficulty": 2,
    "source": "personal"
  }
}
```

- Obligatorios: `id`, `name`, `ingredients`, `method`.
- `unit`: `ml`, `oz`, `dash`, `barspoon`, `cube`, `unit`. `role`: `base`, `modifier`, `sweetener`, `acid`, `bitters`, `mixer`, `texture`.
- `method`: `stir`, `shake`, `build`. `ice.serve`: `none`, `cubes`, `large-cube`, `crushed`.
- Favorito, rating, estado y notas no van en la receta: se guardan en el estado de usuario.
- Un `ingredientId` desconocido no rompe la importación: la receta lo muestra como faltante.

Los IDs de ingredientes, colecciones y tags disponibles están en `data/ingredients.js` y `data/collections.js`.
