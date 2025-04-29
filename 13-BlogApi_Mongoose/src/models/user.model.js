"use strict";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      set:()=>{return "backend studies"} //database e kaydediyor.
    },
    firstName:String,
    lastName: String,
  },
  {
    collection: "",
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
