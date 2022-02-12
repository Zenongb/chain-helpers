// #############################################################################
// #############################################################################
// ###################   BLOQUE DE FUNCIONES DE RENDERIZADO   ##################
// ##################################   DEL DOM   ##############################
// #############################################################################

// #############################################################################
// ####################   RENDERIZADO DE SELECTOR DE PAGINAS   #################
// #############################################################################

// arregalr el formato de actualizacion de los valores de agarrado del site
// o comabiar el formato para modificar la forma en la ue se reciben los valores
// del contexto.
const pageSelector = () => {
  let wrapper = createDOMElement('div', { class: 'page-selector-display' })

  // declaración de variable global
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
  pageInput.value = 1
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
// #################   RENDERIZADO POR FILTRADO   ##############################
// #############################################################################

const filterAndDisplay = () => {
  // función que llama a la funcion de filtrado y después renderiza los assets
  // en caso de que haya, caso contrario renderiza un mensaje al usuario
  let matchedIds = filter()
  console.log(`Las id de los NFTs que matchean tú busqueda son: ${matchedIds.join(', ')}`)
  if (matchedIds.length > 0) {
    idsToRender = matchedIds
    // makeCenterContainer()
    currentPage = 1
    displayPage()
  } else {
    display.innerHTML = ''
    display.append(createDOMElement('p', null, 'There are no matching NFTs for your query'))
  }
}

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
// #############################################################################
// ##################   FUNCIONES DE EVENTOS   #################################
// #############################################################################
// #############################################################################

const changePage = (page) => {
  console.log(page)
  if (page === 'prev' && currentPage > 1) {
    console.log('first')
    currentPage--
  } else if (page === 'next' && currentPage < Math.ceil(idsToRender.length / 20)) {
    console.log('second')
    currentPage++
  } else if (!isNaN(Number(page))) {
    console.log('third')
    currentPage = Number(page)
  }
  displayPage()
}


const dropdownMenu = (element) => {
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
  if (!filterIsEmpty()) {
    if (idsToRender.length === SMALL_METADATA.length) { globalPage = currentPage }
    filterAndDisplay()
  }
  else {
    resetIdsToRender()
    displayPage()
  }
  makeCenterContainer()
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
// #####################   LÓGICA DE PÁGINAS   #################################
// #############################################################################

const resetIdsToRender = () => {
  currentPage = globalPage
  idsToRender = []
  SMALL_METADATA.forEach(item => { idsToRender.push(item.id) })
}

// #############################################################################
// #############################################################################
// ############  BLOQUE DE EJECUCIÓN  ##########################################
// #############################################################################
// #############################################################################

// #########   VARIABLES GLOBALES   #########

var user = {
  name: '',
  loggedIn: false,
  likedNFTs: []
}
var currentPage = 1
var globalPage = currentPage
var idsToRender = []
resetIdsToRender()

const userDisplay = document.getElementById('user-display')
const selectorSidebar = document.getElementById('asset-selector')
const userBtn = document.getElementById('user')
const display = document.getElementById('display')
const pageSelectorContainer = document.getElementById('page-selector-container')
// variable declarada acá para hacerla global, declarada inicialmente en
// page selector en línea 332, utilizada para el renderizado de la cantidad de
// paginas en la funcion makeCenterContainer
var centerContainer

// ##########   EJECUCIÓN DEL RENDERIZADO INICIAL   ##########
for (part in ATTRIBUTES) {
  selectorSidebar.append(attribSelector(part, ATTRIBUTES[part]))
}

userBtn.addEventListener('click', function() { userClick() })
pageSelectorContainer.append(pageSelector())
displayPage()
