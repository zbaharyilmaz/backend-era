"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
//&Middlewares
app.use(express.json());
require("express-async-errors");
require("./src/configs/dbConnection");
//*Session-Cookies
const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);
//!Query Handler
app.use(require("./src/middlewares/queryHandler"));

//Routes
app.all("/", (req, res) => {
  res.send({
    message: "Welcome to Personnel Api",
  });
});
app.use("/departments", require("./src/routes/department"));
app.use("/personnels", require("./src/routes/personnel"));
app.use("/tokens", require("./src/routes/token"));
app.use("/auth", require("./src/routes/auth"));
app.use("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "This route can not found",
  });
});
//Todo Error Handler
app.use(require("./src/middlewares/errorHandler"));
//Run Server
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
//?Syncronization
//require("./src/helpers/sync")()
