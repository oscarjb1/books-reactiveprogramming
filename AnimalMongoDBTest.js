var mongoose = require('mongoose')
var configuration = require('./config')
const connectString = configuration.mongodb.development.connectionString

var opts = {
    appname: "AnimalMongoDBTest",
    poolSize: 10,
    autoIndex: false,
    bufferMaxEntries: 0,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500,
    autoReconnect: true,
    loggerLevel: "error", //error / warn / info / debug
    keepAlive: 120,
    validateOptions: true,
    useNewUrlParser: true
}

mongoose.connect(connectString, opts, function(err){
   if (err) throw err;
   console.log("==> Conexión establecida con MongoDB");
})

// No Strict schema
var animal = new mongoose.Schema({}, { strict: false });
var animal = mongoose.model('animals', animal);

// var animal = new Animal({ realName: "Super Man" });



var id = new mongoose.mongo.ObjectId('59fe1cf6d24aab7d9de521a7');

animal.update({nombre:"Gato"},{ "$push": { "followingRef": [id] } })
  .then(res => {
    console.log(res);
    console.log("OK");
  })
  .catch(err => {
    console.log("Error General", err);
  })

// animal.save()
