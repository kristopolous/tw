var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('base', { footer_class: 'fixed', page: 'book', title: 'Book a service'} );
});

module.exports = router;
