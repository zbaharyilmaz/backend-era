"use strict";
const mongoose = require("mongoose");
//! Schema({fields},{options})
const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "departments",
    timestamps: true,
  },
);
module.exports = mongoose.model("DepartmentModel", DepartmentSchema);
