const mongoose= require("mongoose");  //!Mongoose, Node.js ortamında MongoDB veritabanı ile etkileşim kurmak için kullanılan bir Object Data Modeling (ODM) kütüphanesidir. 
mongoose.connect(process.env.MONGOURI || "mongodb+srv://ylmzbhr1:Yabismillah@cluster.tf2fixb.mongodb.net/personnelAPI")
.then(()=>console.log("*DB Connected"))
.catch(()=>console.log("*DB Not Connected"))
module.exports=mongoose