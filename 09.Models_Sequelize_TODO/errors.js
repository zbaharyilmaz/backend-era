"use strict";
const express= require("express");
const app= express();

require("dotenv").config();
const PORT= process.env?.PORT || 8000;

//& 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑
//? 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑
//* 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑


app.get("/user/:id", (req,res)=>{
    try{
        if(isNaN(req.params.id)){
            // res.send("id must be a number")
            throw new Error("id must be a number")
        }else{
            res.send("id is a number")
        }
        
    }catch(error){
        console.log(error);
        res.send("There is an error: "+ error.message)

    }
})

//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 
//* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 
//? 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 

//4 parametresi olan bir middleware. Görevi: hata yakalamak. En sonda çağrılır.

const errorHandler=(err, req, res, next)=>{
    console.log(err, "Error Handler is working");
    res.send({
        error:true,
        message:err.message,
        cause: err.cause,
        stack: err.stack,
        status: err.status || 500,
    })
}
app.use(errorHandler)






app.listen(PORT, ()=>console.log("Running at http://127.0.0.1:"+ PORT))