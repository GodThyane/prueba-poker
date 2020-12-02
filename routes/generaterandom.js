var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (req.body.n == undefined) {
        let result = {
            message: 'n no ingresada'
        }
        res.send(result);
    } else {
        let n = req.body.n;
        let result = [];
        for (let i = 0; i < n; i++) {
            result.push(Math.random());
        }
        res.send(result);
    }
});


module.exports = router;