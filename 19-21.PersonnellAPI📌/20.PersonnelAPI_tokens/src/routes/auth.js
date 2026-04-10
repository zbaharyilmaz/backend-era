"use strict";
const router = require("express").Router();
const { login, logout } = require("../controllers/auth.controller");
router.post("/login", login); ///login: Kullanıcıyı sisteme giriş yaptıran POST rotası.

router.all("/logout", logout); ///logout: Kullanıcıyı çıkış yaptıran herhangi bir HTTP isteği alan rota.
module.exports = router;
/* 
! router.all metodu, belirtilen rotaya herhangi bir HTTP isteği geldiğinde (GET, POST, PUT, DELETE vb.) çalışacak olan bir middleware fonksiyonu tanımlar. Burada, /logout rotasına herhangi bir HTTP isteği geldiğinde logout fonksiyonu çalışır. Bu fonksiyon, kullanıcının oturumunu kapatma işlemini yapar. */
