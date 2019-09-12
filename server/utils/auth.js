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

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

module.exports = {
  newToken,
  checkPassword,
  verifyToken,
}
