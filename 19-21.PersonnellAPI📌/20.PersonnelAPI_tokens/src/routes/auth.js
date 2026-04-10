"use strict";
const router = require("express").Router();
const { login, logout } = require("../controllers/auth.controller");
router.post("/login", login);
router.all("/logout", logout);
module.exports = router;
