"use strict";
const express = require("express");
const app = express();
require("express-async-errors");
require("dotenv").config();
const PORT = process.env?.PORT || 8000;


//&Accept json data
app.use(express.json());

//& Router
app.all("/", (req, res) => {
  res.send("WELCOME TO TODO API");
});

app.use(require("./routes/todo.router"));

app.use(require("./middlewares/errorHandler"));

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
