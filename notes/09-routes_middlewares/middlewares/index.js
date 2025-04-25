"use strict";
/* 😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁 Middlewares 😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁*/

const middleware1 = (req, res, next) => {
    req.messageFn1 = "Hello, it is running 1";
    next();
  };
  const middleware2 = (req, res, next) => {
    req.messageFn2 = "Hello, it is running 2";
    next();
  };

  module.exports={middleware1, middleware2} // export middlewares


  //& DIGER YOL 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟

  module.exports={
    middleware1: (req, res, next) => {
      req.messageFn1 = "Hello, it is running 1";
      next();
    },
    middleware2: (req, res, next) => {
      req.messageFn2 = "Hello, it is running 2";
      next();
    },
  }

