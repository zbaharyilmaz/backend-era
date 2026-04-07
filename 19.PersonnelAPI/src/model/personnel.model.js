"use strict";
const mongoose = require("mongoose");
//! Schema({fields},{options})
const passwordEncrypte = require("../utils/passwordEncrypte");
const PersonnelSchema = new mongoose.Schema(
  {
    deartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentModel",
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypte(),
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    LastName: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      minLength: 11,
      match: [/^\d{11}$/, "phone number is not valid"], //11 karakter değilse.
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      //! [ validatorFunction, errorMessage ]
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email is not valid.",
      ],
    },
  },
  {
    collection: "personnels",
    timestamps: true,
  },
);
module.exports = mongoose.model("PersonnelModel", PersonnelSchema);
