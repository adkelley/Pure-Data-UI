var express = require('express'),
    path = require('path'),
    router = express.Router();

router.use('/', require('./user'));

router.get('/', function(req, res) {
  var views = path.join(process.cwd(), 'app/views');
  res.render(path.join(views,'home'), {
    flash: {
      info: req.flash('info')
    }
  });
});
  
router.get('/about', function(req, res) {
  res.send('Learn more about this app');
});

module.exports = router;
