"use strict";

/* Routes */
const express= require("express");
const router= express.Router()   //Burada router adında bir mini uygulama tanımlıyoruz. Bu mini uygulama, dışarıdan gelen istekleri karşılayacak.
router.route("/")
.get((req,res)=>res.send({method:"GET"}))
.post((req,res)=>res.send({method:"POST"}))
.put((req,res)=>res.send({method:"PUT"}))

module.exports= router;
