"use strict";
const Personnel = require("../models/personnel");
module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Personnel);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
  create: async (req, res) => {
    const result = await Personnel.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await Personnel.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Personnel.updateOne({ _id: req.params.id }, req.body, {
      runValidators:true,
      new:true,
    })   //! RUNVALIDATOR
    res.status(202).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    const result= await Personnel.deleteOne({_id: req.params.id})
  if (result.deletedCount) {
    res.status(204).end(); // ✅ Başarı: içerik yok
  } else {
    res.status(404).send({
      error: true,
      message: "Data not found",
    })

  }
}}
