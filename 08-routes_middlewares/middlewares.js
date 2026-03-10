"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//! Note: Objeye property eklemek

// const obj = {name: "aslı"};
// obj.surname = "sarı"; // objeye yeni bir özellik ekledik.

//? string literal: "hello"
//? number literal: 10
//? boolean literal: true
//? object literal: {}
//? array literal: []

//* Middlewares are functions having 3 parameters.
// How to send data data from one middleware to another middleware or route?

app.get("/", (req, res, next) => {
  console.log("Middleware is working");
  next(); // Middleware'den sonraki route'a geçiş yapar. last command of middleware
  //* res.send("This is from middleware. Do you see it?")  // after next can not use any other function.
});

app.get("/", (req, res, next) => {
  req.message1 = "Hello from middleware"; //! req bir object. bknz clg(req). req objesine yeni bir property ekledik. Bu property'ye diğer middleware'lerde veya route'larda erişebiliriz.

  next(); // last command. Middleware'den sonraki route'a veya middleware'e geçiş yapar. last command of middleware(go to next middleware or route)
});
app.get("/", (req, res, next) => {
  req.message2 = "Hello from middleware 2";
  next();
});
app.get("/", (req, res, next) => {
  req.message3 = "Hello from middleware 3";
  next();
});
//! Her middleware aynı req objesi üzerinde çalışır.
// Burada önemli bir konsept var.

// req: Express Request Object

// ve bu normal bir JavaScript objectidir.

// Bu yüzden yeni property eklenebilir.

//    Son hali: req = {...message1: "Hello from middleware"}

//! son çalışacak şey: route handler. yani res.send() fonksiyonu. bu yüzden en sona yazdık.
app.get("/", (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
    message3: req.message3,
  });
});

//* SUM:
// GET /
//middleware1 (console.log)
// middleware2 (req.message1)
// middleware3 (req.message2)
// middleware4 (req.message3)
// route handler
// response

//& Functional Middlewares
// bunları middleware dosyasına taşıdık.
//* Call functional middlewares
//? app.use(middleware1);
// app.use(middleware2);
//&  or app.use(middleware1, middleware2)
//* app.use(middleware1, middleware2); // Middleware'leri kullanmak için app.use() fonksiyonunu kullanıyoruz.
//or app.use("/api, [middleware1, middleware2]) runs only "/api" route and GET method
//or  app.get("/api", middleware1, middleware2, (req, res)=>{
//   res.send({
//         messageFn1: req.messageFn1,
//         messageFn2: req.messageFn2,
//         message5: "the end",
//       })
//      })

const { middleware1, middleware2 } = require("./middlewares/index.js"); // import middlewares
const { response } = require("express");
app.use(middleware1, middleware2); // Middleware'leri kullanmak için app.use() fonksiyonunu kullanıyoruz.
app.get("/api", (req, res, next) => {
  res.send({
    messageFn1: req.messageFn1,
    messageFn2: req.messageFn2,
    message5: "the end",
  });
});

/* Listen */
app.listen(PORT, () => console.log("Running at: http://127.0.0.1:" + PORT)); // Server başlatılıyor:
