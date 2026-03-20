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

/* | İşlem  | HTTP   | Senin fonksiyon |
| ------ | ------ | --------------- |
| Create | POST   | create          |
| Read   | GET    | read / list     |
| Update | PUT    | update          |
| Delete | DELETE | delete          |

 */
//* module.export içine bir element ekleyerek export yapıyoruz.
module.exports.blogCategory = {
  //? 1.create(POST)
  create: async (req, res) => {
    const result = await BlogCategory.create(req.body);
    console.log(req); // req = devasa obje (network + stream + express). Senin kullanacağın %5:body, params,query
    res.status(201).send({
      error: false,
      result,
    });
  },
  //? 2.read(GET)
  read: async (req, res) => {
    // const result = await BlogCategory.findOne({...filter});
    const result = await BlogCategory.findById(req.params.id); //? veya yerine: findOne({ _id: req.params.id })
    console.log(req.body); //{}
    res.status(200).send({
      error: false,
      result,
    });
  },

  //? 2.list(GET)
  list: async (req, res) => {
    const result = await BlogCategory.find();

    res.status(200).send({
      error: false,
      result, //!  means result:result
    });
  },
  //? 3.update(PUT) (FULL UPDATE/REPLACE)
  //! 1st style (FINDONEANDUPDATE) (findOneAndUpdate({...filter},{...data},{...options}))

  update: async (req, res) => {
    //const result = await BlogCategory.findOneAndUpdate({...filter},{...data},{...options});
    const result = await BlogCategory.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, //   { new: true, overwrite: true } // önemli: full replace
    );

    res.status(200).send({
      error: false,
      result,
      new: await BlogCategory.findById(req.params.id), //! güncellenen datayı döndür.
    });
  },
  //! 2nd style (UPDATEONE)(YADA YUKARDAKİ UPDATE YERİNE AŞAĞIDAKİNİ KULLAN. new: await BlogCategory.findById(req.params.id) yazman gerekir. )
  /*   update: async (req, res) => {
    // const result = await BlogCategory.updateOne({...filter},{...data});
    const result = await BlogCategory.updateOne(
      { _id: req.params.id },
      req.body,
    ); // req.body object olduğu için onu sarmallamana gerek YOK!

    res.status(200).send({
      error: false,
      result,
      new: await BlogCategory.findById(req.params.id), //! güncellenen datayı döndür.
    });
  }, */
  //! 3rd style (FINBYIDANDUPDATE) findByIdAndUpdate(req.params.id, req.body, {new:true})

  /* //* RESPONSE TO UPDATE
  "result": {
    "acknowledged": true, //if update methods end successfully
    "modifiedCount": 1, // if returns 0, no any data updated:already up to date
    "upsertedId": null, // no new document was inserted.combination of insert nad update.
    "upsertedCount": 0,
    "matchedCount": 0 // number of data which matches with our filter
  } */
  //? 3.update(PATCH) (PARTIAL UPDATE)  { new: true } // overwrite yok → partial
  //? 4.delete(DELETE)
  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204); //! NO CONTENT.sendStatus ile beraber hem status set eder, hem de response gelir.
    } else {
      res.customErrorCode = 404;
      throw new Error("Data is not found or already deleted.");
    }
  },
};

//! Note:
// ? MongoDB hatasını yakalayıp custom status ile döndürmek.
/* delete: async (req, res) => {
  try {
    const result = await BlogCategory.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      return res.sendStatus(204);
    } else {
      res.customErrorCode = 404;
      throw new Error("Data not found.");
    }
  } catch (err) {
CastError veya başka MongoDB hatası
    res.customErrorCode = 400; // Invalid ID
    throw err; // global error handler devreye girer
  }
}; */

/* 
if (!result.deletedCount) {
  return res.sendStatus(404);
}
! Ama bu durumda: merkezi error handler devreye girmez, custom error JSON formatın olmaz
 */

module.exports.blogPost = {
  //? 1.create(POST)
  create: async (req, res) => {
    const result = await BlogPost.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },
  //? 2.read(GET)
  read: async (req, res) => {
    // find({...filter},{...select}) gereksiz detayların gelmesini önlemek için select yerinde görmek istediğimiz dataları seçebiliriz.
    const result = await BlogPost.findById(req.params.id, {
      title: 1,
      content: 1,
      categoryId: true,
    }); //? veya yerine: findOne({...filter}) yani: findOne({ _id: req.params.id })

    res.status(200).send({
      error: false,
      result,
    });
  },

  //? 2.list(GET)
  list: async (req, res) => {
    // find({...filter},{...select}) gereksiz detayların gelmesini önlemek için select yerinde görmek istediğimiz dataları seçebiliriz.
    const result = await BlogPost.find(
      {},
      { title: 1, content: 1, categoryId: true, userId: true },
    ).populate("categoryId"); //!  WARN: POPULATE METHOD: populate → referans edilen document’i otomatik getirir. MongoDB’de ilişkiler ID ile tutulur. populate bu ID’yi alır, ilgili collection’dan gerçek veriyi çekip yerine koyar. Populate metodu ile; → ID yerine gerçek obje geldi.
    /* populate kullanmazsan:
    {
  "title": "Post 1",
  "categoryId": "65abc123..."
}
populate kullanırsan:
{
  "title": "Post 1",
  "categoryId": {
    "_id": "65abc123...",
    "name": "Tech"
  }
} */
    res.status(200).send({
      error: false,
      result, //!  means result:result
    });
  },
  //? 3.update(PUT) (FULL UPDATE/REPLACE)
  //! 1st style (FINDONEANDUPDATE) (findOneAndUpdate({...filter},{...data},{...options}))

  update: async (req, res) => {
    //const result = await BlogPost.findOneAndUpdate({...filter},{...data},{...options});
    const result = await BlogPost.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }, //   { new: true, overwrite: true } // önemli: full replace
    );

    res.status(200).send({
      error: false,
      result,
      new: await BlogPost.findById(req.params.id), //! güncellenen datayı döndür.
    });
  },
  //! 2nd style (UPDATEONE)(YADA YUKARDAKİ UPDATE YERİNE AŞAĞIDAKİNİ KULLAN. new: await  BlogPost.findById(req.params.id) yazman gerekir. )
  /*   update: async (req, res) => {
    // const result = await  BlogPost.updateOne({...filter},{...data});
    const result = await BlogPost.updateOne(
      { _id: req.params.id },
      req.body,
    ); // req.body object olduğu için onu sarmallamana gerek YOK!

    res.status(200).send({
      error: false,
      result,
      new: await BlogPost.findById(req.params.id), //! güncellenen datayı döndür.
    });
  }, */
  //! 3rd style (FINBYIDANDUPDATE) findByIdAndUpdate(req.params.id, req.body, {new:true})

  /* //* RESPONSE TO UPDATE
  "result": {
    "acknowledged": true, //if update methods end successfully
    "modifiedCount": 1, // if returns 0, no any data updated:already up to date
    "upsertedId": null, // no new document was inserted.combination of insert nad update.
    "upsertedCount": 0,
    "matchedCount": 0 // number of data which matches with our filter
  } */
  //? 3.update(PATCH) (PARTIAL UPDATE)  { new: true } // overwrite yok → partial
  //? 4.delete(DELETE)
  delete: async (req, res) => {
    const result = await BlogPost.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.sendStatus(204); //! NO CONTENT.sendStatus ile beraber hem status set eder, hem de response gelir.
    } else {
      res.customErrorCode = 404;
      throw new Error("Data is not found or already deleted.");
    }
  },
};
