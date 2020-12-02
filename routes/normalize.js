var express = require('express');
var router = express.Router();

router.post('/',function (req, res, next) {
    if (req.body.ri == undefined) {
        let result = {
            message: 'ri no ingresada'
        }
        res.send(result);
    } else {
        let ri = req.body.ri;
        let max = req.body.max;
        let min = req.body.min;
        let result = [];
        for (let i = 0; i < ri.length; i++) {
            result.push(min+(max-min)*ri[i]);
        }
        res.send(result);
    }
});


module.exports = router;
