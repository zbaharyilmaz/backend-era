"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router();
const blogCategory = require('../controllers/blog.controller');
/* ------------------------------------------------------- */
// URL: /blogs ->

router.route("/blogs")
    .get(blogCategory.list)
    .post(blogCategory.create);

module.exports = router;

/* 
! Route

Kullanıcı HTTP isteği yapar:

GET /blogs
POST /blogs { name: "Tech" }

Express route /blogs’i yakalar

* HTTP metoduna göre(get, post) controller fonksiyonunu çağırır

* GET → blogCategory.list

* POST → blogCategory.create

Controller → Model (BlogCategory) ile veri tabanına erişir

Controller → Response JSON olarak kullanıcıya gönderir 

*Flow

[HTTP Request]
      ↓
[Express Router] → path + method match
      ↓
[Controller] → hangi fonksiyon çalışacak
      ↓
[Model] → MongoDB ile veri okuma/yazma
      ↓
[Response] → JSON olarak client’a gönder

* Route → Controller → Model → DB → Response
*/