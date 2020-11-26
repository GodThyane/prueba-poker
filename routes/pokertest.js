var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if(req.body.listRi == undefined || req.body.listRi.length == 0){
        let result = {
            message: 'Lista no ingresada'
        }
        res.send(result);
    }else{
        let listRi = req.body.listRi;
        for (let i = 0; i < listRi.length; i++) {
            listRi[i] = listRi[i].toFixed(5)
        }
        let pruebaPoker = new PruebaPoker(listRi);
        let isOk = false;
        if (pruebaPoker.chi2 > pruebaPoker.sum) {
            isOk = true;
        }
        let result = {
            isOk,
            sum: pruebaPoker.sum,
            chi2 : pruebaPoker.chi2,
            results: pruebaPoker.typePoker
        }
        res.send(result);
    }


});

class PruebaPoker {

    chi2 = 12.59159

    typePoker = {

        D: {
            Oi: 0,
            Prob: 0.3024,
            Ei: 0,
            Chi2: 0
        },
        O: {
            Oi: 0,
            Prob: 0.5040,
            Ei: 0,
            Chi2: 0
        },
        T: {
            Oi: 0,
            Prob: 0.1080,
            Ei: 0,
            Chi2: 0
        },
        K: {
            Oi: 0,
            Prob: 0.0720,
            Ei: 0,
            Chi2: 0
        },
        F: {
            Oi: 0,
            Prob: 0.0090,
            Ei: 0,
            Chi2: 0
        },
        P: {
            Oi: 0,
            Prob: 0.0045,
            Ei: 0,
            Chi2: 0
        },
        Q: {
            Oi: 0,
            Prob: 0.0001,
            Ei: 0,
            Chi2: 0
        }

    };

    constructor(listRi) {

        this.listRi = listRi;
        this.n = listRi.length;
        this.fillOi();
        this.fillEi();
        this.sum = 0;
        this.fillResult();

    }

    fillOi() {
        for (let i = 0; i < this.n; i++) {
            let listCount = "";
            for (let j = 0; j <= 9; j++) {
                listCount += ((this.listRi[i].toString().split(".")[1].match(new RegExp(j.toString(), "g")) || []).length);
            }
            if ((listCount.match(/5/g) || []).length == 1) {
                this.typePoker.Q.Oi += 1;
            } else if ((listCount.match(/4/g) || []).length == 1) {
                this.typePoker.P.Oi += 1;
            } else if ((listCount.match(/3/g) || []).length == 1 && (listCount.match(/2/g) || []).length == 1) {
                this.typePoker.F.Oi += 1;
            } else if ((listCount.match(/3/g) || []).length == 1) {
                this.typePoker.K.Oi += 1;
            } else if ((listCount.match(/2/g) || []).length == 2) {
                this.typePoker.T.Oi += 1;
            } else if ((listCount.match(/2/g) || []).length == 1) {
                this.typePoker.O.Oi += 1;
            } else {
                this.typePoker.D.Oi += 1;
            }
        }
    }

    fillEi() {
        this.typePoker.D.Ei = this.typePoker.D.Prob * this.n;
        this.typePoker.O.Ei = this.typePoker.O.Prob * this.n;
        this.typePoker.T.Ei = this.typePoker.T.Prob * this.n;
        this.typePoker.K.Ei = this.typePoker.K.Prob * this.n;
        this.typePoker.F.Ei = this.typePoker.F.Prob * this.n;
        this.typePoker.P.Ei = this.typePoker.P.Prob * this.n;
        this.typePoker.Q.Ei = this.typePoker.Q.Prob * this.n;
    }

    fillResult() {
        this.sum += this.typePoker.D.Chi2 = (Math.pow(this.typePoker.D.Ei - this.typePoker.D.Oi, 2)) / this.typePoker.D.Ei;
        this.sum += this.typePoker.O.Chi2 = (Math.pow(this.typePoker.O.Ei - this.typePoker.O.Oi, 2)) / this.typePoker.O.Ei;
        this.sum += this.typePoker.T.Chi2 = (Math.pow(this.typePoker.T.Ei - this.typePoker.T.Oi, 2)) / this.typePoker.T.Ei;
        this.sum += this.typePoker.K.Chi2 = (Math.pow(this.typePoker.K.Ei - this.typePoker.K.Oi, 2)) / this.typePoker.K.Ei;
        this.sum += this.typePoker.F.Chi2 = (Math.pow(this.typePoker.F.Ei - this.typePoker.F.Oi, 2)) / this.typePoker.F.Ei;
        this.sum += this.typePoker.P.Chi2 = (Math.pow(this.typePoker.P.Ei - this.typePoker.P.Oi, 2)) / this.typePoker.P.Ei;
        this.sum += this.typePoker.Q.Chi2 = (Math.pow(this.typePoker.Q.Ei - this.typePoker.Q.Oi, 2)) / this.typePoker.Q.Ei;

    }
}


module.exports = router;
