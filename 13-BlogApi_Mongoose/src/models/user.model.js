"use strict";
const mongoose = require("mongoose");
//Password Encryption:
const crypto= require("node:crypto")
const passwordEncrypte= (password)=>{
  const salt= "kskshjjdhdbbbsbbsbbsbbs";
  const iteration= 100000;
  const keylen=32; //write 32 for 64
  const digest= "sha512";
  return crypto.pbkdf2Sync(password,salt, iteration, keylen, digest ).toString("hex")

}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate:
    },
    password: {
      type: String,
      required: true,
      trim: true,
      //set:(password)=>{return password} //database e kaydediyor.
       set:passwordEncrypte,
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
