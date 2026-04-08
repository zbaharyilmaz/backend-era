"use strict";
const mongoose = require("mongoose");
//! Schema({fields},{options})
const passwordEncrypte = require("../utils/passwordEncrypte");
const PersonnelSchema = new mongoose.Schema(
  {
    departmentId: {
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
      set: (password) => passwordEncrypte(password),
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
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
    title: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
      type: Number,
      default: 30000,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isLead: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },

  {
    collection: "personnels",
    timestamps: true,
  },
);
module.exports = mongoose.model("PersonnelModel", PersonnelSchema);
