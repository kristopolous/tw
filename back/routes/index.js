var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('base', { page: 'index', opts: {title: 'title'} });
});

router.get('/pro', function(req, res, next) {
  res.render('pro');
});

module.exports = router;
