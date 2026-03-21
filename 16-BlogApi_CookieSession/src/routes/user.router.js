"use strict";
const router = require("express").Router();
const user = require("../controllers/user.controller");
router
  .route("/")
  .get(user.list) //! GET=> list
  .post(user.create); //! POST=> create
router
  .route("/:id")
  .get(user.read) //! GET=> read
  .put(user.update) //! PUT=> update
  .patch(user.update)
  .delete(user.delete); //! DELETE=> delete
// router.route("/login").post(user.login) yerinne; tek bir route olduğu için:
router.post("/login", user.login);
router.all("/logout", user.logout);
module.exports = router;
