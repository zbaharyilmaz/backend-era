"use strict";
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
require("./src/configs/dbConnection")();
app.use(require("./src/middlewares/queryHandler"));
const session = require("cookie-session");
app.use(
  session({
    secret: process.env.PASS_SALT,
    // maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days in miliSeconds // now this is a cookie.
  }),
);
app.all("/", (req, res) => {
  res.send({
    message: "Welcome PersonnelAPI",
  });
});
app.use("/departments", require("./src/routes/department.router"));
app.use("/personnels", require("./src/routes/personnel.router"));
app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: "Not found",
  });
});
//! app.all("*" kullanımı: * artık eski Express tarzı ve path-to-regexp 6.x ile uyumsuz. Bu yüzden hatayı tetikliyor.
/*------------------------------------------------------- */
app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
//! Syncronization : Run it only once.
//require("./src/utils/sync")();
