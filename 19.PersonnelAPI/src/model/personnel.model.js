"use strict";
const mongoose=require("mongoose")
//! Schema({fields},{options})
const PersonnelSchema= new mongoose.Schema({
deartmentId:
username:
password:
firstName:
LastName:
},{
    collection:"personnels",
    timestamps:true
})
module.exports= mongoose.model("PersonnelModel",PersonnelSchema)