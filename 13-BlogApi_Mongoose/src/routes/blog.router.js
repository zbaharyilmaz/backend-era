"use strict"
// gelen isteklerin dağıtıldığı yer.
const router=require("express").Router()
const blogCategory= require("../controllers/blog.controller")

router.route("/blogs")
.get(blogCategory.list)
.post(blogCategory.create) //create conttroller ı çalışacak.

router.route("/blogs/:id")
.get(blogCategory.read)

module.exports= router;
