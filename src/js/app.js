// #############################################################################
// #############################################################################
// ###################   BLOQUE DE FUNCIONES DE RENDERIZADO   ##################
// ##################################   DEL DOM   ##############################
// #############################################################################

// #############################################################################
// ####################   RENDERIZADO DE INTERFAZ DE USUARIO   #################
// #############################################################################

const userLogIn = () => {
  let wrapper = createDOMElement('div', { class: 'user-login' }, '<h4>You are not logged in..</h4>')
  let user = createDOMElement('input', {
    type: 'text',
    name: 'user',
    placeholder: 'Username'
  })
  let pass = createDOMElement('input', {
    type: 'password',
    name: 'pass',
    placeholder: 'Password'
  })
  let logInBtn = createDOMElement('button', { type: 'submit', value: 'submit' }, 'Log in')
  logInBtn.addEventListener('click', function() { logIn(user, pass) })
  let form = createDOMElement('form')
  form.append(user, pass, logInBtn)
  wrapper.append(form, createDOMElement('p', null, `Not signed in? <a href="#">Sign in here!</a>`))
  return wrapper
}

// #############################################################################
// #################   RENDERIZADO POR FILTRADO   ##############################
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
// ############## RENDERIZADO DE INTERFAZ DE FILTRO POR ATRIBUTOS ##############
// #############################################################################

const attribSelector = (name, attribs) => {
  // funcion que genera los bloques de atributos a partir de los datos dados por
  // el objeto ATTRIBUTES
  let wrapper = createDOMElement('div', { class: 'attrib-selector' })
  let partTrigger = createDOMElement('div', { class: 'attrib-trigger' }, `<h2>${name}</h2>`)
  partTrigger.addEventListener('click', function() { changeSelectorDisplay(attribBlock) })
  let attribBlock = createDOMElement('div', { style: 'display: none' })
  for (attrName of attribs) {
    let innerDiv = createDOMElement('div', { class: 'attrib' })
    let checkBox = createDOMElement('input', {
      type: 'checkbox',
      name: formatToValue(attrName),
      id: formatToValue(attrName),
      value: formatToValue(attrName)
    })
    checkBox.addEventListener('change', function() { filterEvent(checkBox) })
    innerDiv.append(checkBox, createDOMElement('label', { for: formatToValue(attrName) }, attrName))
    attribBlock.append(innerDiv)
  }
  wrapper.append(partTrigger, attribBlock)
  return wrapper
}

// #############################################################################
// ####################   RENDERIZADO DE TARJETAS DE NFTS   ####################
// #############################################################################

const assetDisplay = (id) => {
  let wrapper = createDOMElement('div', { id: id, class: 'item' })
  wrapper.append(createDOMElement('img', {
    src: `../assets/images/${id}.png`,
    alt: `ChainHelper number ${id}`
  }))
  let assetData = createDOMElement('div', { class: 'item-data' })
  assetData.append(createDOMElement('p', { class: 'item-name' }, `ChainHelper #${id}`))
  assetData.append(createDOMElement('p', null, 'ETH 0.05'))
  assetData.append(createDOMElement('img', { src: 'img/hearth_empty.png' }))
  wrapper.append(assetData)
  return wrapper
}

// #############################################################################
// ###############   FUNCIONES GENERICAS  DE RENDERIZADO   #####################
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


const changeSelectorDisplay = (element) => {
  console.log('change selector triggered')
  if (element.style.display === 'none') {
    element.style.display = 'block'
  } else {
    element.style.display = 'none'
  }
}

const logIn = (userEl, passEl) => {
  // falta verificar identidad del user
  user = {
    name: userEl.value,
    loggedIn: true
  }
  console.log(`hola ${user.name}, tu contrasenia es ${passEl.value}`)

}

const userClick = () => {
  if (!user.loggedIn && !userDisplay.innerHTML) {
    userDisplay.append(userLogIn())
  } else if (userDisplay.innerHTML) {
    userDisplay.innerHTML = ''
  }
  // falta un elif más para mosstrar las caracteristicas del usuario
}

const filterEvent = (element) => {
  console.log(element.checked)
  modifyFilter(element.value, element.checked)
  if (!filterIsEmpty()) { filterAndDisplay() }
  else { displayAll() }
}


// #############################################################################
// ###################   LÓGICA DE FILTRADO POR ATRIBUTOS   ####################
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
// ############  BLOQUE DE EJECUCIÓN  ##########################################
// #############################################################################
// #############################################################################

// #########   VARIABLES GLOBALES   #########
var user = {
  name: '',
  loggedIn: false
}
const userDisplay = document.getElementById('user-display')
const selectorSidebar = document.getElementById('asset-selector')
const userBtn = document.getElementById('user')
const display = document.getElementById('display')

for (part in ATTRIBUTES) {
  selectorSidebar.append(attribSelector(part, ATTRIBUTES[part]))
}

userBtn.addEventListener('click', function() { userClick() })
displayAll()
