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


const filter = () => {
  // funcion que busca los assets declarados en la constante SMALL_METADATA para
  // encontrar si un asset tiene todos los atributos que se desean encontrar
  let matchingIds = []
  SMALL_METADATA.forEach((asset) => {
    let hasThem = false
    for (part in FILTER) {
      if (FILTER[part].length > 0) {
        if (FILTER[part].indexOf(asset.attribs[part]) >= 0) { hasThem = true }
        else {
          hasThem = false
          break
        }
      }
    }
    if (hasThem) { matchingIds.push(asset.id) }
  });
  return matchingIds
}


const modifyFilter = (htmlFormattedAttrib, add) => {
  // funcion que recive el attributo desde el valor del checkbox y si el
  // esta activado o no
  for (part in ATTRIBUTES) {
    let cleanAttrib = ATTRIBUTES[part].find(e => e.toLowerCase() === htmlFormattedAttrib.replace('-', ' '))
    if (cleanAttrib) {
      if (add) { FILTER[part].push(cleanAttrib) }
      else { FILTER[part] = FILTER[part].filter(attr => attr !== cleanAttrib) }
      break
    }
  }
}

const filterIsEmpty = () => {
  let empty = false
  for (part in FILTER) {
    if (FILTER[part].length === 0) { empty = true }
    else { empty = false; break }
  }
  return empty
}


// #############################################################################
// #############################################################################
// ################### BLOQUE DE ESTRUCTURADO DEL DOM ##########################
// #############################################################################
// #############################################################################


// #############################################################################
// #############################################################################
// #############################################################################

const filterAndDisplay = () => {
  // función que llama a la funcion de filtrado y después renderiza los assets
  // en caso de que haya, caso contrario renderiza un mensaje al usuario
  let matchedIds = filter()
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

const displayAll = () => {
  display.innerHTML = ''
  for (asset of SMALL_METADATA) {
    display.append(assetDisplay(asset.id))
  }
}


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
    let checkBox = createDOMElement('input', {
      type: 'checkbox',
      name: formatToValue(attrName),
      id: formatToValue(attrName),
      value: formatToValue(attrName)
    })
    checkBox.addEventListener('change', function() { filterEvent(checkBox) })
    innerDiv.append(checkBox)
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
  assetData.append(createDOMElement('p', null, '0.05'))
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
// ##################   FUNCIONES DE EVENTOS   #################################
// #############################################################################
// #############################################################################


const filterEvent = (element) => {
  console.log(element.checked)
  modifyFilter(element.value, element.checked)
  if (!filterIsEmpty()) { filterAndDisplay() }
  else { displayAll() }
}



// #############################################################################
// #############################################################################
// ############  BLOQUE DE EJECUCIÓN  ##########################################
// #############################################################################
// #############################################################################


const selectorSidebar = document.getElementById('asset-selector')
for (part in ATTRIBUTES) {
  selectorSidebar.append(attribSelector(part, ATTRIBUTES[part]))
}

// display es variable global, llamada en la funcion naiveFilter
const display = document.getElementById('display')
displayAll()
