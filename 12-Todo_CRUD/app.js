"use strict";
/* -------------------------------------------------------
    EXPRESSJS - Sequelize
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

//! data typeları incele, darklı databse ler için: https://sequelize.org/docs/v7/models/data-types/
const sequelize = new Sequelize("sqlite:" + process.env.SQLITE); //* kullacağım veritabanı: kullanacağım dosya yolu. Burada sequelize instance ı oluşturduk.
// Sequelize bir veritabanı ile çalışmak zorundadır. Sen projede SQLite driver’ı kurduğun için Sequelize bu veritabanını kullanıyor.
//& SQLite nedir
// SQLite bir SQL veritabanıdır: ayrı bir server çalıştırmayan ve tek bir dosya içinde veriyi saklayan bir veritabanıdır.
//Veritabanı yönetim sistemleri(DBMS), veritabanlarını oluşturmak, yönetmek ve sorgulamak için kullanılan yazılımlardır. SQLite, diğer SQL veritabanlarından farklı olarak, sunucu tabanlı değil, dosya tabanlı bir veritabanıdır. Bu nedenle, SQLite'ı kullanmak için ayrı bir sunucu kurmanıza gerek yoktur. Ayrı bir app e bağlanmadan, yerel bir dosya ile çalışır. SQLite, küçük ve orta ölçekli uygulamalar için ideal bir veritabanıdır ve genellikle mobil uygulamalarda, gömülü sistemlerde ve masaüstü uygulamalarında kullanılır.

//ex: database.sqlite (Bütün tablolar bu dosyanın içindedir.)
//modellerin büyük harfle başlaması yaygın bir konvansiyondur. Model isimleri tekil olur. Tablo isimleri çoğul olur. Sequelize, model ismini çoğul yaparak tablo oluşturur. Model ismi: Todo -> tablo ismi: Todos
const Todo = sequelize.define("todos", {
  // define metodu sequelize modeli oluşturur. her bir model veritabanında bir tabloya tekabül eder ilk parametre tablo adı, ikinci parametre tablo yapısı.
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
  description: DataTypes.STRING, //TEK parametre varsa, kısayolda obje belitmeden direkt tip belirtilebilir.

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

//* SYNCHRONIZATION
// Model bilgilerini database e uygula. Model ile tabloyu senkronize eder. Modeldeki değişiklikleri database e uygular. Modeli database e göre oluşturur. Modeli database e göre günceller. Modeli database e göre siler ve yeniden oluşturur.
//& sync 1  defa çalıştırıldıktan sonra yoruma alınması gerekmektedir.
// sequelize.sync()  // create table(tablo yoksa oluşturur)
//! sequelize.sync({force: true}) // mevcutu sil, yeniden oluştur. tabloyu tamamen siliyor. Datayı siliyor.
// sequelize.sync({ alter: true }); // önce backup & drop & create(data kaybı yaşamayız) //! GÜVENLİ YOL. alter:değişiklik yapmak

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

//* CONNECT TO DB
// sync kapayınca DB connected gözüküyor.
sequelize
  .authenticate() // veritabanına bağlanmayı dener. Bağlanırsa resolve olur, bağlanamazsa reject olur.
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected"));

//* ROUTERS
//& CRUD: Create, Read, Update, Delete
//& CREATE: POST /todos
//& READ: GET /todos, GET /todos/:id
//& UPDATE: PUT /todos/:id
//& DELETE: DELETE /todos/:id

const router = express.Router(); // router oluşturduk. router, route işlemlerini tek bir yerde toplamak için kullanılan bir yapıdır. app e benzer ama daha küçük çaplıdır. app e benzer şekilde get, post, put, delete gibi methodları vardır.

router.post("/todos", (req, res) => {
  const resultTodo = Todo.create({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    isDone: req.body.isDone,
  });
  res.status(201).send({
    error: false,
    message: "Todo created successfully",
    data: resultTodo,
  });
});

app.use(router); // router ı app e bağladık. app.use ile router ı kullanmaya başladık. Artık router içindeki route işlemleri çalışır hale geldi.

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Frontend’e hataları JSON formatında gönderebilmek için error handler middleware tanımladık. Express’in varsayılan hata çıktısı HTML olduğu için, bunu JSON formatına dönüştürmek amacıyla custom error handler middleware kullanıyoruz.
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
