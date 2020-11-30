var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prueba poker' });
});


/* GET home page. */
router.get('/ping', function(req, res, next) {
  res.send('pong');
});

module.exports = router;
