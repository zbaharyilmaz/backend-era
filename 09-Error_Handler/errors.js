"use strict";
const express = require("express"); //! Express modülünü dahil ediyoruz. Express, Node.js üzerinde web uygulamaları geliştirmek için kullanılan popüler bir framework'tür. Express, HTTP sunucusu oluşturmayı ve yönetmeyi kolaylaştırır, yönlendirme (routing) sağlar, middleware desteği sunar ve birçok diğer özellik ile web uygulamalarını hızlı bir şekilde geliştirmeye olanak tanır.
const app = express(); //! Express uygulaması oluşturuyoruz. Bu, Express framework'ünün temelini oluşturur ve web sunucusunu yönetmek için kullanılır. app değişkeni, Express uygulamasını temsil eder ve bu değişken üzerinden yönlendirme, middleware ekleme ve diğer işlemleri gerçekleştirebiliriz.
require("dotenv").config(); //! .env dosyasındaki çevresel değişkenleri yükler. Bu, uygulamanın yapılandırmasını kolaylaştırır ve hassas bilgileri (örneğin, veritabanı bağlantı bilgileri, API anahtarları) koddan ayrı tutarak güvenliği artırır. .env dosyası genellikle projenin kök dizininde bulunur ve anahtar-değer çiftleri içerir. Bu komut, bu değişkenleri process.env nesnesine yükler, böylece uygulama içinde bu değişkenlere erişebiliriz.
const PORT = process.env?.PORT || 8000; //! Uygulamanın çalışacağı port numarasını belirler. process.env.PORT ifadesi, .env dosyasındaki PORT değişkenini okumaya çalışır.

//& 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑
// hata yönetimi için try-catch blokları kullanılır. Try bloğu içinde hata oluşturabilecek kodlar yer alır, catch bloğu ise bu hataları yakalar ve yönetir. Bu yöntem, uygulamanın çökmesini önler ve hataların düzgün bir şekilde ele alınmasını sağlar.

app.get("/user/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      // res.send("id must be a number")
      throw new Error("id must be a number");
    } else {
      res.send("id is a number");
    }
  } catch (error) {
    console.log(error);
    res.send("There is an error: " + error.message);
    res.status(400).send("There is an error: " + error.message);
  }
});

app.get("/", (req, res) => {
  throw new Error("There is an error", { cause: "This is the cause of the error" });
});

//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

// 4 parametresi olan bir middleware. Görevi: hata yakalamak. En sonda çağrılır.
// normalde html formatında gelen hatayı, istediğimiz gibi json formatında göndermek için kullanılır. Hata yönetimi için özel bir middleware'dir. Express, hata oluştuğunda bu middleware'i otomatik olarak çağırır ve hatayı parametre olarak geçirir. Bu sayede, uygulama genelinde tutarlı bir hata yönetimi stratejisi oluşturabiliriz.

const errorHandler = (err, req, res, next) => {
  console.log(err, "Error Handler is working");
  res.send({
    error: true,
    message: err.message,
    cause: err.cause,
    stack: err.stack, //! Hata yığını, hatanın nerede oluştuğunu gösterir. Geliştirme aşamasında faydalıdır, ancak üretim ortamında güvenlik nedeniyle genellikle gizlenir.
    status: err.status || 500,
  });
};
app.use(errorHandler); //! APP.USE() app.use() Express uygulamasına middleware veya router eklemek için kullanılır.

//& 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  CATCH AND ERROR HANDLER 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

app.get("/user/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      // res.send("id must be a number")
      throw new Error("id must be a number");
    } else {
      res.send("id is a number");
    }
  } catch (error) {
    next(error); //error handler middleware'ine yönlendiriyoruz.
  }
});

//* 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  ASYNC FONK 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// sistem kilitlenir.
// hata vermesi muhtemel kodlar ayrı bir async func a yazılır.
//Kullanılan bir töntem değil.

const asyncFunction = async () => {
  //* Hata vermesi muhtemel kodlar ayrı bir async func'a yazılır.
  throw new Error("ASYNC ERROR");
};

app.get("/async", async (req, res, next) => {
  // async fonksion hatasını errorHandler'a göndermek için catch(next) kullanılır.
  await asyncFunction().catch(next);
});

//& 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  EXPRESS ASYNC ERRORS MODULE 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

// express-async-errors modülünü dahil ettik. Bu modül, async fonksiyonlarda hata yakalamak için kullanılır.

// require("express-async-errors");

// app.get("/async", async (req, res, next) => {
//   throw new Error("Async Error");
// });

// const errorHandler = (err, req, res, next) => {
//     console.log(err, "Error Handler is working");
//     res.status(500).send({
//       error: true,
//       message: err.message,
//       cause: err.cause,
//       stack: err.stack,
//       status: err.status || 500,
//     });
//   };
//   app.use(errorHandler);

app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
