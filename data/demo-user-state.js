// Estado de usuario de demostración (§44). Se carga solo si localStorage está vacío.
// Contiene únicamente lo declarado en la spec (§6 y §45); el resto de las recetas parte "pending".

export const DEMO_USER_STATE = {
  "el-cardinale": { favorite: true, rating: 5, status: "tested", notes: "" },
  "satans-tarde": { favorite: true, rating: 0, status: "tested", notes: "" }
};
