var mongoose = require('mongoose')
var configuration = require('./config')
var Profile = require('./api/models/Profile')
var bcrypt = require('bcrypt')

var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
}
mongoose.connect(configuration.mongodb.development.connectionString, opts)

const newProfile = new Profile({
  name: "Usuario de prueba",
  userName: "test",
  password: bcrypt.hashSync('1234', 10)
})

Profile.findOne({username: 'test'}, function(err, queryUser){
  if(queryUser !== null){
    console.log("====> El usuario de prueba ya ha sido registrado")
    process.exit()
  }
})

newProfile.save(function(err){
  if(err){
    console.log("====> Error al crear el usuario de prueba",err)
    process.exit()
    return
  }
  console.log("====> Usuario de prueba creado correctamente")
  process.exit()
})
