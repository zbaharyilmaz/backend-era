"use strict";
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: "users",
    timestamps: true,
  },
);
module.exports = mongoose.model("User", UserSchema);
