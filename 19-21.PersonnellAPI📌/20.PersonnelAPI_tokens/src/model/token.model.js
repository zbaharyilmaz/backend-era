"use strict";
const mongoose = require("../configs/dbConnection");
const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonnelModel", //! Bu kısma model ismi yazılır.Bu alanın hangi modele bağlı olduğunu söyler (PersonnelModel) Yani: “Bu token hangi kullanıcıya ait?”
      required: true,
      index: true, //! “Bu kullanıcıya ait tokenları getir” sorgusu hızlı olur. Tek ek aramaz, indexe bakarak bulur.
    },
    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  },
);
module.exports = mongoose.model("TokenModel", TokenSchema); //mongoose içinden model metodu ile erişim yaptık.
