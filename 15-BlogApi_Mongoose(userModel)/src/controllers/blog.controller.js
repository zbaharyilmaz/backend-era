"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
//! Controller → Model üzerinden ne yapmak istediğini belirleyen fonksiyonlar (create, list, read, update, delete). Yani “modele göre create yap, modele göre list yap” gibi düşünebilirsin. Controller, HTTP isteğini alır ve modeli kullanarak veri tabanına ne yapılacağını söyler.

/* | Controller Fonksiyonu | Model ile yaptığı iş                                   |
| --------------------- | ------------------------------------------------------ |
| `list`                | `BlogCategory.find()` → tüm kategorileri getirir       |
| `create`              | `BlogCategory.create(req.body)` → yeni kategori ekler  |
| `read`                | `BlogCategory.findById(id)` → tek kategori getirir     |
| `update`              | `BlogCategory.findByIdAndUpdate(id, data)` → günceller |
| `delete`              | `BlogCategory.findByIdAndDelete(id)` → siler           |
 */

// Call Models:
const { BlogCategory, BlogPost } = require("../models/blog.model");

//CRUD
//ASYNC

module.exports = {
  list: async (req, res) => {
    const result = await BlogCategory.find();

    res.status(200).send({
      error: false,
      result, //!  means result:result
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
    // const result = await BlogCategory.findOne({...filter});
    const result = await BlogCategory.findById(req.params.id); //? veya yerine: findOne({ _id: req.params.id })

    res.status(200).send({
      error: false,
      result,
    });
  },

  //! 1.style (FINDONEANDUPDATE) (findOneAndUpdate({...filter},{...data},{...options}))

  update: async (req, res) => {
    //const result = await BlogCategory.findOneAndUpdate({...filter},{...data},{...options});
    const result = await BlogCategory.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    res.status(200).send({
      error: false,
      result,
      new: await BlogCategory.findById(req.params.id), //! güncellenen datayı döndür.
    });
  },
  //! 2.style (UPDATEONE)(YADA YUKARDAKİ UPDATE YERİNE AŞAĞIDAKİNİ KULLAN. new: await BlogCategory.findById(req.params.id) yazman gerekir. )
  update: async (req, res) => {
    //const result = await BlogCategory.updateOne({...filter},{...data});
    const result = await BlogCategory.updateOne(
      { _id: req.params.id },
      req.body,
    ); //! req.body object olduğu için onu sarmallamana gerek YOK!

    res.status(200).send({
      error: false,
      result,
      new: await BlogCategory.findById(req.params.id), //! güncellenen datayı döndür.
    });
  },

  /*  RESPONSE TO UPDATE
  "result": {
    "acknowledged": true, //if update methods end successfully
    "modifiedCount": 1, // if returns 0, no any data updated:already up to date
    "upsertedId": null, // no new document was inserted.combination of insert nad update.
    "upsertedCount": 0,
    "matchedCount": 0 // number of data which matches with our filter
  } */

  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },
};
