var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var pokerRouter = require('./routes/pokertest');
var mediaRouter = require('./routes/mediatest');
var cMediosRouter = require('./routes/cuadradosmedios');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pokertest', pokerRouter);
app.use('/mediatest', mediaRouter);
app.use('/cuadradosmedios', cMediosRouter);

module.exports = app;
