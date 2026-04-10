"use strict";
const router = require("express").Router();
const {
  list,
  create,
  read,
  update,
  deleting,
} = require("../controllers/token.controller"); //! BURADA FARKLI OLARAK DESTRUCTONG YAPTIK.
router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deleteToken);
module.exports = router;

//* "DELETE can not be called on an identifier in strict mode." hatasını aldığım için; delete ------------> deleteToken yapalım.
