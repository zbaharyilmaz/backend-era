"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const { BlogCategory, BlogPost } = require('../models/blog.model');

// BlogCategory Controller
module.exports.blogCategory = {

    list: async (req, res) => {

        const result = await res.getModelList(BlogCategory);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(BlogCategory),
            result
        });
    },

    create: async (req, res) => {

        const result = await BlogCategory.create(req.body);

        res.status(201).send({
            error: false,
            result
        });
    },


    read: async (req, res) => {

        // const result = await BlogCategory.findOne({...filter});
        // const result = await BlogCategory.findOne({ _id: req.params.id });
        const result = await BlogCategory.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        });
    },

    update: async (req, res) => {

        // const result = await BlogCategory.updateOne({...filter}, {...data}, {...?options})
        // const result = await BlogCategory.findOneAndUpdate({...filter}, {...data}, {...?options})

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly.
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
        // "upsertedCount": 0, // Since nothing was inserted, no new ID.
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        // const result = await BlogCategory.updateOne({ _id: req.params.id }, req.body);
        // const result = await BlogCategory.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        const result = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });

        res.status(200).send({
            error: false,
            result,
            // new: await BlogCategory.findById(req.params.id)
        });
    },

    delete: async (req, res) => {

        const result = await BlogCategory.deleteOne({ _id: req.params.id });

        if (result?.deletedCount) {
            res.sendStatus(204);
        } else {
            res.errorStatusCode = 404;
            throw new Error("Data is not found or already deleted");
        }
    },

}

// BlogPost Controller
module.exports.blogPost = {

    list: async (req, res) => {

        /* ------------------------------------------------------- *
        //* FILTERING & SEARCHING & SORTING & PAGINATION

        //* Filter: searches for absolute equality, Search: searches for partial equality.


        //* FILTERING:
        // URL?filter[fieldName1]=value1&filter[filedName2]=value2
        const filter = req.query?.filter || {}

        //* SEARCHING:
        // URL?search[fieldName1]=value1&search[filedName2]=value2
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        // { "<field>": { "$regex": "pattern", "$options": "<options>" } }

        const search = req.query?.search || {}

        // console.log(search.title);
        // console.log(search['title']);
        // search['title'] = 'this is new value'

        for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

        //* SORTING:
        // URL?sort[fieldName1]=asc&sort[filedName2]=desc
        const sort = req.query?.sort || {}

        //* PAGINATION:
        // URL?page=3&limit=15&skip=20

        //* LIMIT:
        let limit = parseInt(req.query?.limit)
        limit = limit > 0 ? limit : parseInt(process.env.PAGE_SIZE) || 20

        //* PAGE:
        let page = parseInt(req.query?.page)
        page = page > 0 ? page : 1

        //* SKIP:
        let skip = parseInt(req.query?.skip)
        skip = skip > 0 ? skip : (page - 1) * limit

        const result = await BlogPost.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit).populate(['userId', 'categoryId'])
        /* ------------------------------------------------------- */

        const result = await res.getModelList(BlogPost, ['categoryId', 'userId']);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(BlogPost),
            result
        });
    },

    create: async (req, res) => {

        //* add logged in user id for creation of blogpost.
        req.body.userId = req.user._id

        const result = await BlogPost.create(req.body);

        res.status(201).send({
            error: false,
            result
        });
    },

    read: async (req, res) => {

        // const result = await BlogPost.findOne({...filter});
        // const result = await BlogPost.findOne({ _id: req.params.id });
        const result = await BlogPost.findById(req.params.id, { title: 1, content: 1, categoryId: true }).populate(['categoryId', 'userId']);

        res.status(200).send({
            error: false,
            result
        });
    },

    update: async (req, res) => {

        // const result = await BlogPost.updateOne({...filter}, {...data}, {...?options})
        // const result = await BlogPost.findOneAndUpdate({...filter}, {...data}, {...?options})

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly.
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
        // "upsertedCount": 0, // Since nothing was inserted, no new ID.
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        // const result = await BlogPost.updateOne({ _id: req.params.id }, req.body);
        // const result = await BlogPost.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        const result = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).send({
            error: false,
            result,
            // new: await BlogPost.findById(req.params.id)
        });
    },

    delete: async (req, res) => {

        const result = await BlogPost.deleteOne({ _id: req.params.id });

        if (result?.deletedCount) {
            res.sendStatus(204);
        } else {
            res.errorStatusCode = 404;
            throw new Error("Data is not found or already deleted");
        }
    },

}