"use strict";
// gelen isteklerin dağıtıldığı yer.
const router = require("express").Router();
const {blogCategory, blogPost }= require("../controllers/blog.controller");
// ️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ *
//Todo BlogCategory
router.route("/category").get(blogCategory.list).post(blogCategory.create); //create conttroller ı çalışacak.

router.route("/category/:id").get(blogCategory.read).put(blogCategory.update)
.delete(blogCategory.delete);
// patch(blogCategory.update)
// ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ 
//Todo BlogPost
router.route("/post").get(blogPost.list).post(blogPost.create); //create conttroller ı çalışacak.

router.route("/post/:id").get(blogPost.read).put(blogPost.update)
.delete(blogPost.delete);
module.exports = router;
