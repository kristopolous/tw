var express = require('express');
var router = express.Router();


// oauth 
router.post('/new', function(req, res, next) {
 
});

router.post('/login', function(req, res, next) {
});

router.post('/logout', function(req, res, next) {
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
