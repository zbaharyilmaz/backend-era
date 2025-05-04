"use strict";
const mongoose = require("mongoose");
//*blogCategories
const blogCategorySchema = new mongoose.Schema(  //iki parametre var. options ve collection
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
const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);
//* blogPosts
const blogPostSchema = new mongoose.Schema(
  {
    categoryId: {
      //! default relation: ManytoOne
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory", //!ilişkisi old model ismini referans ver.
      required: true,
      unique: true, //!convert relation to OnetoOne.
    },
    userId: {
      //! default relation: ManytoOne
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //!ilişkisi old model ismini referans ver.
      required: true,
      unique: true, //!convert relation to OnetoOne.
    },

    title: {
      type: String,
      trim:true,
      required:true,
    },
    content: {
      type:String,
      trim:true,
      required:true,
    },
    published:{
      type: Boolean,
      default:true,
      
    }
  },
  {
    collection: "blogPosts",
    timestamps: true,
  }
);
const BlogPost= mongoose.model("BlogPost",blogPostSchema)
module.exports= {BlogCategory, BlogPost}
