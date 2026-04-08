"use strict";
//Query Handler Middleware
module.exports = async (req, res, next) => {
  const filter = req.query?.filter || {};
  const search = req.query?.search || {};
  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" }; 
  }
  const sort = req.query?.sort || {};
  let limit = parseInt(req.query?.limit); 

  limit = limit > 0 ? limit : parseInt(process.env.PAGE_SIZE) || 20; 

  let page = parseInt(req.query?.page);

  let skip = parseInt(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;

  res.getModelList = async (Model, populate = null) => {
    return await Model.find(
      {
        ...filter,
        ...search,
      },
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
        next: page < Math.ceil(count / limit) ? page + 1 : false,
        total: Math.ceil(count / limit),
      },
    };
    if (details.totalRecords <= limit) details.page = false;
    return details;
  };
  next();
};
