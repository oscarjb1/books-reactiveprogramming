var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var compiler = webpack(config)
var mongoose = require('mongoose')
var configuration = require('./config')
var vhost = require('vhost')
var api = require('./api/api')

var opts = {
    appname: "Mini Twitter",
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

// let connectString = app.get('env')==='production' ?
//   configuration.mongodb.production.connectionString :
//   configuration.mongodb.development.connectionString

let connectString = configuration.mongodb.development.connectionString
mongoose.connect(connectString, opts, function(err){
   if (err) throw err;
   console.log("==> Conexión establecida con MongoDB");
})

app.use('*', require('cors')());

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

app.use(vhost('api.*', api));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(configuration.server.port, function () {
  console.log('Example app listening on port 8080!')
});
