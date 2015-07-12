var express = require('express'),
    bodyParser = require("body-parser"),
    path = require("path");

var app = express();

app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static("app/public"));
app.use(express.static("app/bower_components"));

var views = path.join(process.cwd(), "app/public/views");

app.get('/', function(req, res) {
  var homePath = path.join(views, "index.html");
  res.sendFile(homePath);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pure Data GUI listening at http://%s:%s', host, port);
});
