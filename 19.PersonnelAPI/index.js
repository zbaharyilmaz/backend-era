"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
require("./src/configs/dbConnection")();
const session = require("cookie-session");
app.use(
  session({
    secret: process.env.PASS_SALT,
    // maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days in miliSeconds // now this is a cookie.
  }),
);
app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
