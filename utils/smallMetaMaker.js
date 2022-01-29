const fs = require('fs')
const process = require('process')
const BASE_DIR = process.cwd()
const META = JSON.parse(fs.readFileSync(`${BASE_DIR}/assets/metadata/_metadata.json`))

let smallMeta = []

META.forEach((inst) => {
  let smallInst = {
    id: inst.edition,
    attribs: {
      Head: '',
      Body: '',
      Mouth: '',
      Eyes: '',
      Background: ''
    }
  }
  for (attrib in smallInst.attribs) {
    let trait = inst.attributes.find(a => a.trait_type === attrib)
    smallInst.attribs[attrib] = trait.value
  }
  smallMeta.push(smallInst)
});

fs.writeFileSync(`${BASE_DIR}/json/smallMeta.min.json`, JSON.stringify(smallMeta, null, 0))
fs.writeFileSync(`${BASE_DIR}/json/smallMeta.json`, JSON.stringify(smallMeta, null, 2))
