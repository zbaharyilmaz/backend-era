"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

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
module.exports = morgan(customLog, {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a' })
});