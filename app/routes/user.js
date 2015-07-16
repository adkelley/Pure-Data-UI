var express = require('express'),
    db = require('../models'),
    multer = require('multer'),
    md5 = require('MD5'),
    path = require('path'),
    router = express.Router(),
    views = path.join(process.cwd(), 'app/views');

// Configure multer for uploading files
// var fileUpload = false;
// router.use(multer({dest: './uploads',
//                 rename: function (fieldname, filename) {
//                   return filename+Date.now();
//                 },
//                 onFileUploadStart: function (file) {
//                   console.log(file.originalname + ' is starting ...')
//                 },
//                 onFileUploadComplete: function (file) {
//                   console.log(file.fieldname + 'uploaded to ' + file.path)
//                   fileUpload = true;
//                 }
//                }));

router.use(function (req, res, next) {
  var userId = req.session.userId;
  db.User.
    findOne({
      _id: userId
    }, function(err, user) {
         res.locals.user = user;
         next();
    });
});

router.get('/register', function(req, res){
  res.render(path.join(views, 'register'), {
    flash: {
      danger: req.flash('error')
    }
  });
});

router.post('/users', function(req, res) {
  var newUser = req.body.user;
  db.User.
    createSecure(newUser, function(err, user) {
      if (user) {
        req.login(user);
        req.flash('success', 'User ' + user.email + " successfully registered");
        res.redirect("/profile");  // show profile page
      } else {
        req.flash('error', err);
        res.redirect('/register');
      }
    });
});

router.get('/profile', function(req, res) {
  req.currentUser(function(err, user) {
    if (user) {
      res.render(path.join(views,'profile'), {
        flash: {
          success: req.flash('success')
        },
        userName: user.username,
        userEmail: user.email,
        userHash: md5(user.email.toLowerCase())
      });
    } else {
      req.flash('error', 'You must be logged in to see your profile');
      res.redirect('/login');
    }
  });
});

router.get('/login', function(req, res) {
  res.render(path.join(views,'login'), {
    flash: {
      danger: req.flash('error')
    }
  })
});

router.post('/login', function(req, res) {
  var user = req.body.user;
  
  db.User.authenticate(user,
     function(err, user) {
       if (!err) {
         req.login(user);
         req.flash('success', 'User ' + user.email + ' successfully logged in');
         res.redirect('/profile');
       } else {
         req.flash('error', err);
         res.redirect('/login');
       }
     });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/patch', function(req, res) {
  res.render(path.join(views,'patch'), {
    flash: {
      danger: req.flash('error')
    }
  })
});

// router.get('/canvas', function(req, res) {
//   res.render(path.join(views,'canvas'), {
//     flash: {
//       danger: req.flash('error')
//     }
//   })
// });

/*
router.get('/import', function(req, res){
  res.render(path.join(views, 'import'), {
    flash: {
      danger: req.flash('error')
    }
  });
});

// Patch file upload
router.post('/import', function (req, res) {
  if (fileUpload) {
    var files = req.files;
    res.render(path.join(views, 'canvas'), {
      flash: {
        success: ('File: ' + files.filename + ' successfully uploaded')
      }
    })
  } else {
    req.flash('error', 'Something bad happened during file upload. Please try again');
    res.redirect('/import');
  }
});

*/
module.exports = router;
