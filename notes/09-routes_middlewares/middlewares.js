"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//* Middlewares are functions having 3 parameters.

app.get("/", (req, res, next) => {
  console.log("Middleware is working");
  next(); // Middleware'den sonraki route'a geçiş yapar. last command of middleware
  //* res.send("This is from middleware. Do you see it?")  // after next can not use any other function.
});

app.get("/", (req, res, next) => {
  next();
});
app.get("/", (req, res, next) => {
  next();
});
app.get("/", (req, res, next) => {
  next();
});
app.get("/", (req, res, next) => {
  res.send({
    message1: "Welcome",
    message2: "Welcome 2",
    message3: "Welcome 3",
    message4: "Welcome 4",
  });
});

// app.get("/", (req, res)=> {

//     console.log("Main route");
//     res.send({
//         message:"Welcome"
//     })
// })

/* Listen */
app.listen(PORT, () => console.log("Running at: http://127.0.0.1:" + PORT)); // Server başlatılıyor:
