const fs = require('fs')
const process = require('process')
const BASE_DIR = process.cwd()
const metadata = JSON.parse(fs.readFileSync(`${BASE_DIR}/assets/metadata/_metadata.json`))

let attribs = {
  Head: [],
  Body: [],
  Eyes: [],
  Mouth: [],
  Background: []
}

metadata.forEach((asset) => {
  asset.attributes.forEach((inst) => {
    // if trait in layer
    if (attribs[inst.trait_type].indexOf(inst.value) == -1) {
      attribs[inst.trait_type].push(inst.value)
    }
  });
});

for (let trait in attribs) {
  console.log(`-- ${trait}`)
  for (let val of attribs[trait]) {
    console.log(` -  ${val}`)
  }
  console.log('\n')
}
fs.writeFileSync(`${BASE_DIR}/json/attributes.json`, JSON.stringify(attribs, null, 2))
fs.writeFileSync(`${BASE_DIR}/json/attributes.min.json`, JSON.stringify(attribs, null, 0))
