var mongoose = require('mongoose')
var configuration = require('./config')
var bcrypt = require('bcryptjs')

var opts = {
  keepAlive: 1,
  useNewUrlParser: true
}
mongoose.connect(configuration.mongodb.development.connectionString, opts)


var profile = new mongoose.Schema({}, { strict: false })
var Profile = mongoose.model('profiles', profile)

var tweet = new mongoose.Schema({}, { strict: false })
var Tweet = mongoose.model('tweets', tweet)

const newProfile = new Profile({
  name: "Usuario de prueba",
  userName: "test",
  password: bcrypt.hashSync('1234', 10)
})

Profile.findOne({userName: 'test'}, function(err, queryUser){
  if(queryUser !== null){
    console.log("====> El usuario de prueba ya ha sido registrado")
    process.exit()
  }
})

newProfile.save()
.then(newUser => {

  for( c = 1; c<=10; c++){
    const newTweet = new Tweet({
        _creator: newUser._id,
        message: "Tweet de prueba " + c,
    })

    newTweet.save()
    .then(savedTweet => {
      console.log("Tweet creado correctamente");
    }).catch(err => {
      console.log("Error al guardar el Tweet " + err);
    })

    if(c == 9){
      console.log("====> Usuario de prueba creado correctamente")
    }
  }
})
.catch(err => {
  console.log("====> Error al crear el usuario de prueba",err)
  process.exit()
})
