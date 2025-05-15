"use strict";
const mongoose = require("../configs/dbConnection");
const passwordEncrypt= require("../src/")
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
      set:(password)=>
    },
    fistName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "personnels",
    timestamps: true,
  }
);
