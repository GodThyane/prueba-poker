var express = require('express');
var router = express.Router();


//Petición POST que recibe una lista de Ri
router.post('/',function (req, res, next) {

    if (req.body.listRi == undefined || req.body.listRi.length == 0) {
        let result = {
            message: 'Lista no ingresada'
        }
        res.send(result);
    } else {
        let listRi = req.body.listRi;

        //Se truncan los números a 5 dígitos
        for (let i = 0; i < listRi.length; i++) {
            listRi[i] = Number.parseFloat(listRi[i]).toFixed(5)
        }
        let pruebaMedios = new PruebaMedios(listRi);

        //Se hace el esquema que se va a mostrar al usuario
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


    //Valor de Z dado una aceptación de 95 %
    z = 1.96

    constructor(listRi) {


        //Longitud de la lista
        this.n = listRi.length;
        this.listRi = listRi;

        //Promedio
        this.media = this.getMedia();

        //Límite inferior
        this.li = (1 / 2) - (this.z * (1 / Math.sqrt(12 * this.n)));

        //Límite superior
        this.ls = (1 / 2) + (this.z * (1 / Math.sqrt(12 * this.n)));

        // Boolean que es true si la media está entre los límites
        this.isOk = this.media <= this.ls && this.media >= this.li;

    }

    //Método que devuelve el promedio de la lista de ri
    getMedia() {
        let sum = 0;
        for (const ri of this.listRi) {
            sum += Number.parseFloat(ri);
        }
        return (sum / this.n);
    }

};

module.exports = router;
