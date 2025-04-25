"use strict";
const mongoose = require("mongoose");
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
 const BlogCategory= mongoose.model("BlogCategory", blogCategorySchema);

const blogPost = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
      unique: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "blogPosts",
    timestamps: true,
  }
);

const BlogPost= mongoose.model("BlogPost", BlogPostSchema);
module.exports= {BlogCategory, BlogPost}


// const { default: mongoose } = require("mongoose");

// const nameSchema = new mongoose.Schema(
//   {
//     fieldName:Number,
//     fieldName2:Boolean,
//     fieldName3:mongoose.Schema.Types.String,
//     fieldName4:{
//         type:String,
//         default:null,
//         trim:true,
//         unique:true,
//         select:false,
//         index:true,
//         required: [true, "customer error message"],
//         enum:[[1,2,3]],
//         min:5,
//         max:10,
//         validate:[()=>true, "custom error message"],
//         get:()=>{return data},
//         set:()=>{return data},

//     }
//   },

//   {
//     collection: "collectionName",
//     timestamp: true,
//   }
// );

// module.exports=mongoose.model("Model Name", nameSchema)
