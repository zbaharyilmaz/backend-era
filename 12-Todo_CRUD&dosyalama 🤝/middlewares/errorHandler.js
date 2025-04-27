"use strict"
module.exports= (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500;
    console.log("errorHandler worked.");
    res.status(errorStatusCode).send({
      error: true,
      message: err.message,
      cause: err.cause,
    });
  };
  //module.exports= errorHandler yerine errorHandler fonk değiştirdik.