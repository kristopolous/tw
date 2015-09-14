var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('base', { page: 'book', title: 'title'} );
});

module.exports = router;
