
// #########   VARIABLES GLOBALES   #########

var user = {
  name: '',
  loggedIn: false,
  likedNFTs: []
}
var currentPage = 1
var globalPage = currentPage
var idsToRender = []


// variable declarada de forma global; asignada en la función makeCenterContainer
// al contenedor del selector de las páginas
var centerContainer

const userDisplay = document.getElementById('user-display')
const selectorSidebar = document.getElementById('asset-selector')
const userBtn = document.getElementById('user')
const display = document.getElementById('display')
const pageSelectorContainer = document.getElementById('page-selector-container')
const attribDisplay = document.getElementById('attrib-display')

async function init() {
  await assignAttributes()
  await assignSmallMeta()
  console.log('init', ATTRIBUTES)
  resetIdsToRender()
  renderAttribs()
  displayPage()
}


init()

userBtn.addEventListener('click', function() { userClick() })
pageSelectorContainer.append(pageSelector())
