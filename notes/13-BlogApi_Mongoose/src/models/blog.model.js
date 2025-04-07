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
mongoose.model("BlogCategory", blogCategorySchema)









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
