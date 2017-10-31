var express = require('express');
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'10mb'}));

app.get('/:name/:lastname', function (req, res) {
    const name = req.params.name
    const lastname = req.params.lastname
    res.send("Hello world GET => " + name + ' ' + lastname);
});

app.get('*', function (req, res) {
    const name = req.query.name
    const lastname = req.query.lastname
    res.send("Hello world GET => " + name + ' ' + lastname);
});


app.post('/login', function (req, res) {
    const body = req.body
    res.send(body);
});

app.post('*', function (req, res) {
    res.send("Hello world POST");
});

app.put('*', function (req, res) {
    res.send("Hello world PUT");
});

app.delete('*', function (req, res) {
    res.send("Hello world DELETE");
});

app.listen(8181, function () {
  console.log('Example app listening on port 8181!');
});

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    console.log("headersSent ==>");
    return next(err)
  }
  console.log("NO headersSent ==>");
  res.status(500)
  res.send({
    ok: false,
    message: 'Error interno del servidor, Revice los parámetros envíados'
  })
})
