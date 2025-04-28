const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
//* 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳 REQUIRED MIDDLEWARES 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//*Parse data
app.use(express.json);
//* Catch Async Error
require("express-async-errors");
//* DB Connection
// const dbConnection= require("./src/dbConnection")
// dbConnection(); yerine şöyle yaz:
require("./src/dbConnection")()
// 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//* Main Routes
app.all("/", (req,res)=>res.send("Welcome to Blog API"))
//* Blog Routes
app.use(require("./src/routes/blog.router"))
// 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
//* Error Handler
app.use(require("./src/middlewares/errorHandlers"))
// 🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
