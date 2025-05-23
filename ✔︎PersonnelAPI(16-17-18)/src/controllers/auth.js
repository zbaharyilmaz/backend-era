"use strict";
const passwordEncrypt = require("../helpers/passwordEncrypt");
const Personnel = require("../models/personnel");
const Token = require("../models/token");
module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;
    if ((username || email) && password) {
      const user = await Personnel.findOne({
        $or: [{ username }, { email }],
        password,
      }); //!OR İÇİN KULLANIM: $or: [{username: username}, {email:email}
      //* if(user.password== passwordEncrypt(password)) yerine direkt yukarda password yaz. o zaten personnel modelde set edilmişti.
      if (user) {
        if (user.isActive) {
          //?TOKEN
          let tokenData = await Token.findOne({ userId: user._id });
          if (!tokenData) {
            tokenData = await Token.create({
              userId: user._id,
              token: passwordEncrypt(user._id + Date.now()), //! id yi encrypt yaptık. Tokeni benzersiz oluşturma için. third part package ile de yapılır.
            });
          } 
            res.status(200).send({
              error: false,
              token: tokenData.token,
              user,
            })
        } else {
          res.errorStatusCode = 401;
          throw new Error("User is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username or email");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("username/email and password are required.");
    }
  },
logout: async(req,res)=>{
  const token= req.user ? await Token.deleteOne({userId: req.user._id}): null
  console.log(req.user);
  res.status(200).send({
    error:false,
    message: token?.deletedCount ? "Token is deleted. Logout is successfully done." : "Logout is successfully done."
  })

}
}