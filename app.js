var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var pokerRouter = require('./routes/pokertest');
var mediaRouter = require('./routes/mediatest');
var cMediosRouter = require('./routes/cuadradosmedios');
var generateRandomRouter = require('./routes/generaterandom');
var normalizeRouter = require('./routes/normalize');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', cors(),indexRouter);
app.use('/pokertest', cors(), pokerRouter);
app.use('/mediatest',cors(), mediaRouter);
app.use('/cuadradosmedios', cors(),cMediosRouter);
app.use('/generaterandom', cors(),generateRandomRouter);
app.use('/normalize', cors(),normalizeRouter);

module.exports = app;
