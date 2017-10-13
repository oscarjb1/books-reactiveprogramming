var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var compiler = webpack(config)
// var mongoose = require('mongoose')
// var configuration = require('./config')
// var vhost = require('vhost')
// var api = require('./server/api')

// var opts = {
//     server: {
//         socketOptions: {keepAlive: 1}
//     }
// };
//
// switch (app.get('env')) {
//     case 'development':
//         mongoose.connect(configuration.mongodb.development.connectionString, opts);
//         break;
//     case 'production':
//         mongoose.connect(configuration.mongodb.production.connectionString, opts);
//         break;
//     default:
//         throw new Error('Unknown execution environment: ' + app.get('env'));
// }


// app.use('*', require('cors')());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'10mb'}));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));


// app.use(vhost('api.*', api));

// app.get('/bundle.js', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/bundle.js'));
// });
//
// app.get('/styles.css', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/resources/styles.css'));
// });

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
