var express = require('express');
var router = express.Router();

// announce you've found something.
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

module.exports = router;
