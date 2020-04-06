var jwt = require('jsonwebtoken')
var configuration = require('../../serverConfig')

const generateToken = (user) => {
  var u = {
   username: user.username,
   id: user.id
  }
  return token = jwt.sign(u, configuration.jwt.secret, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  })
}

module.exports = {
  generateToken
}
