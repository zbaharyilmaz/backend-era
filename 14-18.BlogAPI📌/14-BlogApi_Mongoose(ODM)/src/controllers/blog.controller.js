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

  // Todo below controllers and their routers

  read: async (req, res) => {
    const result = await BlogCategory;

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    const result = await BlogCategory;

    res.status(200).send({
      error: false,
      result,
    });
  },

  delete: async (req, res) => {
    const result = await BlogCategory;

    res.status(200).send({
      error: false,
      result,
    });
  },
};
