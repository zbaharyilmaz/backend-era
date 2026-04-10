"use strict";
const TokenModel = require("../model/token.model");
module.exports = {
  list: async (req, res) => {
    //const result= await res.TokenModel.find()
    const result = await res.getModelList(TokenModel);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(TokenModel),
      result,
    });
  },
  create: async (req, res) => {
    const result = await TokenModel.create(req.body);
    res.status(200).send({
      error: false,
      result,
      //! create() ile yeni bir belge eklediğinde validatorlar otomatik çalışır .runValidator yazmana gerek yok.
    });
  },
  read: async (req, res) => {
    const result = await TokenModel.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await TokenModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true, //! validate ediyor tekrardan. Eğer yazmazsan schema’daki required, match, validate çalışmaz.
      new: true, // return updated data.
    });
    res.status(202).send({
      error: false,
      result,
    });
  },
  deleteToken: async (req, res) => {
    const result = await TokenModel.deleteOne(req.params.id);
    //204 no content - 404 not found
    res.status(result.deletedCount ? 204 : 404).send({
      error: false,
      message: "Data is not found or already deleted.",
    });
  },
};
