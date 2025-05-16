"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
 $ npm i express dotenv express-async-errors
 $ npm i sequelize
 $ npm i sqlite3
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

require('express-async-errors');

// Accept json data:
app.use(express.json());
/* ------------------------------------------------------- */
// Templates:
// https://ejs.co/
// https://expressjs.com/en/guide/using-template-engines.html
// $ npm i ejs
app.set('view engine', 'ejs'); // Default folder is: ./views
app.set('views', './public'); // new ejs folder name 


/* ------------------------------------------------------- */
// ROUTERS:

app.all('/', (req, res) => {

    // To run html pages, need to use render('filename')
    // res.render('index.ejs');
    // res.render('index');

    res.send(`
    <div><a href="/view">Todo Template</a></div>
    <div><a href="/api/v1/todos">Todo API</a></div>
    `)
});


app.use('/api/v1', require('./routes/todo.router.api'));
app.use('/view', require('./routes/todo.router.view'));

/* ------------------------------------------------------- */
// ErrorHandler
app.use(require('./middlewares/errorHandler'));
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));