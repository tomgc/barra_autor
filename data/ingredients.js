// Catálogo de ingredientes (solo lectura).
// abv: graduación típica en %, valor de referencia para el ABV estimado (no es la etiqueta de tu botella).
// substitutes: sustituciones aceptables; el motor las informa como "sustitución", nunca como coincidencia exacta.
// inInitialInventory: true si forma parte del inventario inicial de la spec (§5).
// balanceClass: componente que mueve el ajuste dulce/seco (§14): syrup | sweet-liqueur | sweet-vermouth | citrus.
//   Sin balanceClass = el ajuste dulce/seco no lo toca (p. ej. vermut dry, amargos, mixers).

export const INGREDIENT_CATEGORIES = [
  { id: "spirit", name: "Destilados" },
  { id: "modifier", name: "Modificadores" },
  { id: "bitters", name: "Bitters" },
  { id: "mixer", name: "Mixers" },
  { id: "sweetener", name: "Endulzantes" },
  { id: "fresh", name: "Frescos" },
  { id: "other", name: "Otros" }
];

export const INGREDIENTS = [
  // Destilados
  { id: "gin-london-dry", name: "Gin London Dry", category: "spirit", spiritFamily: "gin", abv: 42, aliases: ["gin", "london dry"], substitutes: [{ id: "gin-pajarillo", note: "Más botánico" }], inInitialInventory: true },
  { id: "gin-pajarillo", name: "Gin botánico (Pajarillo)", category: "spirit", spiritFamily: "gin", abv: 40, abvNote: "Verificar en la etiqueta", aliases: ["gin", "pajarillo", "gin botanico"], substitutes: [{ id: "gin-london-dry", note: "Menos botánico" }], inInitialInventory: true },
  { id: "vodka", name: "Vodka", category: "spirit", spiritFamily: "vodka", abv: 40, aliases: [], substitutes: [], inInitialInventory: true },
  { id: "bourbon", name: "Bourbon", category: "spirit", spiritFamily: "whiskey", abv: 43, aliases: ["whiskey", "whisky"], substitutes: [{ id: "rye", note: "Más especiado" }, { id: "jack-daniels", note: "Tennessee, perfil similar" }], inInitialInventory: true },
  { id: "rye", name: "Rye Whiskey", category: "spirit", spiritFamily: "whiskey", abv: 45, aliases: ["whiskey", "centeno"], substitutes: [{ id: "bourbon", note: "Más dulce y redondo" }], inInitialInventory: false },
  { id: "scotch", name: "Scotch", category: "spirit", spiritFamily: "whiskey", abv: 40, aliases: ["whisky", "escoces"], substitutes: [], inInitialInventory: true },
  { id: "jack-daniels", name: "Jack Daniel's", category: "spirit", spiritFamily: "whiskey", abv: 40, aliases: ["tennessee whiskey", "whiskey"], substitutes: [{ id: "bourbon", note: "Perfil similar" }], inInitialInventory: true },
  { id: "pisco", name: "Pisco", category: "spirit", spiritFamily: "pisco", abv: 40, abvNote: "El pisco chileno va de 30 a 46 %", aliases: [], substitutes: [], inInitialInventory: true },
  { id: "rum", name: "Ron", category: "spirit", spiritFamily: "rum", abv: 40, aliases: ["rum"], substitutes: [], inInitialInventory: true },
  { id: "malibu", balanceClass: "sweet-liqueur", name: "Malibu", category: "modifier", spiritFamily: "liqueur", abv: 21, aliases: ["licor de coco"], substitutes: [], inInitialInventory: true },

  // Modificadores
  { id: "campari", name: "Campari", category: "modifier", spiritFamily: "bitter-liqueur", abv: 25, abvNote: "Varía por mercado (24 a 28,5 %)", aliases: ["bitter rojo"], substitutes: [], inInitialInventory: true },
  { id: "dry-vermouth", name: "Vermut Dry", category: "modifier", spiritFamily: "vermouth", abv: 18, aliases: ["vermut seco", "vermouth dry"], substitutes: [], inInitialInventory: true },
  { id: "sweet-vermouth", balanceClass: "sweet-vermouth", name: "Vermut Rosso", category: "modifier", spiritFamily: "vermouth", abv: 16, aliases: ["vermut rojo", "vermouth rosso", "vermut dulce"], substitutes: [], inInitialInventory: true },
  { id: "cointreau", balanceClass: "sweet-liqueur", name: "Cointreau", category: "modifier", spiritFamily: "liqueur", abv: 40, aliases: ["triple sec", "licor de naranja"], substitutes: [], inInitialInventory: true },
  { id: "st-germain", balanceClass: "sweet-liqueur", name: "St-Germain", category: "modifier", spiritFamily: "liqueur", abv: 20, aliases: ["licor de sauco", "elderflower"], substitutes: [], inInitialInventory: true },
  { id: "calafate-liqueur", balanceClass: "sweet-liqueur", name: "Licor de Calafate", category: "modifier", spiritFamily: "liqueur", abv: 25, abvNote: "Valor supuesto, verificar en la etiqueta", aliases: ["calafate"], substitutes: [], inInitialInventory: true },
  { id: "lillet-blanc", name: "Lillet Blanc", category: "modifier", spiritFamily: "aperitif-wine", abv: 17, aliases: ["kina lillet"], substitutes: [{ id: "dry-vermouth", note: "Pierde el amargor de quinina" }], inInitialInventory: false },
  { id: "apricot-liqueur", balanceClass: "sweet-liqueur", name: "Licor de damasco", category: "modifier", spiritFamily: "liqueur", abv: 24, aliases: ["apricot brandy"], substitutes: [], inInitialInventory: false },
  { id: "dubonnet", name: "Dubonnet Rouge", category: "modifier", spiritFamily: "aperitif-wine", abv: 15, aliases: ["quinquina rojo", "byrrh"], substitutes: [], inInitialInventory: false },
  { id: "aperol", name: "Aperol", category: "modifier", spiritFamily: "bitter-liqueur", abv: 11, aliases: [], substitutes: [], inInitialInventory: false },
  { id: "amaro-nonino", name: "Amaro Nonino", category: "modifier", spiritFamily: "amaro", abv: 35, aliases: ["amaro"], substitutes: [], inInitialInventory: false },
  { id: "sparkling-wine", name: "Espumante brut", category: "mixer", spiritFamily: "wine", abv: 12, aliases: ["champagne", "champana"], substitutes: [], inInitialInventory: false },

  // Bitters
  { id: "angostura", name: "Angostura", category: "bitters", spiritFamily: "bitters", abv: 44.7, aliases: ["amargo de angostura"], substitutes: [], inInitialInventory: true },
  { id: "orange-bitters", name: "Orange Bitters", category: "bitters", spiritFamily: "bitters", abv: 40, abvNote: "Varía por marca", aliases: ["bitter de naranja"], substitutes: [], inInitialInventory: true },

  // Mixers
  { id: "tonic", name: "Tónica", category: "mixer", abv: 0, aliases: ["agua tonica"], substitutes: [], inInitialInventory: true },
  { id: "ginger-beer", name: "Ginger Beer", category: "mixer", abv: 0, aliases: [], substitutes: [{ id: "ginger-ale", note: "Menos picante" }], inInitialInventory: true },
  { id: "ginger-ale", name: "Ginger Ale", category: "mixer", abv: 0, aliases: [], substitutes: [{ id: "ginger-beer", note: "Más picante" }], inInitialInventory: true },
  { id: "soda", name: "Soda", category: "mixer", abv: 0, aliases: ["agua con gas", "club soda"], substitutes: [], inInitialInventory: true },

  // Endulzantes
  { id: "simple-syrup", balanceClass: "syrup", name: "Jarabe de Goma", category: "sweetener", abv: 0, aliases: ["jarabe simple", "simple syrup"], substitutes: [], inInitialInventory: true },
  { id: "calafate-syrup", balanceClass: "syrup", name: "Jarabe de Calafate", category: "sweetener", abv: 0, aliases: ["calafate"], substitutes: [], inInitialInventory: true },
  { id: "sugar", balanceClass: "syrup", name: "Azúcar", category: "sweetener", abv: 0, aliases: ["terron", "azucar flor"], substitutes: [], inInitialInventory: false },

  // Frescos (se usan como jugo recién exprimido salvo que la receta diga otra cosa)
  { id: "lemon", balanceClass: "citrus", name: "Limón", category: "fresh", abv: 0, aliases: ["jugo de limon"], substitutes: [], inInitialInventory: true },
  { id: "lime", balanceClass: "citrus", name: "Lima", category: "fresh", abv: 0, aliases: ["jugo de lima"], substitutes: [], inInitialInventory: true },
  { id: "mandarin", balanceClass: "citrus", name: "Mandarina", category: "fresh", abv: 0, aliases: ["jugo de mandarina"], substitutes: [], inInitialInventory: true },
  { id: "orange", balanceClass: "citrus", name: "Naranja", category: "fresh", abv: 0, aliases: ["jugo de naranja"], substitutes: [], inInitialInventory: true },

  // Otros
  { id: "egg-white", name: "Huevo (clara)", category: "other", abv: 0, aliases: ["huevo", "clara"], substitutes: [{ id: "aquafaba", note: "Vegana; 30 ml por clara" }], inInitialInventory: true },
  { id: "aquafaba", name: "Aquafaba", category: "other", abv: 0, aliases: [], substitutes: [{ id: "egg-white", note: "1 clara por 30 ml" }], inInitialInventory: true }
];
