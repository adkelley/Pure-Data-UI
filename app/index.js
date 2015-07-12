var express = require('express'),
    bodyParser = require("body-parser"),
    path = require("path");

var app = express();

app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static("app/public"));
app.use(express.static("app/bower_components"));

var views = path.join(process.cwd(), "app/views");

app.get('/', function(req, res) {
  var homePath = path.join(views, "newtest.html");
  res.sendFile(homePath);
});

app.get('#new', function(req, res) {
  res.send("Got the new request");
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pure Data GUI listening at http://%s:%s', host, port);
});
