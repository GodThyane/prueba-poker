var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

    if (req.body.listRi == undefined || req.body.listRi.length == 0) {
        let result = {
            message: 'Lista no ingresada'
        }
        res.send(result);
    } else {
        let listRi = req.body.listRi;
        for (let i = 0; i < listRi.length; i++) {
            listRi[i] = listRi[i].toFixed(5)
        }
        let pruebaMedios = new PruebaMedios(listRi);

        let result = {
            n: pruebaMedios.n,
            media: pruebaMedios.media,
            z: pruebaMedios.z,
            limiteInferior: pruebaMedios.li,
            limiteSuperior: pruebaMedios.ls,
            isOk: pruebaMedios.isOk
        }
        res.send(result);
    }

});

class PruebaMedios {

    z = 1.96

    constructor(listRi) {

        this.n = listRi.length;
        this.listRi = listRi;
        this.media = this.getMedia();
        this.li = (1 / 2) - (this.z * (1 / Math.sqrt(12 * this.n)));
        this.ls = (1 / 2) + (this.z * (1 / Math.sqrt(12 * this.n)));
        this.isOk = this.media <= this.ls && this.media >= this.li;

    }

    getMedia() {
        let sum = 0;
        for (const ri of this.listRi) {
            sum += Number.parseFloat(ri);
        }
        return (sum / this.n);
    }

};

module.exports = router;
