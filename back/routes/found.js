var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('base', { page: 'post', title: 'title'} );
});

// announce you've found something.
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

module.exports = router;
