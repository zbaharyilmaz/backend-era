"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel")

module.exports = {
    list: async (req, res) => {

        const result = await res.getModelList(Personnel)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Personnel),
            result
        })

    },

    create: async (req, res) => {

        // todo : eger ki yeni bir lead olusturulursa eski lead degerini false yap.
        const isLead = req.body?.islead || false

        if (isLead) {
            await Personnel.updateMany({ departmentId: req.body.departmentId, isLead: true }, { isLead: false }).then(() => console.log('personnels updated'))
        }

        const result = await Personnel.create(req.body)

        res.status(201).send({
            error: false,
            result
        })

    },
    read: async (req, res) => {

        const result = await Personnel.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            result
        })

    },
    update: async (req, res) => {

        // todo : eger ki bir update olursa ve bu update lead olursa eski lead degerini false yap.
        const isLead = req.body?.islead || false

        if (isLead) {
            const { departmentId } = await Personnel.findOne({ _id: req.params.id }, { departmentId: 1 })

            await Personnel.updateMany({ departmentId, isLead: true }, { isLead: false }).then(() => console.log('personnels updated'))
        }

        const result = await Personnel.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,  // runs validation methods
            new: true
        }) // return updated data

        res.status(202).send({
            error: false,
            result
        })

    },
    delete: async (req, res) => {

        const result = await Personnel.deleteOne({ _id: req.params.id })

        // 204 no content - 404 : not found
        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: "Data is not found  or deleted"
        })

    }
}