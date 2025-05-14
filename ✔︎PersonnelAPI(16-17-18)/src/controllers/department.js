"use strict"
const Department= require("../models/department")
module.exports= {
    list:async(req,res)=>{
        const result= await getModelList(Department)
        res.status(200).send(
            error:false,

            details:
            result
        )
        
    },
    create:async(req,res)=>{

    },
    read:async(req,res)=>{

    },
    update:async(req,res)=>{

    },
    delete:async(req,res)=>{

    },
}