"use strict"
// gelen isteklerin dağıtıldığı yer.
const router=require("express").Router()
const blogCategory= require("../controllers/blog.controller")

router.route("/blogs").get(blogCategory.list)

module.exports= router;
