"use strict";
//Query Handler Middleware
module.exports = async (req, res, next) => {
  //! FILTERING-SEARCHING-SORTING-PAGINATION
  console.log("req.query:", req.query, typeof req.query);
  /* - Query Param objesi: 
{ filter: { published: '1', categoryId: '69c4b89155d2ab62912cf731' }, search: { title: 'test 1' }, sort: 'asc' } */
  //& FILTERING (URL?filter[fieldName1]=value1&filter[filedName2]=value2) ABSOLUTE EQUALITY
  const filter = req.query?.filter || {};
  console.log("filter:", filter);
  // filter: { published: '1', categoryId: '69c4b89155d2ab62912cf731' }
  //&SEARCHING(URL?search[fieldName1]=value1&search[filedName2]=value2) PARTIAL EQUALITY.
  // REGEX { "<field>": { "$regex": "pattern", "$options": "<options>" } }
  // ! ŞU AN AMACIMIZ:  query parametresini MongoDB $regex filtre formatına çevirmek.
  // QUERY SANITIZATION-QUERY TRANSFORMATION
  const search = req.query?.search || {};

  console.log("search:", search, typeof search); //type: object
  //search: { title: 'test 1' } query parametresi

  console.log(search["title"]); //! BRACET NOTATION (property access)
  console.log(search.title); //! DOT NOTATION
  // search["title"] = "this is new value";
  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" }; //i means insensitive for case.
  }
  console.log(search);
  // { title: { '$regex': 'this is new value', '$options': 'i' } } MongoDB regex filtre formtına çevrildi.
  //& SORTING ( URL?sort[fieldName1]=asc&sort[filedName2]=desc)
  const sort = req.query?.sort || {};
  //& PAGINATION ( URL?page=3&limit=15&skip=20)
  //mongo db: skip and limit
  //& LIMIT
  let limit = parseInt(req.query?.limit); // on readme: parseInt vs Number.

  limit = limit > 0 ? limit : parseInt(process.env.PAGE_SIZE) || 20; //env den gelen veriler stringtir.
  console.log("limit", limit, typeof limit); // type:string, matematiksel işlemlere gireceği için number a çevir. şuan type:number

  //& PAGE
  let page = parseInt(req.query?.page);
  //!! kullanıcı page yollamazsa aşağıda farklı bir page belirlenmesi için: let kullan.
  page = page > 0 ? page : 1;
  //& SKIP
  let skip = parseInt(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;
  console.log(limit, page, skip);

  res.getModelList = async (Model, populate = null) => {
    return await Model.find(
      {
        ...filter,
        ...search,
      }, // spread operator: filter içeriği açılır, search içeriği açılır. tek bir query object oluşturulur.

      // { title: 1, content: 1, categoryId: true, userId: true },
    )
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };
  res.getModelListDetails = async (Model) => {
    const count = await Model.countDocuments({
      ...filter,
      ...search,
    });
    console.log(count);
    let details = {
      filter,
      search,
      sort,
      page,
      limit,
      skip,
      totalRecords: count,
      pages: {
        previos: page > 1 ? page - 1 : false,
        current: page,
        next: page + 1 < Math.ceil(count / limit) ? page + 1 : false,
        total: Math.ceil(count / limit),
      },
    };
    if (details.totalRecords <= limit) details.page = false;
    return details;
  };
  next();
};
