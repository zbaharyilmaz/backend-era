"use strict";

/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");
//! ÖNCE SCHEMA OLUŞTUR, SONRA MODEL OLUŞTUR. 
//! SCHEMA = VERİ YAPISI, MODEL = SCHEMA'YI KULLANARAK OLUŞTURULAN SINIF. MODEL ÜZERİNDEN VERİ TABANI İLE ETKİLEŞİMDE BULUNURUZ.
//! Model → MongoDB’deki koleksiyonun “temsilcisi” (örneğin BlogCategory)
/* ---------------------------------------------------- */
//& BlogCategory Schema
//* Schema({collection's fields},{options})
const blogCategorySchema = new mongoose.Schema( //! mongoose içindeki Schema constructor veya Schema class ı ile model oluşturuyoruz.
  {
    // _id automatically created and incremented by MongoDB.
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "blogCategories",
  },
);

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

/* ---------------------------------------------------- */
//& BlogPost Schema
// Schema({collection's fields},{options})
const BlogPostSchema = new mongoose.Schema( //! mongoose içindeki Schema constructor veya Schema class ı ile model oluşturuyoruz.
  {
    categoryId: {  //ex categoryId:     "categoryId": "69b9c4600734860432387f75",
      // default relation: ManyToOne
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
      // unique: true // convert relation to OneToOne.
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }

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

    // createdAt
    // updatedAt
  },
  {
    collection: "blogPosts",
    timestamps: true,
  },
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

/* ---------------------------------------------------- */
module.exports = { BlogCategory, BlogPost };

/* ---------------------------------------------------- *
& TUTORIAL NOTES:
/*
1 - Create Schema
new mongoose.Schema({ fields }, { options });

const nameSchema = new mongoose.Schema({

// _id: auto created and increment

    fieldName: Number,
    fieldName2: Boolean,
    fieldName3: mongoose.Schema.Types.String,

    fieldName4: {
        type: String, //! JS data type. sequelize de DataTypes.STRING gibi.
        default: null,
        trim: true, // Cuts the space before & after
        unique: true,
        select: false,
        index: true,
        // required: true,
        required: [true, 'custom error message'],
        enum: ['1', '2', '3'],
        enum: [1, 2, 3],
        enum: [[1, 2, 3], 'custom error message'],
        min: 5,
        max: 10,
        validate: () => true // returns TRUE or FALSE. if returns false it wil throw a validation error.
        validate: [() => true, 'custom error message'],
        get: () => { return data }, // it works default when we do read oparation
        set: () => { return data } // it works default when we do create oparation
    }
}, {
    collection: 'collectionName', // Table Name
    timestamps: true // createdAt & updatedAt
});

 2 - Convert Schema to Model
module.exports = mongoose.model('ModelName', nameSchema);
*/
