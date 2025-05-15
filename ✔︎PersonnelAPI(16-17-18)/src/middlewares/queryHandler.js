"use strict";
//! Amacı, gelen istek üzerindeki query parametrelerini (filter, search, sort, limit, page, skip) işleyip, kolayca kullanılabilir hale getirmek.
module.exports = async (req, res, next) => {
  const filter = req.query?.filter || {};
  const search = req.query?.search || {}; //search[key] = { $regex: search[key], $options: 'i' } case insensitive için.
  for (let key in search) search[key] = { $regex: search[key] }; //Burada search içindeki her bir alan, regex’e dönüştürülüyor. Böylece MongoDB'de "içinde geçiyor mu?" gibi esnek arama yapılabiliyor.
  const sort = req.query?.sort || {};
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);
  let page = Number(req.query?.page);
  page = page > 0 ? page : 1;
  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : (page - 1) * limit;
  res.getModelList = async function (Model, populate = null) {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate(populate);
  }; //! res nesnesine getModelList adında bir fonksiyon ekleniyor. Böylece bu middleware'in kullanıldığı herhangi bir yerde res.getModelList(Model) şeklinde çağrılabilir.
  res.getModelListDetails = async (Model) => {
    const data = await Model.find({ ...filter, ...search });
    let details = {
      filter: filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 1 ? page - 1 : false,
        current: page,
        next: page + 1,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    },
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };
  next();
};
