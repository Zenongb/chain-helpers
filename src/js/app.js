// #############################################################################
// #############################################################################
// ##################   FUNCIONES DE EVENTOS   #################################
// #############################################################################
// #############################################################################

const changePage = (page) => {
  if (page === 'prev' && currentPage > 1) {
    currentPage--
  } else if (page === 'next' && currentPage < Math.ceil(idsToRender.length / 20)) {
    currentPage++
  } else if (!isNaN(Number(page))) {
    currentPage = Number(page)
  }
  displayPage()
  makeCenterContainer()
}


const dropdownMenu = (element) => {
  element.style.display = element.style.display === 'none' ? 'block' : 'none'
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
  console.log(element.value)
  let bool = typeof element.checked === 'boolean' ? element.checked : false
  showToast(capitalize(element.value), bool)
  modifyFilter(element.value, bool)
  if (bool) {
    attribDisplay.append(selectedAttrib(element.value))
  } else {
    document.getElementById(`selected-${element.value}`).remove()
    document.getElementById(element.value).checked = false
  }
  if (!filterIsEmpty()) {
    globalPage = idsToRender.length === SMALL_METADATA.length ? currentPage : globalPage
    filterAndDisplay()
  }
  else {
    resetIdsToRender()
    displayPage()
  }
  makeCenterContainer()
}

const filterAndDisplay = () => {
  // función que llama a la funcion de filtrado y después renderiza los assets
  // en caso de que haya, caso contrario renderiza un mensaje al usuario
  let matchedIds = filter()
  console.log(`Las id de los NFTs que matchean tú busqueda son: ${matchedIds.join(', ')}`)
  if (matchedIds.length > 0) {
    idsToRender = matchedIds
    currentPage = 1
    displayPage()
  } else {
    display.innerHTML = ''
    display.append(createDOMElement('p', null, 'There are no matching NFTs for your query'))
  }
}

const capitalize = (str) =>
  str.replace('-', ' ').replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

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
        hasThem = FILTER[part].indexOf(asset.attribs[part]) >= 0
        if (!hasThem) { break }
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
    empty = FILTER[part].length === 0
    if (!empty) { break }
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
// #####################   IMPLEMENTACION DE TOASTIFY   ########################
// #############################################################################

const showToast = (attrib, add) => {
  let text = add ? `Added ${attrib} to filter` : `Removed ${attrib} of filter`
  Toastify({
    text: text,
    duration: 1500,
    gravity: "top",
    position: 'center'
  }).showToast()
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
