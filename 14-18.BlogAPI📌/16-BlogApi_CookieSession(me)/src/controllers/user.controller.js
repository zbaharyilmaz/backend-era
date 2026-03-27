"use strict";
const User = require("../models/user.model.js");
const passwordEncrypte = require("../utils/passwordEncrypte.js");
module.exports = {
  create: async (req, res) => {
    if (!req.body.password && req.body.password.length < 8) {
      res.customErrorCode = 400;
      throw new Error("The Password must be more than 8 character.");
    }
    const result = await User.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await User.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  list: async (req, res) => {
    const result = await User.find();
    res.status(200).send({
      error: false,
      result, //!  means result:result
    });
    console.log(req.body);
  },
  update: async (req, res) => {
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      error: false,
      result,
      new: await User.findById(req.params.id),
    });
  },
  delete: async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result?.deletedCount) {
      res.sendStatus(204); //! NO CONTENT.sendStatus ile beraber hem status set eder, hem de response gelir.
    } else {
      res.customErrorCode = 404;
      throw new Error("Data is not found or already deleted.");
    }
  },

  //! AUTHORIZATON (yetki kontrolü: Ne yapabilirsin?)
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email && password) {
      const user = await User.findOne({ email: email });
      console.log(user);
      /*   _id: new ObjectId('69bbabe12335fdd3d31b970e'),
  email: 'test@site.com',
  password: 'test',
  firstName: 'test',
  lastName: 'test',
  createdAt: 2026-03-19T07:55:13.485Z,
  updatedAt: 2026-03-19T07:55:13.485Z,
  __v: 0
} */
      if (user) {
        if (user.password == passwordEncrypte(password)) {
          /*  Session */
          // req.session = {
          //     email: user.email,
          //     _id: user._id
          // };
          req.session._id = user._id;
          req.session.email = user.email;
          /*  Session */

          /*  Cookie */
          if (req.body?.rememberMe == true) {
            req.session.rememberMe = true;
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
          }
          /*  Cookie */

          res.status(200).send({
            error: false,
            message: "Login is succesful.",
            user,
          });
        } else {
          res.customErrorCode = 401;
          throw new Error("Email and password are required");
        }
      } else {
        res.customErrorCode = 401;
        throw new Error("Email and password are required");
      }
    } else {
      res.customErrorCode = 401;
      throw new Error("Email and password are required");
    }
  },
  logout: async (req, res) => {
    req.session = null;
    res.status(200).send({
      error: false,
      message: "Logout is successful.",
    });
  },
};
/* ex data for thunder:{
     "email": "test6@site.com",
      "password": "test"
} */

//salt sabit → güvenlik zayıf
// modern yaklaşım: bcrypt
