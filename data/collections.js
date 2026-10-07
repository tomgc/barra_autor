// Colecciones iniciales (§31). La pertenencia vive en recipe.collections (lista de IDs).

export const COLLECTIONS = [
  { id: "martini-specs", name: "Martini Specs" },
  { id: "negroni-variations", name: "Variaciones de Negroni" },
  { id: "sours", name: "Sours & Emulsionados" },
  { id: "house", name: "Firma / Favoritos de la Casa" },
  { id: "low-abv", name: "Low ABV & Spritz" },
  { id: "highballs", name: "Highballs & Mules" },
  { id: "whiskey", name: "Whiskey" },
  { id: "gin", name: "Gin" },
  { id: "pisco", name: "Pisco" }
];

// Vocabulario controlado de perfiles (§9). Los tags "stirred" y "shaken" no se guardan:
// se derivan de recipe.method para que no puedan contradecirse.
export const PROFILE_TAGS = {
  structure: [
    { id: "spirit-forward", name: "Spirit Forward" },
    { id: "sour", name: "Sour" },
    { id: "highball", name: "Highball" },
    { id: "fizz", name: "Fizz" },
    { id: "low-abv", name: "Low ABV" }
  ],
  flavor: [
    { id: "ultra-dry", name: "Ultra Seco" },
    { id: "dry", name: "Seco" },
    { id: "bitter", name: "Amargo" },
    { id: "herbal", name: "Herbal" },
    { id: "citrus", name: "Cítrico" },
    { id: "sweet", name: "Dulce" },
    { id: "fruity", name: "Frutal" },
    { id: "spiced", name: "Especiado" },
    { id: "sparkling", name: "Efervescente" }
  ]
};
