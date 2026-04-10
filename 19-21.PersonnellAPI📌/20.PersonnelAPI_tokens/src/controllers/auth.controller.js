"use strict";
module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body; //!destructuring
    if ((username || email) && password) {
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
