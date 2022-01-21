

const signIn = () => {
  let user = ''
  do {
    user = prompt('Nombre de usuario')
  } while (user === '')

  let verified = true
  do {
    if (!verified) { alert('Hubo un error en la verificación, volvé a intentar') }
    let password = prompt('Ingresa tu contrasenia, \nla contrasenia debe tener por lo menos 8 caracteres \ny por lo menos una letra mayúscula y una minúscula')
    let password2 = prompt('Volve a ingresar contrasenia, recordá que: \nla contrasenia debe tener por lo menos 8 caracteres \ny por lo menos una letra mayúscula y una minúscula')
    verified = verifyPassword(password, password2)
  } while (!verified)
  alert(`Usuario y contrasenia verificadas. Hola ${user}`)
}

const verifyPassword = (pass1, pass2) => {
  if (pass1.length < 8) { console.log('length'); return false }
  else if (pass1 !== pass2) { console.log('unequal'); return false }

  let lowerCase = false
  let upperCase = false
  console.log(pass1.split(''))
  for (l of pass1.split('')) {
    if (l === l.toUpperCase()) { console.log('has uppercase'); upperCase = true }
    else if (l === l.toLowerCase()) { console.log('has lowercase'); lowerCase = true }
  }

  if (lowerCase && upperCase) { console.log('veerified'); return true }
  else { console.log('unverified'); return false }
}

signIn()
