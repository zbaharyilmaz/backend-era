"use strict";

const router = require("express").Router();

const todoController = require("../controllers/todo.controller");

//!List
router.get("/todos", todoController.list);
//& CRUD
//!create(201)
router.post("/todos", todoController.create);
//! Read(200)
router.get("/todos/:id", todoController.read);
//!Update(202)
router.put("/todos/:id", todoController.update);
//! Delete(204) (204 reponse döndürmez.)
router.delete("/todos/:id", todoController.delete);
module.exports = router;
