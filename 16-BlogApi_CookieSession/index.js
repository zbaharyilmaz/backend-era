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
//! Cookie-Session Middleware
//npm i cookie-session
const session = require("cookie-session");
app.use(
  session({
    name: "blogSession",
    secret: process.env.PASS_SALT,
    maxAge: 1000 * 60 * 60 * 24 * 3, //session süresini belirleme opsiyonu. böylelikle cookie ye dönecektir.  //! SESSION => COOKIE
    // 1000 msec=1 sec |||| 1000 * 60 * 60 * 24 = 1 day
  }),
);
app.all("/", (req, res) => {
  console.log(req.session);
  res.send({
    message: "Welcome",
    session: req.session,
    isLogin: !!req.session?._id
  });
});

//! Blog Route
app.use("/blogs", require("./src/routes/blog.router"));
//! User Route
app.use("/users", require("./src/routes/user.router"));

//! Error Handler:
app.use(require("./src/middlewares/errorHandler"));

/*---------------------------------------------*/

app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
