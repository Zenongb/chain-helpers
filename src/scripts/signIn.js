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
