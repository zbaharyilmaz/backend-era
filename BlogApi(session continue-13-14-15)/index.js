const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
//* 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳 REQUIRED MIDDLEWARES 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//*Parse data
app.use(express.json());
//* Catch Async Error
require("express-async-errors");
//* DB Connection
// const dbConnection= require("./src/dbConnection")
// dbConnection(); yerine şöyle yaz:
require("./src/dbConnection")()
// 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
// Session Cookie
const session= require("cookie-session")
app.use(session({
    secret: process.env.PASS_SALT,
    //! maxAge: 1000 * 60 * 60 * 24   //1 gün
    //*session a süre verirsen, cookie ye döner. 1 day in miliseconds
}))
//User Control Midddleware
app.use(require("./src/middlewares/userControl"))
//Query Middleware
app.use(require("./src/middlewares/findSearchSortPagination"))


//🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//* Main Routes
app.all("/", (req,res)=>{
    res.send({
        message: "Welcome to Blog API",
        session:req.session,
 //boolean değer için !!

    })
    console.log(req.session);
})
//* Blog Routes
app.use("/blogs",require("./src/routes/blog.router"))
// 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//* User Routes
app.use("/users", require("./src/routes/user.router"))
//🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//Not Found Route
app.all("*", (req,res)=>
    res.status(404).send({
        error:true,
        message:"The route you are looking is not found"
    }))
//🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳

//* Error Handler
app.use(require("./src/middlewares/errorHandlers"))
// 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
//! Syncronization:(one run)
//require("./sync")()

