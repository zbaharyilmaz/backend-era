"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//! Parse data
app.use(express.json()); //app.use middleware çalıştırmak çin kullanılır. express.json() ise gelen isteklerdeki JSON verilerini otomatik olarak ayrıştırır ve req.body'ye atar.

//! Cath async errors
require("express-async-errors");

/*---------------------------------------------*/

//! DB Connection
// const dbConnection = require('./src/dbConnection');
// dbConnection(); YERİNE:
require("./src/dbConnection")(); // require ile import ettiğimiz dbConnection fonksiyonunu hemen çağırarak veritabanı bağlantısını başlatıyoruz. //!  () KULLAN.

//! Main Route:
app.all("/", (req, res) => res.send("Welcome to Blog API"));

//! Blog Route
app.use(require("./src/routes/blog.router"));

//! Error Handler:
app.use(require("./src/middlewares/errorHandler"));

/*---------------------------------------------*/

app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
