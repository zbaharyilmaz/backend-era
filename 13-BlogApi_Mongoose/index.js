const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

app.use(express.json())
require("express-async-errors")

// const dbConnection= require("./src/db.connection")
// dbConnection()
require("./src/db.connection")
app.all("/", (req, res)=>{
    res.send("Welcome to Blog API")
})
app.use(require("./src/routes/blogController.router"))

app.use(require("./src/middlewares/errorHandlers"))

app.listen(PORT, ()=>console.log("Running at http://127.0.0.1:" + PORT))