const mongoose= require("mongoose");
mongoose.connect(process.env.MONGOURI || "mongodb+srv://ylmzbhr1:Yabismillah@cluster.tf2fixb.mongodb.net/personnelAPI ")
.then(()=>console.log("*DB Connected"))
.catch(()=>console.log("*DB Not Connected"))
module.exports=mongoose