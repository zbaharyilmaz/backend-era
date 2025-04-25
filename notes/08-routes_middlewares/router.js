"use strict";  // Modern JavaScript hatalarını yakalamak için kullanılır.

/* Routes */
const express= require("express");
const app= express();

require("dotenv").config();
const PORT= process.env?.PORT || 8000;   // process.env.PORT ?? 8000

// app.route("/").get((req, res)=> {
//     res.send({
//         method: "GET" })})

//& ROUTER

// const router= express.Router();
// router.get("/",(req,res)=>res.send({method:"GET"}))
// router.post("/",(req,res)=>res.send({method:"POST"}))
// router.delete("/",(req,res)=>res.send({method:"DELETE"}))
// router.route("/")
// .get((req,res)=>res.send({method:"GET"}))
// .post((req,res)=>res.send({method:"POST"}))
// .put((req,res)=>res.send({method:"PUT"}))

const router=require("./routes/index")
app.use(router); //tanışma merasimi




