const mongoose= require("mongoose")

const dbConnection=()=>{

    mongoose.connect(process.env.DB_URI)
    .then(()=> console.log("* DB connected"))
    .catch((err)=> console.log("Not connected", err))
}

module.exports =dbConnection;
