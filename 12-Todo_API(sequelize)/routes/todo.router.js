"use strict";

const router = require("express").Router();
const todoController = require("../controllers/todo.controller");

//& CRUD Operations
//!List
//* router.get("/todos", todoController.list);  
// todoController bir obje ve onun içinde list adında bir method var. O methodu çağırıyoruz. O methodun içinde de veritabanından tüm todoları çekip bize döndürüyor. O dönen sonucu da response olarak kullanıcıya gönderiyoruz.
//!create(201)
//* router.post("/todos", todoController.create);
//! Read(200)
//* router.get("/todos/:id", todoController.read);
//!Update(202)
//* router.put("/todos/:id", todoController.update);
//! Delete(204) (204 response döndürmez.)
//* router.delete("/todos/:id", todoController.delete);

//DAHA KISACA BÖYLE YAZARIZ.

router.route("/todos")
.get(todoController.list)
.post(todoController.create);
router
  .route("/todos/:id")
  .get(todoController.read)
  .put(todoController.update)
  .delete(todoController.delete);
module.exports = router;
