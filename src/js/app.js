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


// #############################################################################
// #############################################################################
// ############################# BLOQUE DE LÓGICA DEL PROGRAMA #################
// #############################################################################
// #############################################################################


// #############################################################################
// ################### INICIO DE SESIÓN ########################################
// #############################################################################


// Bloque de funciones dedicadas al inicio de sesión y autenticación de usuario
// contrasenia
const signIn = () => {
  let user = ''
  do {
    user = prompt('Nombre de usuario')
  } while (user === '')

  let verified = undefined
  do {
    if (!verified && verified !== undefined) { alert('Hubo un error en la verificación, volvé a intentar') }
    let password = prompt('Ingresa tu contrasenia, \nla contrasenia debe tener por lo menos 8 caracteres \ny por lo menos una letra mayúscula y una minúscula')
    let password2 = prompt('Volve a ingresar contrasenia, recordá que: \nla contrasenia debe tener por lo menos 8 caracteres \ny por lo menos una letra mayúscula y una minúscula')
    verified = verifyPassword(password, password2)
  } while (!verified)
  alert(`Usuario y contrasenia verificadas. Hola ${user}`)
  return user
}

const verifyPassword = (pass1, pass2) => {
  if (pass1.length < 8) { return false }
  else if (pass1 !== pass2) { return false }

  let lowerCase = false
  let upperCase = false
  for (l of pass1.split('')) {
    if (l === l.toUpperCase()) { upperCase = true }
    else if (l === l.toLowerCase()) { lowerCase = true }
  }

  if (lowerCase && upperCase) { return true }
  else { return false }
}

// #############################################################################
// ###################  LÓGICA DE FILTRADO POR ATRIBUTOS #######################
// #############################################################################


const filterPrompt = () => {
  // función que promtea al usuario para que elija los atributos por los que
  // quiere realizar la búsqueda, devuelve un objeto con la forma:
  // {
  //  parte: [attr1, attr2, ..., attrN],
  //  ...
  //  parteN: [attr1, attr2, ..., attrN]
  // }
  let selection = {}
  alert('Filtrar NFTs por partes, no es necesario que sigas la capitalización.\nSi no querés filtrar por esa parte específica, apretá enter')
  for (part in ATTRIBUTES) {
    let promptMsg = `Estás eligiendo los atributos de la parte ${part}, las opciones son:\n  --${ATTRIBUTES[part].join('\n  --')}\nSi querés buscar más de un atributo, separálos por comas`
    let choice = prompt(promptMsg)
    if (choice !== '') {
      let parsedChoices = parseChoices(part, choice)
      console.log(parsedChoices.join(', '))
      if (parsedChoices.length > 0) { selection[part] = parsedChoices }
    }
  }
  return selection
}

const parseChoices = (part, choicesStr) => {
  // función interna que  vincula el promt del usuario y devuelve el atributo
  // correspondiente
  let output = []
  let choicesArr = choicesStr.split(',')
  for (attr of choicesArr) {
    let cleanedAttr = ATTRIBUTES[part].find(a => a.toLowerCase() === attr.trim().toLowerCase())
    if (cleanedAttr) { output.push(cleanedAttr) }
  }
  return output
}

const filter = (attribsToFilter) => {
  // funcion que busca los assets declarados en la constante SMALL_METADATA para
  // encontrar si un asset tiene todos los atributos que se desean encontrar
  let matchingIds = []
  SMALL_METADATA.forEach((asset) => {
    let hasThem = false
    for (part in attribsToFilter) {
      if (attribsToFilter[part].indexOf(asset.attribs[part]) >= 0) { hasThem = true }
      else {
        hasThem = false
        break
      }
    }
    if (hasThem) { matchingIds.push(asset.id) }
  });
  return matchingIds
}

// #############################################################################
// #############################################################################
// ################### BLOQUE DE ESTRUCTURADO DEL DOM ##########################
// #############################################################################
// #############################################################################


// #############################################################################
// #################### SIDEBAR ################################################
// #############################################################################


// #############################################################################
// #############################################################################
// ############  BLOQUE DE EJECUCIÓN  ##########################################
// #############################################################################
// #############################################################################


//signIn()

let toFilter = filterPrompt()
let matchedIds = filter(toFilter)
console.log(`Las id de los NFTs que matchean tú busqueda son: ${matchedIds.join(', ')}`)
