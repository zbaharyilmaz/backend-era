"use strict";
//* Call Models
const { BlogCategory, BlogPost } = require("../models/blog.model");
/* ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ */
//Todo BlogCategory Controller
module.exports.blogCategory = {
  list: async (req, res) => {
    const result = await res.getModelList(BlogCategory);


    res.status(200).send({
      error: false, //success:true da olur.
      details: await res.getModelListDetails(BlogCategory),
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
    const result = await BlogCategory.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    // const result = await BlogCategory.updateOne({...filter}, {...data}, {...?options})
    // const result = await BlogCategory.findOneAndUpdate({...filter}, {...data}, {...?options}) //*bu yöntem ile yeni datayı altta bir başka kod girmeden getiriyoruz.

    //! response from updateOne : {
    // "acknowledged": true, // if update methods ends successfuly.
    // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
    // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
    // "upsertedCount": 0, // Since nothing was inserted, no new ID.
    // "matchedCount": 1 // number of data matches with our filter.
    // }

    // const result = await BlogCategory.updateOne({ _id: req.params.id }, req.body);
    // const result = await BlogCategory.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    const result = await BlogCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(202).send({
      error: false,
      result,
      //new: await BlogCategory.findById(req.params.id)
    });
  },

  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.id });

    if (result?.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found or it is already deleted.");
    }
  },
};

/* ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ ⭐️ */
//Todo BlogPost Controller
module.exports.blogPost = {
  list: async (req, res) => {
    const result = await res.getModelList(BlogPost, ["categoryId", "userId"]);

    res.status(200).send({
      error: false, //success:true da olur.
      details: await res.getModelListDetails(BlogPost),
      result,
    });
  },
  create: async (req, res) => {
    const result = await BlogPost.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    // const result = await BlogPost.findOne({ _id: req.params.id });
    const result = await BlogPost.findById(req.params.id, {
      title: 1,
      content: 1,
      categoryId: true,
    });
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    // const result = await BlogPost.updateOne({...filter}, {...data}, {...?options})
    // const result = await BlogPost.findOneAndUpdate({...filter}, {...data}, {...?options}) //*bu yöntem ile yeni datayı altta bir başka kod girmeden getiriyoruz.

    //! response from updateOne : {
    // "acknowledged": true, // if update methods ends successfuly.
    // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
    // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
    // "upsertedCount": 0, // Since nothing was inserted, no new ID.
    // "matchedCount": 1 // number of data matches with our filter.
    // }

    // const result = await BlogPost.updateOne({ _id: req.params.id }, req.body);
    // const result = await BlogPost.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    const result = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(202).send({
      error: false,
      result,
      //new: await BlogPost.findById(req.params.id)
    });
  },

  delete: async (req, res) => {
    const result = await BlogPost.deleteOne({ _id: req.params.id });

    if (result?.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found or it is already deleted.");
    }
  },
};
