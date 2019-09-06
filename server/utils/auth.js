const jwt = require('jsonwebtoken');
const config = {
    secrets: {
    // jwt: process.env.JWT_SECRET,
    jwt: '911vmSecretPleaseChange',
    jwtExp: '2d'
  }
}


const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

module.exports = {
  newToken
}
