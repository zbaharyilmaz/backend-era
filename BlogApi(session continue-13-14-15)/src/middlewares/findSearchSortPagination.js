"use strict"

const { countDocuments } = require("../models/user.model");

module.exports= async (req,res, next)=>{
     //* FILTERING
    //Filter: absolute equality
    //Search: partial equality
    console.log(req.query);
    // {
    //   published: '1',
    //   categoryId: '6819439d6dcb2cacfac67063',
    //   title: 'test 5',
    //   sort: 'asc'
    // } clg ye gelen yanıt.

    //*nested query:   filter: { published: '1', categoryId: '6819439d6dcb2cacfac67063' }

    const filter = req.query?.filter || {};
    console.log(filter);

    //SEARCHING
    const search = req.query?.search || {};
    console.log(search.title);
    //console.log(search["title"]);
    //{ "<field>": { "$regex": "pattern", "$options": "<options>"
    //.populate("categoryId");  //!POPULATE() categoryId yi okumak için.
    //search["title"]= "this is new value"

    // for(let key in search) console.log(search[key]);
    for (let key in search)
      search[key] = { $regex: search[key], $options: "i" };
    console.log(search);

    //SORTING
    const sort = req.query?.sort || {};
    //PAGINATION
    //LIMIT
    let limit = parseInt(req.query?.limit);
    limit = limit > 0 ? limit : parseInt(process.env.PAGE_SIZE) || 20; //.env den gelen veriler string old için parseInt yap. Number() da NaN verebilir 25a ya mesela.
    console.log(typeof limit); //string
    //PAGE
    let page = parseInt(req.query?.page);
    page = page > 0 ? page : 1;
    //SKIP
    let skip = parseInt(req.query?.skip);
    skip = skip > 0 ? skip : (page-1)*limit
    console.log(page, limit, skip);


    res.getModelList = async (Model, populate = null) => {
        return await Model.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit).populate(populate)
    };
    res.getModelListDetails= async(Model)=>{
        const count= await Model.countDocuments({...filter, ...search})
        console.log(count);
        let details= {
            filter,
            search,
            sort,
            skip, 
            limit,
            page,
            totalRecords: count,
            pages:{
                 previous: (page>1 ? page-1 : false),
                current: page, 
                next:page+1> Math.ceil(count/limit)? page+1:false,
                total: Math.ceil(count/limit)
            }
               
         
        } 
          if(details.totalRecords<= limit) details.pages=false
            return details
    }
    next()

}