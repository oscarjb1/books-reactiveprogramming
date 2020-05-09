var mongoose = require('mongoose')
var configuration = require('./serverConfig')
const connectString = configuration.mongodb.connectionString

var opts = {
  appname: "Mini Twitter",
  poolSize: 10,
  autoIndex: false,
  bufferMaxEntries: 0,
  loggerLevel: "error", //error / warn / info / debug
  keepAlive: 120,
  validateOptions: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(connectString, opts, function (err) {
  if (err) throw err;
  console.log("==> Conexión establecida con MongoDB");
})

// No Strict schema
var animal = new mongoose.Schema({}, { strict: false });
var animal = mongoose.model('animals', animal);

var id = new mongoose.mongo.ObjectId('59fe1cf6d24aab7d9de521a7');

animal.update({ nombre: "Gato" }, { "$push": { "followingRef": [id] } })
  .then(res => {
    console.log(res);
    console.log("OK");
  })
  .catch(err => {
    console.log("Error General", err);
  })
