"use strict";

require('dotenv').config({ path: '.env'});

const express = require('express');
const app = express();

const logger = require('morgan');
const path = require('path');

/*
 * router import
 */
const mainRouter = require("./routes/main");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express)

// app.use('/views/script', express.static(__dirname +'/views/script'))
// app.use('/views/css', express.static(__dirname +'/views/css'))
// app.use('/views/section', express.static(__dirname +'/views/section'))

app.use('/public', express.static(__dirname +'/public'));



app.use(logger('dev'));

app.use('/', mainRouter);









// ERROR 잘못된 경로
app.use(function(req, res, next) {
    res.status(404).send('404: Not Found!');
});
  
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('500: Something broke!')
});


module.exports = app;