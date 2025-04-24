"use strict";

/* Routes */
const express= require("express");
const app= express();

require("dotenv").config();
const PORT= process.env?.PORT || 8000;   // process.env.PORT ?? 8000

app.get("/", (req, res)=> {
    res.send("")
})

/* Listen */
app.listen(PORT, ()=>console.log("Running at: http://127.0.0.1:"+ PORT));

