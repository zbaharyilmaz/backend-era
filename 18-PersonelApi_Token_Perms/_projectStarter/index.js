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
}))

// Query Handler:
app.use(require('./src/middlewares/queryHandler'))

require("./src/configs/dbConnection")




/* ------------------------------------------------------- */
// Routes:
app.all('/', (req, res) => {

    res.send({
        message: 'WELCOME TO PERSONNEL API',
    })
})

// Departments Route
app.use("/departments",require("./src/routes/department"))

// Personnnel Route
app.use("/personnels",require("./src/routes/personnel"))

app.use("*", (req,res)=>{
res.status(404).send({
    error:true,
    message:"This route not found"
})
})





// Error Handler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
//! Syncronization : Run it only once.
// require('./src/helpers/sync')()
