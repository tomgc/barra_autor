// Catálogo oficial de recetas (solo lectura). Favoritos, ratings, estado y notas NO van aquí:
// viven en el estado de usuario (ver data/demo-user-state.js y PLAN.md §2).
//
// source:      classic | riff | author | personal
// validation:  verified (spec contrastada con la referencia citada)
//              approved (spec propuesta por Claude y aprobada por Tomás, 2026-10-07)
//              owner    (spec entregada por Tomás)
// roles:       base | modifier | sweetener | acid | bitters | mixer | texture
// units:       ml | oz | dash | barspoon | cube | unit
// top: true    el mixer completa el vaso; amount es el volumen nominal usado para ABV y escala.
// optional:    el motor de disponibilidad no lo exige.
// alternatives: reemplazos con cantidad propia (p. ej. terrón → ml de jarabe), preferidos sobre los sustitutos genéricos.
//               Equivalencias de jarabe asumen jarabe de goma 1:1; con jarabe 2:1 usar ~2/3.
// batch:       "sour" habilita la regla de juguera para 5+ porciones (§15).
// image:       ilustración (spec §37). src 512 px y thumb 256 px en assets/cocktails/ (WebP generados por R/10_ilustraciones_a_webp.R
//              desde assets/cocktails/src/<id>.svg). Sin image, la app usa la genérica.

export const RECIPES = [
  // ───────── Recetas obligatorias (§4) ─────────
  {
    id: "el-cardinale", name: "El Cardinale", family: "Negroni", source: "classic", validation: "owner",
    image: { src: "assets/cocktails/el-cardinale.webp", thumb: "assets/cocktails/el-cardinale-256.webp", alt: "Ilustración de El Cardinale", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs", "negroni-variations", "gin", "house"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 1.5, unit: "oz", role: "base" },
      { ingredientId: "campari", amount: 1, unit: "oz", role: "modifier" },
      { ingredientId: "dry-vermouth", amount: 1, unit: "oz", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none" }, glass: "Nick & Nora", garnish: "Piel de naranja",
    profile: ["spirit-forward", "bitter", "dry"], difficulty: 1,
    origin: { text: "Roma, Hotel Excelsior, años 50 (Giovanni Raimondo).", year: 1950 },
    specNote: "Proporción de la casa (1,5 : 1 : 1). Difford's usa partes iguales; la IBA (2024) usa 40 gin, 20 vermut, 10 Campari.",
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/572/cardinale" }]
  },
  {
    id: "satans-tarde", name: "Satan's Tarde", family: "Highball", source: "personal", validation: "owner",
    image: { src: "assets/cocktails/satans-tarde.webp", thumb: "assets/cocktails/satans-tarde-256.webp", alt: "Ilustración de Satan's Tarde", artist: "barra de autor", style: "colored-pencil" },
    collections: ["house", "low-abv"], baseSpirit: "vermouth",
    ingredients: [
      { ingredientId: "sweet-vermouth", amount: 1.5, unit: "oz", role: "base" },
      { ingredientId: "cointreau", amount: 0.5, unit: "oz", role: "modifier" },
      { ingredientId: "mandarin", amount: 0.5, unit: "oz", role: "acid" },
      { ingredientId: "tonic", amount: 3, unit: "oz", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Highball", garnish: "Gajo de mandarina",
    profile: ["highball", "low-abv", "citrus", "sparkling", "bitter"], difficulty: 1,
    specNote: "Top de tónica: 3 oz como volumen nominal."
  },
  {
    id: "dry-martini", name: "Dry Martini", family: "Martini", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/dry-martini.webp", thumb: "assets/cocktails/dry-martini-256.webp", alt: "Ilustración de Dry Martini", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "dry-vermouth", amount: 10, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Copa Martini", garnish: "Piel de limón o aceituna",
    profile: ["spirit-forward", "ultra-dry"], difficulty: 1,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/dry-martini/" }]
  },
  {
    id: "vodka-martini", name: "Vodka Martini", family: "Martini", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/vodka-martini.webp", thumb: "assets/cocktails/vodka-martini-256.webp", alt: "Ilustración de Vodka Martini", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs"], baseSpirit: "vodka",
    ingredients: [
      { ingredientId: "vodka", amount: 75, unit: "ml", role: "base" },
      { ingredientId: "dry-vermouth", amount: 15, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Copa Martini", garnish: "Piel de limón o aceituna",
    profile: ["spirit-forward", "ultra-dry"], difficulty: 1,
    specNote: "Vodka desde el congelador.",
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/2054/vodka-martini" }]
  },
  {
    id: "lucien-gaudin", name: "Lucien Gaudin", family: "Martini", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/lucien-gaudin.webp", thumb: "assets/cocktails/lucien-gaudin-256.webp", alt: "Ilustración de Lucien Gaudin", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs", "negroni-variations", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "cointreau", amount: 15, unit: "ml", role: "modifier" },
      { ingredientId: "campari", amount: 15, unit: "ml", role: "modifier" },
      { ingredientId: "dry-vermouth", amount: 15, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Piel de naranja",
    profile: ["spirit-forward", "bitter", "citrus"], difficulty: 1,
    origin: { text: "París, 1929; nombrado por el esgrimista Lucien Gaudin.", year: 1929 },
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/2709/lucien-gaudin" }]
  },
  {
    id: "perfect-negroni", name: "Perfect Negroni", family: "Negroni", source: "riff", validation: "verified",
    image: { src: "assets/cocktails/perfect-negroni.webp", thumb: "assets/cocktails/perfect-negroni-256.webp", alt: "Ilustración de Perfect Negroni", artist: "barra de autor", style: "colored-pencil" },
    collections: ["negroni-variations", "gin"], baseSpirit: "gin", parentId: "negroni",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "campari", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "sweet-vermouth", amount: 15, unit: "ml", role: "modifier" },
      { ingredientId: "dry-vermouth", amount: 15, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "large-cube" }, glass: "Old Fashioned", garnish: "Piel de naranja",
    profile: ["spirit-forward", "bitter"], difficulty: 1,
    specNote: "\"Perfect\" = vermut dividido en partes iguales (convención de barra)."
  },
  {
    id: "negroni-pajarillo", name: "Negroni Pajarillo", family: "Negroni", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/negroni-pajarillo.webp", thumb: "assets/cocktails/negroni-pajarillo-256.webp", alt: "Ilustración de Negroni Pajarillo", artist: "barra de autor", style: "colored-pencil" },
    collections: ["negroni-variations", "gin", "house"], baseSpirit: "gin", parentId: "negroni",
    ingredients: [
      { ingredientId: "gin-pajarillo", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "campari", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "sweet-vermouth", amount: 30, unit: "ml", role: "modifier" }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Old Fashioned", garnish: "Media rodaja de naranja",
    profile: ["spirit-forward", "bitter", "herbal"], difficulty: 1,
    specNote: "Base: Negroni IBA con gin botánico."
  },
  {
    id: "vesper", name: "Vesper Martini", family: "Martini", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/vesper.webp", thumb: "assets/cocktails/vesper-256.webp", alt: "Ilustración de Vesper Martini", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "vodka", amount: 15, unit: "ml", role: "base" },
      { ingredientId: "lillet-blanc", amount: 7.5, unit: "ml", role: "modifier" }
    ],
    method: "shake", ice: { serve: "none", chilledGlass: true }, glass: "Copa Martini", garnish: "Piel de limón",
    profile: ["spirit-forward", "dry"], difficulty: 1,
    origin: { text: "Ian Fleming, Casino Royale.", year: 1953 },
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/vesper/" }]
  },
  {
    id: "elderflower-martini", name: "Elderflower Martini", family: "Martini", source: "riff", validation: "approved",
    image: { src: "assets/cocktails/elderflower-martini.webp", thumb: "assets/cocktails/elderflower-martini-256.webp", alt: "Ilustración de Elderflower Martini", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs", "gin"], baseSpirit: "gin", parentId: "dry-martini",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "dry-vermouth", amount: 20, unit: "ml", role: "modifier" },
      { ingredientId: "st-germain", amount: 10, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Copa Martini", garnish: "Piel de limón",
    profile: ["spirit-forward", "dry", "herbal"], difficulty: 1,
    specNote: "Adaptado del Floral Martini de Difford's sin agua de rosas.",
    references: [{ label: "Difford's Guide (Floral Martini)", url: "https://www.diffordsguide.com/cocktails/recipe/765/floral-martini" }]
  },
  {
    id: "boulevardier-seco", name: "Boulevardier Seco", family: "Negroni", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/boulevardier-seco.webp", thumb: "assets/cocktails/boulevardier-seco-256.webp", alt: "Ilustración de Boulevardier Seco", artist: "barra de autor", style: "colored-pencil" },
    collections: ["negroni-variations", "whiskey"], baseSpirit: "whiskey", parentId: "boulevardier",
    ingredients: [
      { ingredientId: "bourbon", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "campari", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "dry-vermouth", amount: 30, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Piel de naranja",
    profile: ["spirit-forward", "bitter", "dry"], difficulty: 1,
    specNote: "Base: Boulevardier IBA con vermut dry en vez de rosso."
  },
  {
    id: "paper-plane-casa", name: "Paper Plane Casa", family: "Sour", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/paper-plane-casa.webp", thumb: "assets/cocktails/paper-plane-casa-256.webp", alt: "Ilustración de Paper Plane Casa", artist: "barra de autor", style: "colored-pencil" },
    collections: ["whiskey", "sours"], baseSpirit: "whiskey", parentId: "paper-plane",
    ingredients: [
      { ingredientId: "bourbon", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "campari", amount: 20, unit: "ml", role: "modifier" },
      { ingredientId: "sweet-vermouth", amount: 20, unit: "ml", role: "modifier" },
      { ingredientId: "lemon", amount: 25, unit: "ml", role: "acid" },
      { ingredientId: "simple-syrup", amount: 10, unit: "ml", role: "sweetener" }
    ],
    method: "shake", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Sin garnish",
    profile: ["sour", "bitter", "citrus"], difficulty: 2,
    specNote: "Versión con el inventario de la casa: Campari reemplaza Aperol (menos cantidad, más amargo) y vermut rosso + jarabe reemplazan Amaro Nonino."
  },
  {
    id: "calafate-sour", name: "Calafate Sour", family: "Sour", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/calafate-sour.webp", thumb: "assets/cocktails/calafate-sour-256.webp", alt: "Ilustración de Calafate Sour", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours", "pisco", "house"], baseSpirit: "pisco", parentId: "pisco-sour", batch: "sour",
    ingredients: [
      { ingredientId: "pisco", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "calafate-liqueur", amount: 15, unit: "ml", role: "modifier" },
      { ingredientId: "lemon", amount: 25, unit: "ml", role: "acid" },
      { ingredientId: "calafate-syrup", amount: 15, unit: "ml", role: "sweetener" },
      { ingredientId: "egg-white", amount: 1, unit: "unit", role: "texture" }
    ],
    method: "shake", ice: { serve: "none", dryShake: true }, glass: "Coupe", garnish: "Gotas de angostura",
    profile: ["sour", "fruity", "citrus"], difficulty: 2,
    specNote: "Base: Pisco Sour con calafate en licor y jarabe."
  },
  {
    id: "pisco-sour", name: "Pisco Sour Clásico", family: "Sour", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/pisco-sour.webp", thumb: "assets/cocktails/pisco-sour-256.webp", alt: "Ilustración de Pisco Sour Clásico", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours", "pisco"], baseSpirit: "pisco", batch: "sour",
    ingredients: [
      { ingredientId: "pisco", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "lemon", amount: 30, unit: "ml", role: "acid" },
      { ingredientId: "simple-syrup", amount: 20, unit: "ml", role: "sweetener" },
      { ingredientId: "egg-white", amount: 1, unit: "unit", role: "texture" },
      { ingredientId: "angostura", amount: 3, unit: "dash", role: "bitters", note: "Sobre la espuma" }
    ],
    method: "shake", ice: { serve: "none", dryShake: true }, glass: "Copa (goblet)", garnish: "Gotas de amargo sobre la espuma",
    profile: ["sour", "citrus"], difficulty: 2,
    specNote: "IBA indica amargo (Amargo Chuncho); se usa Angostura.",
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/pisco-sour" }]
  },
  {
    id: "mandarina-mule", name: "Mandarina Mule", family: "Mule", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/mandarina-mule.webp", thumb: "assets/cocktails/mandarina-mule-256.webp", alt: "Ilustración de Mandarina Mule", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs", "house"], baseSpirit: "vodka", parentId: "moscow-mule",
    ingredients: [
      { ingredientId: "vodka", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "mandarin", amount: 30, unit: "ml", role: "acid" },
      { ingredientId: "lime", amount: 10, unit: "ml", role: "acid" },
      { ingredientId: "ginger-beer", amount: 100, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Taza Mule o Highball", garnish: "Rodaja de mandarina",
    profile: ["highball", "citrus", "fruity", "spiced", "sparkling"], difficulty: 1,
    specNote: "Base: Moscow Mule IBA con mandarina."
  },
  {
    id: "highland-sauco", name: "Highland Saúco", family: "Highball", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/highland-sauco.webp", thumb: "assets/cocktails/highland-sauco-256.webp", alt: "Ilustración de Highland Saúco", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs", "whiskey", "house"], baseSpirit: "whiskey",
    ingredients: [
      { ingredientId: "scotch", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "st-germain", amount: 15, unit: "ml", role: "modifier" },
      { ingredientId: "lemon", amount: 10, unit: "ml", role: "acid" },
      { ingredientId: "soda", amount: 100, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Highball", garnish: "Piel de limón",
    profile: ["highball", "herbal", "sparkling"], difficulty: 1,
    specNote: "Base: highball de scotch con saúco."
  },
  {
    id: "el-claridge", name: "El Claridge", family: "Martini", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/el-claridge.webp", thumb: "assets/cocktails/el-claridge-256.webp", alt: "Ilustración de El Claridge", artist: "barra de autor", style: "colored-pencil" },
    collections: ["martini-specs", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "dry-vermouth", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "cointreau", amount: 10, unit: "ml", role: "modifier" },
      { ingredientId: "apricot-liqueur", amount: 10, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Nick & Nora", garnish: "Piel de limón",
    profile: ["spirit-forward", "fruity"], difficulty: 1,
    origin: { text: "Claridge's Hotel, París; publicado por Harry McElhone en 1922.", year: 1922 },
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/440/claridge-cocktail" }]
  },
  {
    id: "el-alfonso", name: "El Alfonso", family: "Champagne Cocktail", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/el-alfonso.webp", thumb: "assets/cocktails/el-alfonso-256.webp", alt: "Ilustración de El Alfonso", artist: "barra de autor", style: "colored-pencil" },
    collections: ["low-abv"], baseSpirit: "wine",
    ingredients: [
      { ingredientId: "sugar", amount: 1, unit: "cube", role: "sweetener",
        alternatives: [{ ingredientId: "simple-syrup", amount: 10, unit: "ml", note: "Misma equivalencia que el Old Fashioned: 1 terrón ≈ 10 ml de jarabe 1:1" }] },
      { ingredientId: "angostura", amount: 4, unit: "dash", role: "bitters" },
      { ingredientId: "dubonnet", amount: 15, unit: "ml", role: "modifier" },
      { ingredientId: "sparkling-wine", amount: 100, unit: "ml", role: "base", top: true }
    ],
    method: "build", ice: { serve: "none", chilledGlass: true }, glass: "Flauta", garnish: "Piel de limón",
    profile: ["low-abv", "sparkling", "bitter"], difficulty: 1,
    origin: { text: "Nombrado por Alfonso XIII, exiliado en Francia." },
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/40/alfonso" }]
  },
  {
    id: "vermut-cooler", name: "Vermut Cooler", family: "Highball", source: "personal", validation: "approved",
    image: { src: "assets/cocktails/vermut-cooler.webp", thumb: "assets/cocktails/vermut-cooler-256.webp", alt: "Ilustración de Vermut Cooler", artist: "barra de autor", style: "colored-pencil" },
    collections: ["low-abv", "highballs", "house"], baseSpirit: "vermouth",
    ingredients: [
      { ingredientId: "sweet-vermouth", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "orange", amount: 15, unit: "ml", role: "acid" },
      { ingredientId: "angostura", amount: 1, unit: "dash", role: "bitters" },
      { ingredientId: "soda", amount: 100, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Highball", garnish: "Rodaja de naranja",
    profile: ["highball", "low-abv", "sparkling", "citrus"], difficulty: 1,
    specNote: "Spec de la casa."
  },

  // ───────── Clásicos y referencias adicionales ─────────
  {
    id: "negroni", name: "Negroni", family: "Negroni", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/negroni.webp", thumb: "assets/cocktails/negroni-256.webp", alt: "Ilustración de Negroni", artist: "barra de autor", style: "colored-pencil" },
    collections: ["negroni-variations", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "campari", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "sweet-vermouth", amount: 30, unit: "ml", role: "modifier" }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Old Fashioned", garnish: "Media rodaja de naranja",
    profile: ["spirit-forward", "bitter"], difficulty: 1,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/negroni/" }]
  },
  {
    id: "boulevardier", name: "Boulevardier", family: "Negroni", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/boulevardier.webp", thumb: "assets/cocktails/boulevardier-256.webp", alt: "Ilustración de Boulevardier", artist: "barra de autor", style: "colored-pencil" },
    collections: ["negroni-variations", "whiskey"], baseSpirit: "whiskey",
    ingredients: [
      { ingredientId: "bourbon", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "campari", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "sweet-vermouth", amount: 30, unit: "ml", role: "modifier" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Piel de naranja",
    profile: ["spirit-forward", "bitter", "sweet"], difficulty: 1,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/boulevardier/" }]
  },
  {
    id: "americano", name: "Americano", family: "Highball", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/americano.webp", thumb: "assets/cocktails/americano-256.webp", alt: "Ilustración de Americano", artist: "barra de autor", style: "colored-pencil" },
    collections: ["negroni-variations", "low-abv"], baseSpirit: "vermouth",
    ingredients: [
      { ingredientId: "campari", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "sweet-vermouth", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "soda", amount: 30, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Old Fashioned", garnish: "Media rodaja de naranja y piel de limón",
    profile: ["low-abv", "bitter", "sparkling"], difficulty: 1,
    specNote: "IBA: \"un chorro\" de soda; 30 ml como volumen nominal.",
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/americano/" }]
  },
  {
    id: "manhattan", name: "Manhattan", family: "Manhattan", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/manhattan.webp", thumb: "assets/cocktails/manhattan-256.webp", alt: "Ilustración de Manhattan", artist: "barra de autor", style: "colored-pencil" },
    collections: ["whiskey"], baseSpirit: "whiskey",
    ingredients: [
      { ingredientId: "rye", amount: 50, unit: "ml", role: "base" },
      { ingredientId: "sweet-vermouth", amount: 20, unit: "ml", role: "modifier" },
      { ingredientId: "angostura", amount: 1, unit: "dash", role: "bitters" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Cereza de cóctel",
    profile: ["spirit-forward", "sweet", "spiced"], difficulty: 1,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/manhattan/" }]
  },
  {
    id: "rob-roy", name: "Rob Roy", family: "Manhattan", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/rob-roy.webp", thumb: "assets/cocktails/rob-roy-256.webp", alt: "Ilustración de Rob Roy", artist: "barra de autor", style: "colored-pencil" },
    collections: ["whiskey"], baseSpirit: "whiskey", parentId: "manhattan",
    ingredients: [
      { ingredientId: "scotch", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "sweet-vermouth", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "angostura", amount: 2, unit: "dash", role: "bitters" }
    ],
    method: "stir", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Piel de naranja y cereza",
    profile: ["spirit-forward", "sweet"], difficulty: 1,
    specNote: "Difford's usa bitters Abbott's; se normaliza a Angostura.",
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/1681/rob-roy-cocktail" }]
  },
  {
    id: "old-fashioned", name: "Old Fashioned", family: "Old Fashioned", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/old-fashioned.webp", thumb: "assets/cocktails/old-fashioned-256.webp", alt: "Ilustración de Old Fashioned", artist: "barra de autor", style: "colored-pencil" },
    collections: ["whiskey"], baseSpirit: "whiskey",
    ingredients: [
      { ingredientId: "bourbon", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "sugar", amount: 1, unit: "cube", role: "sweetener",
        alternatives: [{ ingredientId: "simple-syrup", amount: 10, unit: "ml", note: "Difford's usa 7,5 ml de jarabe 2:1 ≈ 10 ml de jarabe 1:1" }] },
      { ingredientId: "angostura", amount: 3, unit: "dash", role: "bitters" }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Old Fashioned", garnish: "Piel de naranja y cereza",
    profile: ["spirit-forward", "sweet", "spiced"], difficulty: 2,
    specNote: "IBA: terrón empapado en bitters y unas gotas de agua, macerado.",
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/old-fashioned/" }]
  },
  {
    id: "whiskey-sour", name: "Whiskey Sour", family: "Sour", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/whiskey-sour.webp", thumb: "assets/cocktails/whiskey-sour-256.webp", alt: "Ilustración de Whiskey Sour", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours", "whiskey"], baseSpirit: "whiskey", batch: "sour",
    ingredients: [
      { ingredientId: "bourbon", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "lemon", amount: 25, unit: "ml", role: "acid" },
      { ingredientId: "simple-syrup", amount: 20, unit: "ml", role: "sweetener" },
      { ingredientId: "egg-white", amount: 1, unit: "unit", role: "texture", optional: true }
    ],
    method: "shake", ice: { serve: "cubes" }, glass: "Old Fashioned", garnish: "Media rodaja de naranja y cereza",
    profile: ["sour", "citrus"], difficulty: 2,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/whiskey-sour/" }]
  },
  {
    id: "moscow-mule", name: "Moscow Mule", family: "Mule", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/moscow-mule.webp", thumb: "assets/cocktails/moscow-mule-256.webp", alt: "Ilustración de Moscow Mule", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs"], baseSpirit: "vodka",
    ingredients: [
      { ingredientId: "vodka", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "lime", amount: 10, unit: "ml", role: "acid" },
      { ingredientId: "ginger-beer", amount: 120, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Taza Mule", garnish: "Rodaja de lima",
    profile: ["highball", "spiced", "citrus", "sparkling"], difficulty: 1,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/moscow-mule/" }]
  },
  {
    id: "dark-n-stormy", name: "Dark 'n' Stormy", family: "Mule", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/dark-n-stormy.webp", thumb: "assets/cocktails/dark-n-stormy-256.webp", alt: "Ilustración de Dark 'n' Stormy", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs"], baseSpirit: "rum",
    ingredients: [
      { ingredientId: "rum", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "ginger-beer", amount: 100, unit: "ml", role: "mixer" }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Highball", garnish: "Gajo de lima",
    profile: ["highball", "spiced", "sparkling"], difficulty: 1,
    specNote: "IBA pide ron oscuro (Goslings) flotando sobre la ginger beer.",
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/dark-n-stormy/" }]
  },
  {
    id: "daiquiri", name: "Daiquiri", family: "Sour", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/daiquiri.webp", thumb: "assets/cocktails/daiquiri-256.webp", alt: "Ilustración de Daiquiri", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours"], baseSpirit: "rum",
    ingredients: [
      { ingredientId: "rum", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "lime", amount: 20, unit: "ml", role: "acid" },
      { ingredientId: "sugar", amount: 2, unit: "barspoon", role: "sweetener",
        alternatives: [{ ingredientId: "simple-syrup", amount: 15, unit: "ml", note: "Difford's usa 10 ml de jarabe 2:1 ≈ 15 ml de jarabe 1:1" }] }
    ],
    method: "shake", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Sin garnish",
    profile: ["sour", "citrus", "dry"], difficulty: 1,
    specNote: "IBA: azúcar flor disuelta antes de agitar.",
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/daiquiri/" }]
  },
  {
    id: "white-lady", name: "White Lady", family: "Sour", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/white-lady.webp", thumb: "assets/cocktails/white-lady-256.webp", alt: "Ilustración de White Lady", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 40, unit: "ml", role: "base" },
      { ingredientId: "cointreau", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "lemon", amount: 20, unit: "ml", role: "acid" }
    ],
    method: "shake", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Sin garnish",
    profile: ["sour", "citrus"], difficulty: 1,
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/white-lady/" }]
  },
  {
    id: "tom-collins", name: "Tom Collins", family: "Collins", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/tom-collins.webp", thumb: "assets/cocktails/tom-collins-256.webp", alt: "Ilustración de Tom Collins", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "lemon", amount: 25, unit: "ml", role: "acid" },
      { ingredientId: "simple-syrup", amount: 20, unit: "ml", role: "sweetener" },
      { ingredientId: "soda", amount: 50, unit: "ml", role: "mixer", top: true }
    ],
    method: "shake", ice: { serve: "cubes" }, glass: "Collins", garnish: "Rodaja de naranja y cereza",
    profile: ["highball", "fizz", "citrus", "sparkling"], difficulty: 1,
    specNote: "Difford's usa Old Tom gin y 15 ml de jarabe 2:1; normalizado a London Dry y 20 ml de jarabe 1:1.",
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/1972/tom-collins" }]
  },
  {
    id: "gin-fizz", name: "Gin Fizz", family: "Fizz", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/gin-fizz.webp", thumb: "assets/cocktails/gin-fizz-256.webp", alt: "Ilustración de Gin Fizz", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 45, unit: "ml", role: "base" },
      { ingredientId: "lemon", amount: 30, unit: "ml", role: "acid" },
      { ingredientId: "simple-syrup", amount: 10, unit: "ml", role: "sweetener" },
      { ingredientId: "soda", amount: 30, unit: "ml", role: "mixer", top: true }
    ],
    method: "shake", ice: { serve: "none" }, glass: "Tumbler alto", garnish: "Rodaja de limón",
    profile: ["fizz", "citrus", "sparkling"], difficulty: 1,
    specNote: "IBA: se sirve sin hielo.",
    references: [{ label: "IBA", url: "https://iba-world.com/iba-cocktail/gin-fizz/" }]
  },
  {
    id: "gimlet", name: "Gimlet", family: "Sour", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/gimlet.webp", thumb: "assets/cocktails/gimlet-256.webp", alt: "Ilustración de Gimlet", artist: "barra de autor", style: "colored-pencil" },
    collections: ["sours", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "lime", amount: 22.5, unit: "ml", role: "acid" },
      { ingredientId: "simple-syrup", amount: 22.5, unit: "ml", role: "sweetener" }
    ],
    method: "shake", ice: { serve: "none", chilledGlass: true }, glass: "Nick & Nora", garnish: "Piel de lima",
    profile: ["sour", "citrus"], difficulty: 1,
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/27563/gimlet-sour-classic" }]
  },
  {
    id: "chilcano", name: "Chilcano de Pisco", family: "Highball", source: "classic", validation: "verified",
    image: { src: "assets/cocktails/chilcano.webp", thumb: "assets/cocktails/chilcano-256.webp", alt: "Ilustración de Chilcano de Pisco", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs", "pisco"], baseSpirit: "pisco",
    ingredients: [
      { ingredientId: "pisco", amount: 60, unit: "ml", role: "base" },
      { ingredientId: "lime", amount: 7.5, unit: "ml", role: "acid" },
      { ingredientId: "angostura", amount: 3, unit: "dash", role: "bitters" },
      { ingredientId: "ginger-ale", amount: 105, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Collins", garnish: "Gajo de lima",
    profile: ["highball", "citrus", "sparkling"], difficulty: 1,
    specNote: "Difford's pide Amargo Chuncho; se usa Angostura.",
    references: [{ label: "Difford's Guide", url: "https://www.diffordsguide.com/cocktails/recipe/3490/chilcano-de-pisco" }]
  },
  {
    id: "paper-plane", name: "Paper Plane", family: "Sour", source: "author", validation: "verified",
    image: { src: "assets/cocktails/paper-plane.webp", thumb: "assets/cocktails/paper-plane-256.webp", alt: "Ilustración de Paper Plane", artist: "barra de autor", style: "colored-pencil" },
    collections: ["whiskey", "sours"], baseSpirit: "whiskey",
    ingredients: [
      { ingredientId: "bourbon", amount: 30, unit: "ml", role: "base" },
      { ingredientId: "amaro-nonino", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "aperol", amount: 30, unit: "ml", role: "modifier" },
      { ingredientId: "lemon", amount: 30, unit: "ml", role: "acid" }
    ],
    method: "shake", ice: { serve: "none", chilledGlass: true }, glass: "Coupe", garnish: "Sin garnish",
    profile: ["sour", "bitter", "citrus"], difficulty: 1,
    origin: { text: "Sam Ross, 2008; servido por primera vez en The Violet Hour, Chicago.", year: 2008 },
    references: [{ label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Paper_plane_(cocktail)" }]
  },
  {
    id: "gin-tonic", name: "Gin Tonic", family: "Highball", source: "classic", validation: "approved",
    image: { src: "assets/cocktails/gin-tonic.webp", thumb: "assets/cocktails/gin-tonic-256.webp", alt: "Ilustración de Gin Tonic", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs", "gin"], baseSpirit: "gin",
    ingredients: [
      { ingredientId: "gin-london-dry", amount: 50, unit: "ml", role: "base" },
      { ingredientId: "tonic", amount: 150, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Copa balón o Highball", garnish: "Piel de limón",
    profile: ["highball", "bitter", "sparkling", "dry"], difficulty: 1,
    specNote: "Proporción 1:3 de uso común; sin spec IBA."
  },
  {
    id: "scotch-highball", name: "Scotch Highball", family: "Highball", source: "classic", validation: "approved",
    image: { src: "assets/cocktails/scotch-highball.webp", thumb: "assets/cocktails/scotch-highball-256.webp", alt: "Ilustración de Scotch Highball", artist: "barra de autor", style: "colored-pencil" },
    collections: ["highballs", "whiskey"], baseSpirit: "whiskey",
    ingredients: [
      { ingredientId: "scotch", amount: 50, unit: "ml", role: "base" },
      { ingredientId: "soda", amount: 150, unit: "ml", role: "mixer", top: true }
    ],
    method: "build", ice: { serve: "cubes" }, glass: "Highball", garnish: "Piel de limón",
    profile: ["highball", "dry", "sparkling"], difficulty: 1,
    specNote: "Proporción 1:3 de uso común; sin spec IBA."
  }
];
