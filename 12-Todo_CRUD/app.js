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
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
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
//&create
router.post("/todos", async (req, res) => {
  const resultTodo = await Todo.create(req.body); // create metodu tabloya yeni bir kayıt ekler. create metodu async bir işlemdir, bu yüzden await ile bekliyoruz. create metodu, oluşturulan kaydı döner. req.body ile frontend den gelen veriyi alıyoruz. req.body deki verinin yapısı modeldeki yapıya uygun olmalıdır. Modeldeki alanlar: title, description, priority, isDone. req.body de bu alanların olması gerekir.
  /*   {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    isDone: req.body.isDone,
  } */
  res.status(201).send({
    error: false,
    message: "Todo created successfully",
    data: resultTodo,
  });
});
//&list
router.get("/todos", async (req, res) => {
  // SELECT * FROM todos;
  const resultTodo = await Todo.findAll(); // findAll metodu tabloya kayıtlı tüm verileri döner. findAll metodu async bir işlemdir, bu yüzden await ile bekliyoruz.
  res.status(200).send({
    error: false,
    data: resultTodo,
  });
});
//&read
router.get("/todos/:id", async (req, res) => {
  const resultTodo = await Todo.findOne({
    //!findByPK(req.params.id) de kullanılabilir. findByPK, primary key e göre arama yapar. id alanı primary key olduğu için findByPK de kullanılabilir.
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send({
    error: false,
    data: resultTodo,
  });
});
//&update
router.put("/todos/:id", async (req, res) => {
  // await Todo.update({...newData}, {...where})
  const resultTodo = await Todo.update(req.body, {
    where: {
      id: req.params.id,
    },
  }); //returns [1] or [0]  //req.body → istemciden gelen yeni veri (örn. { title: "yeni başlık", completed: true })
  // where: { id: req.params.id } → hangi kaydı güncelleyeceğini belirtiyor

  // İstek → PUT /todos/42  →  req.params.id = "42" →  WHERE id = 42 → O kaydı güncelle  //!yani // Yani SQL'de: WHERE id = 42 demek.
  // router.put("/todos/:herhangiBirSey", ...) req.params.herhangiBirSey  // ← o da bu olurdu

  res.status(202).send({
    error: false,
    data: resultTodo,
    newData: await Todo.findByPk(req.params.id), // güncellenmiş veriyi döndermek için findByPk ile tekrar arama yapıyoruz. update metodu, güncellenen kayıt sayısını döner. Bu yüzden yeni veriyi döndermek için tekrar arama yapmamız gerekiyor.
  });
});

//&delete
router.delete("/todos/:id", async (req, res) => {
  const result = await Todo.destroy({
    where: {
      id: req.params.id,
    },
  }); //returns 1 or 0
  /*  res.status(204).send({         //204 → No Content: İstek başarılı oldu ama döndürülecek veri yok. Bu yüzden data alanını boş bırakıyoruz.
    error:false,
    result,
  }) */
  if (result) {
    res.sendStatus(204);
  } else {
    /* else{
  res.status(404).send({        
    error:true,
    message:"Todo not found or already deleted.",
  })
 } bunun yerine error handler a yönlendirelim. 404 hatası için özel bir durum var. Eğer result 0 ise, yani silinecek kayıt bulunamadıysa, 404 hatası döndürelim. Eğer result 1 ise, yani kayıt başarıyla silindiyse, 204 No Content döndürelim.*/
    res.errorStatusCode = 404;
    throw new Error("Todo not found or already deleted."); // error handler a yönlendirmek için hata fırlatıyoruz. res.errorStatusCode ile hata durumunda döndürülecek status code u belirliyoruz. error handler da bu değeri kullanarak uygun status code u döndüreceğiz.
  }
});

//! İNCELE: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
app.use(router); // router ı app e bağladık. app.use ile router ı kullanmaya başladık. Artık router içindeki route işlemleri çalışır hale geldi.

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥  🔥
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
