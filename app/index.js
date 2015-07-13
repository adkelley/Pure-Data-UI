var express = require('express'),
    bodyParser = require("body-parser"),
    path = require("path"),
    multer = require('multer');

var app = express();

app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static("app/public"));
app.use(express.static("app/bower_components"));
app.use(express.static("app/vendor"));

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

var views = path.join(process.cwd(), "app/public/views");



// Root
app.get('/', function(req, res) {
  var indexPath = path.join(views, "index.html");
  res.sendFile(indexPath);
});

// Patch file upload
app.get('/patch/import', function(req, res) {
  var uploadPath = path.join(views, "_upload.html");
  res.sendFile(uploadPath);
});

app.post('/api/patch', function (req, res) {
  if (fileUpload) {
    console.log(req.files);
    res.end("File uploaded");
  }
});


// run the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pure Data GUI listening at http://%s:%s', host, port);
});
