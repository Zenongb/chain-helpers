// obj de tipo json que contiene una versión simplificada de la metadata con próposito
// de servir de medio para que el la funcion de filtro pueda encontrar la id del asset
// que contenga los atributos deseados, esta funciónalidad será movida al servidor
// para el lanzamiento. El objeto es escrito en una sola línea para no aniadir
// 200 lineas al archivo.
const SMALL_METADATA =
  JSON.parse('[{ "id": 1, "attribs": { "Head": "Smooth mint", "Body": "Shirt black", "Mouth": "Cartoon smile", "Eyes": "Mint human", "Background": "Violet" } }, { "id": 2, "attribs": { "Head": "Smooth mint", "Body": "Shirt black", "Mouth": "Cartoon smile", "Eyes": "Cartoon narrow", "Background": "Violet" } }, { "id": 3, "attribs": { "Head": "Smooth mint", "Body": "Sweater orange", "Mouth": "Rainbow beak", "Eyes": "Big alien", "Background": "Gradient grey" } }, { "id": 4, "attribs": { "Head": "Smooth lightblue", "Body": "Grunge violet", "Mouth": "Keys", "Eyes": "Cartoon", "Background": "Red grid" } }, { "id": 5, "attribs": { "Head": "Spectral black", "Body": "Shirt black", "Mouth": "Keys", "Eyes": "Cartoon", "Background": "Gradient gum" } }, { "id": 6, "attribs": { "Head": "Spectral black", "Body": "Shirt black", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Gradient gum" } }, { "id": 7, "attribs": { "Head": "Spiky blue", "Body": "Grunge violet", "Mouth": "Cartoon smile", "Eyes": "Mint human", "Background": "Violet" } }, { "id": 8, "attribs": { "Head": "Smooth lightblue", "Body": "Grunge violet", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Gradient grey" } }, { "id": 9, "attribs": { "Head": "Smooth mint", "Body": "Sweater orange", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Violet" } }, { "id": 10, "attribs": { "Head": "Smooth yellow", "Body": "Grunge violet", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Yellow" } }, { "id": 11, "attribs": { "Head": "Smooth lightblue", "Body": "Sweater orange", "Mouth": "Bubblegum", "Eyes": "Big alien", "Background": "Mint" } }, { "id": 12, "attribs": { "Head": "Smooth yellow", "Body": "Shirt black", "Mouth": "Keys", "Eyes": "Cartoon", "Background": "Yellow" } }, { "id": 13, "attribs": { "Head": "Smooth lightblue", "Body": "Sweater orange", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Violet" } }, { "id": 14, "attribs": { "Head": "Smooth mint", "Body": "Sweater orange", "Mouth": "Keys", "Eyes": "Mint human", "Background": "Yellow" } }, { "id": 15, "attribs": { "Head": "Smooth mint", "Body": "Sweater stripes", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Gradient grey" } }, { "id": 16, "attribs": { "Head": "Smooth lightblue", "Body": "Shirt black", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Gradient grey" } }, { "id": 17, "attribs": { "Head": "Smooth yellow", "Body": "Shirt black", "Mouth": "Bubblegum", "Eyes": "Cartoon", "Background": "Red grid" } }, { "id": 18, "attribs": { "Head": "Rainbow ruin", "Body": "Sweater stripes", "Mouth": "Cartoon smile", "Eyes": "Big alien", "Background": "Mint" } }, { "id": 19, "attribs": { "Head": "Spectral black", "Body": "Sweater stripes", "Mouth": "Cartoon smile", "Eyes": "Cartoon", "Background": "Yellow" } }, { "id": 20, "attribs": { "Head": "Rainbow ruin", "Body": "Shirt black", "Mouth": "Keys", "Eyes": "Big alien", "Background": "Yellow" } }]')
const ATTRIBUTES = { // obj conteniendo los distintos atrribs y sus valoers; utilizado para ael renderizado del buscador y para la lógica del filtrado
  Head: [
    "Smooth mint",
    "Smooth lightblue",
    "Spectral black",
    "Spiky blue",
    "Smooth yellow",
    "Rainbow ruin"
  ],
  Body: [
    "Shirt black",
    "Sweater orange",
    "Grunge violet",
    "Sweater stripes"
  ],
  Eyes: [
    "Mint human",
    "Cartoon narrow",
    "Big alien",
    "Cartoon"
  ],
  Mouth: [
    "Cartoon smile",
    "Rainbow beak",
    "Keys",
    "Bubblegum"
  ],
  Background: [
    "Violet",
    "Gradient grey",
    "Red grid",
    "Gradient gum",
    "Yellow",
    "Mint"
  ]
}

// Objeto usado para guardar los atributos a filtrar
const FILTER = {
  Head: [],
  Body: [],
  Eyes: [],
  Mouth: [],
  Background: [],
}
