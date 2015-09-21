var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('base', { page: 'found', title: 'found something', type: 'user' } );
});
router.get('/campaign', function(req, res, next) {
  res.render('base', { page: 'campaign_post', title: 'found something', type: 'user' } );
});

module.exports = router;
