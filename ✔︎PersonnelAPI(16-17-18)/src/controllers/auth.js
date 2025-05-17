"use strict";
const passwordEncrypt = require("../helpers/passwordEncrypt");
const Personnel= require("../models/personnel")
module.exports={
    login: async (req,res)=>{
      const {username, email, password}= req.body;
      if((username || email) && password){
        const user= await Personnel.findOne({$or: [{username}, {email}],password})       //!OR İÇİN KULLANIM: $or: [{username: username}, {email:email}
       //* if(user.password== passwordEncrypt(password)) yerine direkt yukarda password yaz. o zaten personnel modelde set edilmişti.
       if(user){
         res.status(200).send({
          error:false,
          message: "OK"   })
       }else{
         res.errorStatusCode=401;
        throw new Error("Wrong username or email")
       }
       
     

      }else{
        res.errorStatusCode=401;
        throw new Error("username/email and password are required.")
      }

    }
     
}