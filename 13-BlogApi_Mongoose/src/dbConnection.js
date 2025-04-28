const mongoose= require("mongoose")

const dbConnection=()=>{

    // const uri= process.env.DB_URI
    // if(!uri) throw new Error("DB_URI not found.")

    mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/blogAPI" )

    .then(()=> console.log("* DB connected"))
    .catch((err)=> console.log("Not connected", err))
}

module.exports =dbConnection;
