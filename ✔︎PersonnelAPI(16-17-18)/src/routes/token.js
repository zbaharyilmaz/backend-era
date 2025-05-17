"use strict";
const router = require("express").Router();
const {isAdmin}= require("../middlewares/permissions")
const {list, create, read, update, deletee } = require("../controllers/token");
router.use(isAdmin)
router.route("/").get(list).post(create);
router
  .route("/:id")
  .get(read)
  .put(update)
  .patch(update)
  .delete(deletee)
module.exports = router;
//! delete strict modda sıkıntı yaptı. deletee olarak değişiklik yaptık. özel bir keyword. ya da deleteToken vs kullan.