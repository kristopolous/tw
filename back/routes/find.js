var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('base', { page: 'find', title: 'Find something' });
});

module.exports = router;

