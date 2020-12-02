var express = require('express');
var router = express.Router();

var cors = require('cors');

/* GET home page. */
router.get('/', cors(), function (req, res, next) {
    res.render('index', {title: 'Prueba poker'});
});


/* GET home page. */
router.get('/ping', cors(), function (req, res, next) {
    let result = {
        ping : 'pong'
    }
    res.send(result);
});

module.exports = router;
