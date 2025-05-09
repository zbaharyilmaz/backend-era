"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Token = require("../models/token")

module.exports = {
    list: async (req, res) => {

        const result = await res.getModelList(Token)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Token),
            result
        })

    },

    create: async (req, res) => {

        const result = await Token.create(req.body)

        res.status(201).send({
            error: false,
            result
        })

    },
    read: async (req, res) => {

        const result = await Token.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            result
        })

    },
    update: async (req, res) => {

        const result = await Token.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,  // runs validation methods
            new: true
        }) // return updated data

        res.status(202).send({
            error: false,
            result
        })

    },
    deletee: async (req, res) => {

        const result = await Token.deleteOne({ _id: req.params.id })

        // 204 no content - 404 : not found
        res.status(result.deletedCount ? 204 : 404).send({
            error: true,
            message: "Data is not found  or deleted"
        })

    }
}