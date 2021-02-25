var express = require('express');
var path = require('path');
const logic = require('./models/controlador')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var pokerRouter = require('./routes/pokertest');
var mediaRouter = require('./routes/mediatest');
var cMediosRouter = require('./routes/cuadradosmedios');
var generateRandomRouter = require('./routes/generaterandom');
var uniformRouter = require('./routes/uniform');

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '500mb', extended: true}));
app.use(express.urlencoded({limit: '500mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', cors(),indexRouter);
app.use('/pokertest', cors(), pokerRouter);
app.use('/mediatest',cors(), mediaRouter);
app.use('/cuadradosmedios', cors(),cMediosRouter);
app.use('/generaterandom', cors(),generateRandomRouter);
app.use('/uniform', cors(),uniformRouter);
app.post('/GnormalStd', cors() ,logic.generateNormalStdNumbers)
app.post('/Pchi2', cors(), logic.testingChi2)
app.post('/Pvarianza', cors(), logic.testingVarianza)

module.exports = app;
