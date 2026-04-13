"use strict";
const PersonnelModel = require("../model/personnel.model");
module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body; //!destructuring
    if ((username || email) && password) {
      const user = await PersonnelModel.findOne({
        $or: [{ email }, { username }],
        password,
      }); //  $or: [{ email: email }, { username: username }]
      //! findone set metodunu da çalıştırarak, passwordda hash li password a ulaşacagız.
      if (user) {
        res.status(200).send({
          error: false,
          message: "OK",
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email/username/password");
      }
      res.status(200).send({
        error: false,
        message: "OK",
      });
    } else {
      res.errorStatusCode = 401;
      throw new Error("username/email and password are required.");
    }
  },
  logout: async (req, res) => {},
};
