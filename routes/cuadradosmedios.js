let express = require('express');
let router = express.Router();


//Petición POST que recibe la semilla y el valor de K
router.post('/', function (req, res, next) {

    //Valida si la semilla fue ingresada
    if (req.body.semilla === undefined) {
        let result = {
            message: 'Semilla no ingresada'
        }
        res.send(result);
    } else {

        //Se declara la semilla y el tamaño que va a tener la extracción
        let size;

        //La semilla toma el valor que llega por parámetro y la convierte a número.
        let semilla = Number.parseInt(req.body.semilla);

        //Si no se ingresa K, [size] toma el valor de la longitud de la semilla
        if (req.body.size === undefined) {
            size = semilla.toString().length;
        } else {
            size = Number.parseInt(req.body.size);
        }

        //Se instancia el objeto CuadradosMedios, el cual recibe la semilla y el tamaño
        let cd = new Cuadradosmedios(semilla, size);

        //Inicia la simulación
        cd.simulate();

        //Se crea un vector por cada columna que se va a mostrar.
        let xi = [];
        let xi2 = [];
        let extension = [];
        let extraccion = [];
        let ri = [];

        //Se recorre el vector de resultados y por cada iteración, se agrega a cada vector, el dato correspondiente
        for (let i in cd.results) {
            let item = cd.results[i];
            xi.push(item.xi);
            xi2.push(item.x2);
            extension.push(item.extension);
            extraccion.push(item.extraction);
            ri.push(item.ri);
        }

        //Se crea el esquema que va a tener el resultado
        let result = {
            xi : xi,
            xi2 : xi2,
            extension : extension,
            extraccion : extraccion,
            ri : ri
        };

        //Se manda el resultado
        res.send(result);
    }
});


module.exports = router;


//Clase que recibe una semilla y un tamaño, y genera números pseudoaleatorios y los guarda en un vector de resultados
class Cuadradosmedios {

    constructor(semilla, n) {

        this.semilla = semilla;
        this.n = n;
        this.results = [];

    }

    //Método que itera y guarda los resultados hasta que el método comience a generar números aleatorios.
    simulate() {
        let finish = false;
        let nRepeat = 0;
        while (!finish) {
            //Verifica si el vector de resultados vacíos
            if (this.results.length === 0) {
                this.results.push(new Result(this.semilla, this.n));
            } else {
                this.results.push(new Result(this.results.slice(-1)[0].extraction, this.n));
                nRepeat = this.ifExist(this.results.slice(-1)[0].xi)
                if (nRepeat != null) {
                    finish = true;
                }
            }
        }

        //Borra los resultados que no sirven(Repetidos)
        this.results.splice(nRepeat, this.results.length - nRepeat)
        this.results.pop();
    }

    //Verifica si el número ingresado ya se encuentra en el vector, y retorna la posición en el que se comienza a repetir
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


//Clase en la que se guarda una fila de resultados: xi, x2, extension, extracción y el ri
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

    //Dado el tamaño ingresado, se retorna la extracción
    extract(n) {
        let ext = this.x2.toString();

        //Verifica si el tamaño de n2 es igual a la extensión
        if (this.extension == (this.n2)) {
            return ext.substring(n - this.n3, n + this.n3);
        } else {
            return this.fillNum(ext).substring(n - this.n3, n + this.n3);
        }
    }

    //Retorna n^2 con n ceros a la izquierda.
    fillNum(ext) {
        let substr = this.n2 - this.extension;
        for (let i = 0; i < substr; i++) {
            ext = "0" + ext;
        }
        return ext;
    }

}
