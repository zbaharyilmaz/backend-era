"use strict"
const router= require("express").Router();
const user= require("../controllers/user.controller")
router.route("/")
.get(user.list)
.post(user.create)
router.route("/:id")
.get(user.read)
.put(user.update)
.delete(user.delete);

//router.route("/login").post(user.login) yerine 1 metod old için:
router.post("/login", user.login)
router.all("/logout", user.logout)
module.exports= router;