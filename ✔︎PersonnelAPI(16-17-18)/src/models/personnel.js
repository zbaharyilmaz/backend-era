"use strict";
const mongoose = require("../configs/dbConnection");
const passwordEncrypt= require("../helpers/passwordEncrypt")
const PersonnelSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department", //& hangi modelden geliyor?
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
      set:(password)=>passwordEncrypt(password)
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
      unique: true,
      minlength:11,
      math:[/^\d{11}$/,"Phone numbers is not valid."],
    },
     email: {
      type: String,
      trim: true,
      required: true,
      unique:true,
      validate:[(email)=>email.includes("@") && email.includes("."),"Email is not valid"]
    },
  },
  {
    collection: "personnels",
    timestamps: true,
  }
);
