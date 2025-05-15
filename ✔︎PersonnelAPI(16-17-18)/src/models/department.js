"use strict";
const mongoose = require("../configs/dbConnection");
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
  }
); // {fields}{options}
module.exports = mongoose.model("Department", DepartmentSchema);
