var express = require('express'),
    bodyParser = require("body-parser"),
    path = require("path"),
    multer = require('multer'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash');
    
// load the environment variables
    require('dotenv').load();

var app = express(),
    views = path.join(process.cwd(), "app/public/views");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("app/public"));
app.use(express.static("app/bower_components"));
app.use(express.static("app/vendor"));
app.use(express.static("app/demo"));

app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUnitialized: true,
  cookie: {maxAge: 60000}
}));

app.use(flash());


// Configure multer
var fileUpload = false;

app.use(multer({dest: './uploads',
                rename: function (fieldname, filename) {
                  return filename+Date.now();
                },
                onFileUploadStart: function (file) {
                  console.log(file.originalname + ' is starting ...')
                },
                onFileUploadComplete: function (file) {
                  console.log(file.fieldname + 'uploaded to ' + file.path)
                  fileUpload = true;
                }
               }));




// Root
app.get('/', function(req, res) {
  var indexPath = path.join(views, "index.html");
  res.sendFile(indexPath);
});

// Patch file upload
app.post('/api/patch', function (req, res) {
  if (fileUpload) {
    console.log(req.files);
    req.flash('test', 'it worked');
    res.redirect('/test');
    //res.end("File uploaded");
  }
});

app.all('/test', function(req, res) {
  res.send(JSON.stringify(req.flash('test')));
});


// run the server
var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pure Data GUI listening at http://%s:%s', host, port);
});
