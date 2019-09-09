const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// TODO move this to .ENV
const config = {
    secrets: {
    jwt: process.env.JWT_SECRET || '911vmSecretPleaseChange',
    jwtExp: '2d'
  }
}


const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

const checkPassword = (passwordHash, password) => {
  return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
  newToken,
  checkPassword
}
