"use strict";
const DepartmentModel = require("../model/department.model");
module.exports = {
  list: async (req, res) => {
    //const result= await res.DepartmentModel.find()
    const result= await res.getModelList(DepartmentModel)
    res.status(200).send({
        error:false,
        details:await res.getModelListDetails(DepartmentModel),
        result
    })
  },
  create: async (req, res) => {
    const result= await DepartmentModel.create(req.body)
        res.status(200).send({
        error:false,
        result
        //! create() ile yeni bir belge eklediğinde validatorlar otomatik çalışır .runValidator yazmana gerek yok.
    })
  },
  read: async (req, res) => {
    const result= await DepartmentModel.findById(req.params.id)
        res.status(200).send({
        error:false,
        result
    })
  },
  update: async (req, res) => {
       const result = await DepartmentModel.findByIdAndUpdate(req.params.id, req.body, {
        runValidators:true, //! validate ediyor tekrardan. Eğer yazmazsan schema’daki required, match, validate çalışmaz.
         new: true, // return updated data.
       });
        res.status(202).send({
        error:false,
        result
    })
  },
  delete: async (req, res) => {
           const result = await DepartmentModel.deleteOne(req.params.id);
           //204 no content - 404 not found
        res.status(result.deletedCount? 204: 404).send({
        error:false,
        message:"Data is not found or already deleted."
    })
  }
};
