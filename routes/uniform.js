var express = require('express');
var router = express.Router();

//Petición POST que recibe la lista de Ri
router.post('/',function (req, res, next) {
    if (req.body.ri == undefined) {
        let result = {
            message: 'ri no ingresada'
        }
        res.send(result);
    } else {
        let ri = req.body.ri;
        let max = Number.parseInt(req.body.max);
        let min = Number.parseInt(req.body.min);
        let ni = [];

        //Aplica la fórmula de distribución normal, y la agrega a la lista ni.
        for (let i = 0; i < ri.length; i++) {
            ni.push(min+(max-min)*ri[i]);
        }
        res.send(ni);
    }
});


module.exports = router;
