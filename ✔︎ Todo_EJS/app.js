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

require("express-async-errors");

// Accept json data:
app.use(express.json());

/* ------------------------------------------------------- */
// TEMPLATES:
// npm i ejs
app.set("view engine", "ejs"); //default folder is "./views"
app.set("views", "./public"); //new ejs folder name

/* ------------------------------------------------------- */
// ROUTERS:

app.all("/", (req, res) => {
  //res.render("index.ejs");
  //res.send('WELCOME TO TODO API')
  res.send(`<div>
                <a href="/view">To Do Template</a>
            </div>
            <div>
                <a href="/api/v1/todo">To Do API</a>
            </div>`);
});

app.use("/aoi/v1", require("./routes/todo.router"));

/* ------------------------------------------------------- */
// ErrorHandler
app.use(require("./middlewares/errorHandler"));
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
