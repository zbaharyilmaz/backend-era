"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */

// Middlewares:
app.use(express.json())
require('express-async-errors')

// Session-Cookies
const session = require('cookie-session');

app.use(session({
    secret: process.env.SECRET_KEY,
}));

// Query Handler:
app.use(require('./src/middlewares/queryHandler'));

// DB connection
require("./src/configs/dbConnection");

// Authentication
app.use(require('./src/middlewares/authentication'));

// Logger
app.use(require('./src/middlewares/logger'));

// DOCUMENTATION:
// $ npm i swagger-autogen # JSON Creator // https://swagger-autogen.github.io/docs/
// $ npm i swagger-ui-express // https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/
// $ npm i redoc-express // https://www.npmjs.com/package/redoc-express


// Json
app.use('/documents/json', (req, res) => {
    res.sendFile('/src/configs/swagger.json', { root: '.' })
});

// Swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./src/configs/swagger.json');
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }));

// Redoc
const redoc = require('redoc-express');
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title: 'Redoc UI' }));


// logger
/* ------------------------------------------------------- *
// Logger
// npm i morgan
// https://expressjs.com/en/resources/middleware/morgan.html

const morgan = require('morgan');

// app.use(morgan('tiny')); // default is console.log('...')
// app.use(morgan('short'));
// app.use(morgan('dev'));
// app.use(morgan('common'));
// app.use(morgan('combined'));

// Custom log:
// app.use(morgan("TIME=':date[iso]' - URL=':url' - METHOD=':method' - IP=':remote-addr' - STATUS=':status' - SIGN=:user-agent' - (:response-time[digist] ms)"))

const customLog = "TIME=':date[iso]' - URL=':url' - METHOD=':method' - IP=':remote-addr' - STATUS=':status' - SIGN=:user-agent' - (:response-time[digist] ms)"
const fs = require('node:fs');
const now = new Date()
// console.log(now);
const today = now.toISOString().split('T')[0]
// console.log(today);
app.use(morgan(customLog, {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a' })
}));
/* ------------------------------------------------------- */


// Routes:
app.all('/', (req, res) => {

    res.send({
        message: 'WELCOME TO PERSONNEL API',
    })
})

// Departments Route
app.use("/departments", require("./src/routes/department"))

// Personnnel Route
app.use("/personnels", require("./src/routes/personnel"))

// Token Route
app.use("/tokens", require('./src/routes/token'))

// Auth Route
app.use('/auth', require('./src/routes/auth'));

app.use("*", (req, res) => {
    res.status(404).send({
        error: true,
        message: "This route not found"
    })
});

// Error Handler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
//! Syncronization : Run it only once.
// require('./src/helpers/sync')()
