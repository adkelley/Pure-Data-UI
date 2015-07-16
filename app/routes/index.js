var express = require('express'),
    path = require('path'),
    router = express.Router();

router.use('/', require('./user'));
router.use('/patch', require('./patch'));  // Todo: figure how to route this properly

var views = path.join(process.cwd(), 'app/views');
router.get('/', function(req, res) {
  res.render(path.join(views,'home'), {
    flash: {
      info: req.flash('info')
    }
  });
});
  
router.get('/about', function(req, res) {
  res.render(path.join(views,'about'), {
    flash: {
      info: req.flash('info')
    }
  });
});

module.exports = router;
