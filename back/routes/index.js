var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('base', { page: 'index', title: 'Introducing two words'} );
});

router.get('/pro', function(req, res, next) {
  res.render('base', { page: 'pro', title: 'The Enterprise Goes Warp Speed'} );
});

module.exports = router;
