"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//* Middlewares are functions having 3 parameters.

app.get("/", (req, res, next) => {
  console.log("Middleware is working");
  next(); // Middleware'den sonraki route'a geçiş yapar. last command of middleware
  //* res.send("This is from middleware. Do you see it?")  // after next can not use any other function.
});

app.get("/", (req, res, next) => {
  req.message1 = "Hello from middleware";

  next();
});
app.get("/", (req, res, next) => {
  req.message2 = "Hello from middleware 2";
  next();
});
app.get("/", (req, res, next) => {
  req.message3 = "Hello from middleware 3";
  next();
});
// app.get("/", (req, res, next) => {

//   res.send({
//     message1: req.message1,
//     message2: req.message2,
//     message3: req.message3,
//   })
// });

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


const {middleware1, middleware2}= require("./middlewares/index.js"); // import middlewares
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
