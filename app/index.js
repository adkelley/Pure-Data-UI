var express = require('express'),
    bodyParser = require("body-parser"),
    path = require("path"),
    multer = require('multer'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    loginHelper = require('./helpers/login.js'),
    registerHelper = require('./helpers/register.js');
    
// load the environment variables
    require('dotenv').load();

var db = require('./models');
var views = path.join(process.cwd(), "app/views");

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("app/public"));
app.use(express.static("app/bower_components"));
app.use(express.static("app/vendor"));
app.use(express.static("app/demo"));
app.use(express.static("app/models"));

app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  store: new mongoStore({mongooseConnection:db.mongoose.connection}),
  resave: false,
  saveUnitialized: true,
  cookie: {maxAge: 60000}
}));

app.use(loginHelper);
//app.use(flash());


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
  var indexPath = path.join(views, 'index');
  res.render(indexPath);
  //res.sendFile(indexPath);
});

// Register
// get is handled by a modal

app.post("/users", function(req, res) {
  var newUser = req.body.user;
  console.log("post()", "/users", newUser);

  if (registerHelper.validateEmail(newUser.email) &&
      registerHelper.validatePassword(newUser.password, newUser.password_confirmation)) {
    db.User
      .createSecure(newUser, function (err, user) {
        if (user) {
          //res.send(user);
          res.redirect("/");
        } else {
          console.log("createSecure() failed");
          // flash message???
          res.redirect("/");
        }
      });
  } else {
    console.log("validateEmail() or validatePassword() failed");
    res.redirect("/register_error");
  }

});

// Patch file upload
app.post('/api/patch', function (req, res) {
  if (fileUpload) {
    console.log(req.files);
    //req.flash('test', 'it worked');
    // res.redirect('/test');
    //res.end("File uploaded");
    res.redirect('/');
  }
});

// Flash test
// app.all('/testflash', function(req, res) {
//   res.send(JSON.stringify(req.flash('test')));
// });


// run the server
var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pure Data GUI listening at http://%s:%s', host, port);
});
