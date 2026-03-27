"use strict";
const mongoose = require("mongoose");
const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("DepartmentModel", DepartmentSchema);
