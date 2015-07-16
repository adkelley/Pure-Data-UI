var express = require('express'),
    db = require('../models'),
    path = require('path'),
    multer = require('multer'),
    router = express.Router(),
    views = path.join(process.cwd(), 'app/views');

// Configure multer for uploading files
var fileUpload = false;
router.use(multer({dest: './uploads',
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


module.exports = router;
