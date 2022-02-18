// #############################################################################
// #############################################################################
// ###################   BLOQUE DE FUNCIONES DE RENDERIZADO   ##################
// ##################################   DEL DOM   ##############################
// #############################################################################

// #############################################################################
// ####################   RENDERIZADO DE SELECTOR DE PAGINAS   #################
// #############################################################################

const pageSelector = () => {
  let wrapper = createDOMElement('div', { class: 'page-selector-display' })

  // vinculacion de variable global
  centerContainer = createDOMElement('div', { class: 'center-container' })
  makeCenterContainer()

  let prev = createDOMElement('p', { class: 'page-selector' }, '< Prev')
  let next = createDOMElement('p', { class: 'page-selector' }, 'Next >')

  prev.addEventListener('click', function() { changePage('prev') })
  next.addEventListener('click', function() { changePage('next') })
  wrapper.append(prev, centerContainer, next)
  return wrapper
}

const makeCenterContainer = () => {
  let pageInput = createDOMElement('input', {
    class: 'page-selector',
    type: 'number',
    min: 1,
    max: idsToRender.length
  })
  pageInput.value = currentPage
  let pageText = createDOMElement('p', null, `/ ${Math.ceil(idsToRender.length / 20)}`)
  pageInput.addEventListener('change', function() { changePage(pageInput.value) })

  centerContainer.innerHTML = ''
  centerContainer.append(pageInput, pageText)
}

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
    placeholder: 'Password',
  })
  let logInBtn = createDOMElement('button', { type: 'submit', value: 'submit' }, 'Log in')
  logInBtn.addEventListener('click', function() { logIn(user, pass) })
  let form = createDOMElement('form')
  form.append(user, pass, logInBtn)
  wrapper.append(form, createDOMElement('p', null, `Not signed in? <a href="signIn.html">Sign in here!</a>`))
  return wrapper
}

// #############################################################################
// ########################   RENDERIZADO DE PAGINAS   #########################
// #############################################################################

const displayPage = () => {
  // console.log(currentPage)
  // console.log(`start ${currentPage * 20 - 20} end ${currentPage * 20}`)
  display.innerHTML = ''
  let pageIds = idsToRender.filter(
    (id, index) => {
      if (currentPage * 20 - 20 <= index && index < currentPage * 20) { /* console.log(`index ${index} id ${id}`);*/ return id }
    }
  )
  // console.log(pageIds)
  for (id of pageIds) {
    display.append(assetDisplay(id))
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
  partTrigger.addEventListener('click', function() { dropdownMenu(attribBlock) })
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
// ####################   EJECUCIÓN DEL RENDERIZADO INICIAL   ##################
// #############################################################################

// variable declarada de forma global; asignada en la función makeCenterContainer
// al contenedor del selector de las páginas
var centerContainer

const userDisplay = document.getElementById('user-display')
const selectorSidebar = document.getElementById('asset-selector')
const userBtn = document.getElementById('user')
const display = document.getElementById('display')
const pageSelectorContainer = document.getElementById('page-selector-container')

for (part in ATTRIBUTES) {
  selectorSidebar.append(attribSelector(part, ATTRIBUTES[part]))
}

userBtn.addEventListener('click', function() { userClick() })
pageSelectorContainer.append(pageSelector())
displayPage()
