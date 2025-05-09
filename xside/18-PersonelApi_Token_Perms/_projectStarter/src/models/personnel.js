"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const {mongoose}=require("../configs/dbConnection")
const passwordEncrypt=require("../helpers/passwordEncrypt")
/* ------------------------------------------------------- */

const PersonnelSchema=new mongoose.Schema({
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    username:{
        type:"String",
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:"String",
        trim:true,
        required:true,
        set:(password)=>passwordEncrypt(password)

    },
    firstName:{
        type:"String",
        trim:true,
        required:true,
    },
    lastName:{
        type:"String",
        trim:true,
        required:true,
    },
    phone:{
        type:"String",
        trim:true,
        required:true,
        unique:true,
        minlength:11,
        math:[/^\d{11}$/,"Phone number is not valid"]

    },
    email:{
        type:"String",
        trim:true,
        required:true,
        unique:true,
        validate:[(email)=>email.includes("@") && email.includes(".") ,"Email is not valid"]
    },
    title:{
        type:"String",
        trim:true,
        required:true,
    },
    salary:{
        type:Number,
        default:5000
    },
    description:{
        type:"String",
        trim:true,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isLead:{
        type:Boolean,
        default:false
    },
    startedAt:{
        type:Date,
        default:Date.now(),
        required:true,
    }

},{collection:"personnels",timestamps:true})

// Eklenebilecek extra fonksiyonlar

// PersonnelSchema.set("toJson",{
//     transform:(doc,ret)=>{
//         ret.id=ret._id
//         delete ret._v
//         ret.createdAt=ret.createdAt.toLocalDateString("tr-tr")

//     }
// })


module.exports=mongoose.model("Personnel",PersonnelSchema)