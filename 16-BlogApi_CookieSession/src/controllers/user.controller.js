"use string";
const User = require("../models/user.model");
const passwordEncrypte = require("../utils/passwordEncrypte.js");

module.exports = {
  create: async (req, res) => {
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
    if (result.deletedCount) {
      res.sendStatus(204); //! NO CONTENT.sendStatus ile beraber hem status set eder, hem de response gelir.
    } else {
      res.customErrorCode = 404;
      throw new Error("Data is not found or already deleted.");
    }
  },
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
        if (user.password == password) {
          res.status(200).send({
            error: false,
            mesage: "ok",
          });
        } else {
          res.customErrorCode = 401; //! STATUS KODU DEĞİŞİKLİĞİNİ BURDAN YAPABİLİRİSN.
          throw new Error("Wrong password.");
        }
        res.status(200).send({
          error: false,
          mesage: "ok",
        });
      } else {
        res.customErrorCode = 401;
        throw new Error("Wrong email or password.");
      }
    } else {
      res.customErrorCode = 401;
      throw new Error("Email and password are required");
    }
  },
};
