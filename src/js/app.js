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
  // función interna que  vincula el prompt del usuario y devuelve el atributo
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

const naiveFilter = () => {
  let matchedIds = filter(filterPrompt())
  console.log(`Las id de los NFTs que matchean tú busqueda son: ${matchedIds.join(', ')}`)
  display.innerHTML = ''
  if (matchedIds.length > 0) {
    for (id of matchedIds) {
      display.append(assetDisplay(id))
    }
  } else {
    display.append(createDOMElement('p', null, 'There are no matching NFTs for your query'))
  }

}


// #############################################################################
// #############################################################################
// ################### BLOQUE DE ESTRUCTURADO DEL DOM ##########################
// #############################################################################
// #############################################################################


// #############################################################################
// #################### SELECTOR DE ATRIBUTOS ##################################
// #############################################################################

const attribSelector = (name, attribs) => {
  // funcion que genera los bloques de atributos a partir de los datos dados por
  // el objeto ATTRIBUTES
  let wrapper = createDOMElement('div', { class: 'attrib-selector' })
  let title = createDOMElement('h2', null, name)
  wrapper.append(title)
  for (attrName of attribs) {
    let innerDiv = createDOMElement('div', { class: 'attrib' })
    innerDiv.append(createDOMElement('input', {
      type: 'checkbox',
      name: formatToValue(attrName),
      value: formatToValue(attrName)
    }))
    innerDiv.append(createDOMElement('label', { for: formatToValue(attrName) }, attrName))
    wrapper.append(innerDiv)
  }
  return wrapper
}

// #############################################################################
// #################### MOSTRADOR ##############################################
// ############################################################################

const assetDisplay = (id) => {
  let wrapper = createDOMElement('div', { id: id, class: 'item' })
  wrapper.append(createDOMElement('img', {
    src: `../assets/images/${id}.png`,
    alt: `ChainHelper number ${id}`
  }))
  let assetData = createDOMElement('div', { class: 'item-data' })
  assetData.append(createDOMElement('p', { class: 'item-name' }, `ChainHelper #${id}`))
  assetData.append(createDOMElement('p', null, 'price'))
  wrapper.append(assetData)
  return wrapper
}

// #############################################################################
// #################### FUNCIONES GENERICAS ####################################
// #############################################################################

const createDOMElement = (tag, domAttribs = null, innerHTML = null) => {
  // funcion interna que genera elementos dom, recibe un str refiriendo al tag,
  // un objeto con el formato { atributoDOM: valor, ... } y un str en el caso de
  // que se desee darle texto al atributo
  let el = document.createElement(tag)
  if (domAttribs) {
    for (attr in domAttribs) {
      el.setAttribute(attr, domAttribs[attr])
    }
  }
  if (innerHTML) { el.innerHTML = innerHTML }
  return el
}

const formatToValue = (attrib) => {
  // funcion que retorna el nombre del atributo formateado en minúscula y con
  // guiones por espacios para usar en texto html
  return attrib.toLowerCase().replace(' ', '-')
}


// #############################################################################
// #############################################################################
// ############  BLOQUE DE EJECUCIÓN  ##########################################
// #############################################################################
// #############################################################################


//signIn()

const selectorSidebar = document.getElementById('asset-selector')
for (part in ATTRIBUTES) {
  selectorSidebar.append(attribSelector(part, ATTRIBUTES[part]))
}

// display es variable global, llamada en la funcion naiveFilter
const display = document.getElementById('display')
for (asset of SMALL_METADATA) {
  display.append(assetDisplay(asset.id))
}

naiveFilter()
