"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const personnel = require("../controllers/personnel")
const { isAdmin } = require('../middlewares/permissions');
/* ------------------------------------------------------- */

router.use(isAdmin);

router.route("/")
    .get(personnel.list)
    .post(personnel.create)


router.route("/:id")
    .get(personnel.read)
    .put(personnel.update)
    .patch(personnel.update)
    .delete(personnel.delete);


/* ------------------------------------------------------- */
module.exports = router