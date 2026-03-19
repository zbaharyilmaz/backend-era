"use string";
const User= require("../models/user.model")
module.exports={
create: async(req,res)=>{
    const result= await User.create(req.body)
    res.status(201).send({
        error:false,
        result,
    })
},
read: async(req,res)=>{
    const result= await User.findById(req.params.id);
    res.status(200){
        error:false,
        result
    }
},
list: async (req, res) => {
    const result = await User.find();

    res.status(200).send({
      error: false,
      result, //!  means result:result
    });
  },
update:async(req,res)=>{
    const result= await User.findOneAndUpdate ({_id:req.params.id},req.body,{ new: true })
    res.status(200).send({
        error:false, 
        result,
        new: await User.findById(req.params.id)
    })
},
delete: async(req,res)=>{
    const result= await User.deleteOne ({ _id: req.params.id })
  if (result.deletedCount) {
      res.sendStatus(204); //! NO CONTENT.sendStatus ile beraber hem status set eder, hem de response gelir.
    } else {
      res.customErrorCode = 404;
      throw new Error("Data is not found or already deleted.");
    }
}
}