"use strict"
module.exports= async(req, res, next)=>{
    const filter= req.query?.filter||{}
    const search= req.query?.search||{}
    for(let key in search)
        search[key]={$regex:search[key]}
    const sort= req.query?.sort|| {}
    let limit= Number(req.query?.limit)
    limit= limit>0 ? limit:Number(process.env.PAGE_SIZE||20)
    let page= Number(req.query?.page)
    page=page>0 ? page:1
    let skip=Number(req.query?.skip)
    skip= skip>0? skip:((page-1)*limit)
    res.getModelList= async function(Model, populate=null){
        return await Model.find({...filter, ...search}).sort(sort).limit(limit).skip(skip)
    }
}