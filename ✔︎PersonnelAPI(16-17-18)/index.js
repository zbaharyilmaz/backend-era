"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
//&Middlewares
app.use(express.json());
require("express-async-errors");
require("./src/config/dbConnection")
//*Session-Cookies
const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);
//!Query Handler
app.use(require(""));

require("");
//Routes
app.all("", (req, res) => {
  res.send({
    message: "Welcome to Personnel Api",
  });
});
app.use("/departments", require(""));
app.use("/personnel", require(""));
app.use("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "This route can not found",
  });
});
//Todo Error Handler
app.use(require(""))
//Run Server
app.listen(PORT, ()=>console.log("Running: http://127.0.0.1:"+PORT))
//?Syncronization
require("")