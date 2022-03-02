var ATTRIBUTES
var SMALL_METADATA

// Objeto usado para guardar los atributos a filtrar
const FILTER = {
  Head: [],
  Body: [],
  Eyes: [],
  Mouth: [],
  Background: [],
}

const handleJsonFetch = async (link) => {
  let outputJson =
    await fetch(link)
      .then(res => res.json())
      .catch(err => console.log(err))
  return outputJson
}

const assignAttributes = async () => {
  if ('ATTRIBUTES' in localStorage) {
    ATTRIBUTES = JSON.parse(localStorage.getItem('ATTRIBUTES'))
  } else {
    ATTRIBUTES = await handleJsonFetch('json/attributes.min.json')
    localStorage.setItem('ATTRIBUTES', JSON.stringify(ATTRIBUTES))
  }
}

const assignSmallMeta = async () => {
  if ('SMALL_METADATA' in localStorage) {
    SMALL_METADATA = JSON.parse(localStorage.getItem('SMALL_METADATA'))
  } else {
    SMALL_METADATA = await handleJsonFetch('json/smallMeta.min.json')
    localStorage.setItem('SMALL_METADATA', JSON.stringify(SMALL_METADATA))
  }
}
