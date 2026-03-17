"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router();
const blogCategory = require('../controllers/blog.controller');
/* ------------------------------------------------------- */
// URL: /blogs ->
//!  CRUD operations are written in the controller.js and HTML methods are written in the route.js
router.route("/blogs")
    .get(blogCategory.list)   //! GET=> list
    .post(blogCategory.create); //! POST=> create
router.route("/blogs/:id")
.get(blogCategory.read)  //! GET=> read
.put(blogCategory.update) //! PUT=> update
.delete.(blogCategory.delete) //! DELETE=> delete
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