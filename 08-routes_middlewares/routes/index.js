"use strict";

/* Routes */
const express = require("express"); //express modülünü projemize dahil eder. express, Node.js için popüler bir web framework'üdür ve web uygulamaları geliştirmek için kullanılır.
const router = express.Router(); //Express içinden router ı çıkar .Burada router adında bir mini uygulama tanımlıyoruz. Bu mini uygulama, dışarıdan gelen istekleri karşılayacak.
router
  .route("/")
  .get((req, res) => res.send({ method: "GET" }))
  .post((req, res) => res.send({ method: "POST" }))
  .put((req, res) => res.send({ method: "PUT" }));

module.exports = router;
