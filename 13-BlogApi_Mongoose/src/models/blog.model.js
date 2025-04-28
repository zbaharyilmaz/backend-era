"use strict";
const mongoose = require("mongoose");
//*blogCategories
const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "blogCategories",
  }
);
module.exports = mongoose.model("BlogCategory", blogCategorySchema);
//* blogPosts
const blogPost = new mongoose.Schema(
  {
    categoryId: {
      //! default relation: ManytoOne
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory", //!ilişkisi old model ismini referans ver.
      required: true,
      unique: true, //!convert relation to OnetoOne.
    },
    title: {},
    content: {},
  },
  {
    collection: "blogPosts",
    timestamps: true,
  }
);
