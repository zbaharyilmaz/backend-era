"use strict";
//* Call Models
const { BlogCategory, BlogPost } = require("../models/blog.model");
module.exports = {
  list: async (req, res) => {
    const result = await BlogCategory.find();

    res.status(200).send({
      error: false, //success:true da olur.
      result,
    });
  },
  create: async (req, res) => {
    const result = await BlogCategory.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
   // const result = await BlogCategory.findOne({ _id: req.params.id });
   const result= await BlogCategory.findById(req.params.id)
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req,res)=>{
    const result= await BlogCategory.updateOne()
    res.status(202).send({
      error:false,
      result
    })
  }

  //   delete: async (req, res) => {
  //     const result = await BlogCategory;

  //     res.status(200).send({
  //       error: false,
  //       result,
  //     });
  //   },
};
