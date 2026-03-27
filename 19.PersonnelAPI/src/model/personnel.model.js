"use strict";
const mongoose=require("mongoose")
//! Schema({fields},{options})
const passwordEncrypte= require("../utils/passwordEncrypte")
const PersonnelSchema= new mongoose.Schema({
deartmentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "DepartmentModel",
    required:true
},
username:{
    type:String,
    trim:true,
    required:true,
    unique:true
},
password:{
        type:String,
    trim:true,
    required:true,
    set:(password)=>passwordEncrypte()
},
firstName:{},
LastName:{}
},{
    collection:"personnels",
    timestamps:true
})
module.exports= mongoose.model("PersonnelModel",PersonnelSchema)