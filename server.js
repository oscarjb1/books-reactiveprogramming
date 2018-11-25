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
var fs = require('fs')
var http = require('http')
var https = require('https')

function startServer() {

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

  let connectString = configuration.mongodb.development.connectionString
  mongoose.connect(connectString, opts, function(err){
     if (err) throw err;
     console.log("==> Conexión establecida con MongoDB");
  })

  app.use('*', require('cors')());

  app.use('/public', express.static(__dirname + '/public'))
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json({limit:'10mb'}))

  if(process.env.NODE_ENV !== 'production'){
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))
  }

  app.use(vhost('api.*', api));
  app.use(vhost('minitwitterapi.reactiveprogramming.io', api));

  app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, 'index.html'))
  });

  https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    passphrase: '1234'
  }, app).listen(configuration.server.port, () => {
    console.log(`Example app listening on port ${configuration.server.port}!`)
  });


  http.createServer(function (req, res) {
    res.writeHead(301, {
      "Location": "https://" + req.headers['host'] + req.url })
    res.end()
  }).listen(80);
}

if(require.main === module){
    startServer();
} else {
    module.exports = startServer;
}
