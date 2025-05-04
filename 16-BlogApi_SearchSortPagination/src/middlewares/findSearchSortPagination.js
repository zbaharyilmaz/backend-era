"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Query Handler Middleware

module.exports = async (req, res, next) => {

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

    res.getModelList = async (Model, populate = null) => {
        return await Model.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit).populate(populate)
    };

    res.getModelListDetails = async (Model) => {

        const count = await Model.countDocuments({ ...filter, ...search });

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            totolRecords: count,
            pages: {
                previos: (page > 1 ? page - 1 : false),
                current: page,
                next: page < Math.ceil(count / limit) ? page + 1 : false,
                total: Math.ceil(count / limit)
            }
        };

        // if (details.pages.next > details.pages.total) details.pages.next = false
        if (details.totolRecords <= limit) details.pages = false

        return details

    };


    next()

};