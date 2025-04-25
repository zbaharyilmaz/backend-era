"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json());

app.all("/", (req, res) => {
  res.send("WELCOME TO TODO API");
});

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//&     MODELS      MODELS    MODELS     MODELS      MODELS      MODELS      MODELS
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//Data yapısı bu modele göre olacak. Bir tablo ve modeli.

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + process.env.SQLITE); //* kullacağım veritabanı: kullanacağım dosya yolu

const Todo = sequelize.define("todos", {
  //? 🔥 🔥 🔥 🔥 ilk sutun olarak ID tanımlaması yapmanıza gerek yok. sequelize otomatik tanımlar ve yönetir. Createdat ve updatedat de id gibi sequelize otomatik tanımlar ve yönetir.
  /* id: {
    type: DataTypes.INTEGER,
    allowNull: false, //& default:true(kayıt alanı boş olabilir)
    unique: true, //& default: false
    comment: "description",
    primaryKey: true, // & default: false
    autoIncrement: true, //&  default: false(her yeni kayıtta otomatik +1 eklensin mi?)
    field: "customName",
    defaultValue: "default", //& data gönderilmediğinde varsayılan olarak ne yazılsın?
  }, */
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING, //tek parametre varsa, kısayol.

  // LOW:-1 NORMAL:0, HIGH:1
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    default: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
  createdAt: false,
  updatedAt: false,
});

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

//* SYNCRONIZATION

//& sync 1  defa çalıştırıldıktan sonra yoruma alınması gerekmektedir.
// sequelize.sync()  // create table(tablo yoksa oluşturur)
//! sequelize.sync({force: true}) // mevcutu sil, yeniden oluştur. tabloyu tamamen siliyor. Datayı siliyor.
sequelize.sync({ alter: true }); // önce backup & drop & create(data kaybı yaşamayız) //! GÜVENLİ YOL.

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

//* CONNECT TO DB

sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected"));

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked.");
  res.status(errorStatusCode).send({
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  });
};
app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
