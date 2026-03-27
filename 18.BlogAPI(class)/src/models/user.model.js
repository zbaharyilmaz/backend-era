"use strict";
const mongoose = require("mongoose");
const passwordEncrypte= require("../utils/passwordEncrypte")
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: [true, "This email address is already in use."],
      trim: true,
      //* How validate works?
      // validate: (email) => { return false }

      //* Throw validation error
      // validate: (email) => {
      //     if (email.includes('@') && email.includes('.')) {
      //         return true
      //     }
      //     throw new Error('invalid email address')
      // },

      validate: [
        (email) => {
          return email.includes("@") && email.includes(".");
        },
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      trim: true,
      //set:(password)=>{return password} //database e kaydediyor.
      set: passwordEncrypte,
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: "",
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
