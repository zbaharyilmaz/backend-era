"use strict";
const mongoose = require("../configs/dbConnection");
const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel", //! Model ismini yaz.
      required: true,
      index: true, //daha hızlı ulaşım için.
    },
    token: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      index: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);
module.exports= mongoose.model("Token", TokenSchema)   
 //? mongoose içindeki model metodu ile model oluştur, hangi şemayı modele çevireceğini yaz. model ismi belirle.