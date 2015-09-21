var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('base', { page: 'index', title: 'Introducing two words'} );
});

router.get('/jobs', function(req, res, next) {
  res.render('base', { page: 'jobs', title: 'Introducing two words'} );
});
router.get('/legal', function(req, res, next) {
  res.render('base', { page: 'legal', title: 'Introducing two words'} );
});
router.get('/contact', function(req, res, next) {
  res.render('base', { footer_class:'fixed', page: 'contact', title: 'Introducing two words'} );
});
router.get('/pro', function(req, res, next) {
  res.render('base', { page: 'pro', title: 'The Enterprise Goes Warp Speed'} );
});

module.exports = router;
