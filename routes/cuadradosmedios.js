var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    if (req.body.semilla == undefined) {
        let result = {
            message: 'Semilla no ingresada'
        }
        res.send(result);
    } else {
        let size;
        let semilla = Number.parseInt(req.body.semilla);
        if (req.body.size == undefined) {
            size = semilla.toString().length;
        } else {
            size = Number.parseInt(req.body.size);
        }
        let cd = new Cuadradosmedios(semilla, size);
        cd.simulate();

        let datas = [];
        let result = {};

        for (let i in cd.results) {
            var item = cd.results[i];
            datas.push({
                "xi": item.xi,
                "xi2": item.x2,
                "Extensión": item.extension,
                "Extracción": item.extraction,
                "Ri": item.ri
            });
        }
        result.datas = datas;
        res.send(result);
    }
});


module.exports = router;

class Cuadradosmedios {

    constructor(semilla, n) {

        this.semilla = Number.parseInt(semilla);
        this.n = n;
        this.results = [];

    }

    simulate() {
        let finish = false;
        let nRepeat = 0;
        while (!finish) {
            if (this.results.length == 0) {
                this.results.push(new Result(this.semilla, this.n));
            } else {
                this.results.push(new Result(this.results.slice(-1)[0].extraction, this.n));
                nRepeat = this.ifExist(this.results.slice(-1)[0].xi)
                if (nRepeat != null) {
                    finish = true;
                }
            }
        }
        this.results.splice(nRepeat, this.results.length - nRepeat)
        this.results.pop();
    }

    ifExist(resultComp) {
        let count = 0;
        let posRepeat = 0;
        for (const result of this.results) {
            if (count != 1) {
                posRepeat++;
            }
            if (result.xi == resultComp) {
                count++;
            }
            if (count == 2) {
                return posRepeat;
            }
        }

        return null;
    }

}


class Result {

    constructor(xi, n) {
        this.xi = xi;
        this.x2 = Math.pow(xi, 2);
        this.n2 = n * 2;
        this.n3 = n / 2;
        this.extension = this.x2.toString().length;
        this.extraction = Number.parseInt(this.extract(n));
        this.ri = this.extraction / (Math.pow(10, n));
    }

    extract(n) {
        let ext = this.x2.toString();
        if (this.extension == (this.n2)) {
            return ext.substring(n - this.n3, n + this.n3);
        } else {
            return this.fillNum(ext).substring(n - this.n3, n + this.n3);
        }
    }

    fillNum(ext) {
        let substr = this.n2 - this.extension;
        for (let i = 0; i < substr; i++) {
            ext = "0" + ext;
        }
        return ext;
    }

}
