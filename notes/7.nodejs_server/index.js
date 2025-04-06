console.log("server");

require("dotenv").config() //.env dosyasını kullanabilmek için dotenv modülünü dahil ettik.

const PORT = process.env?.PORT || 8000 //PORT değişkenini .env dosyasından alıyoruz. Eğer yoksa 3000 portunu kullanıyoruz.
const HOST= process.env?.HOST  || "127.0.0.1"

console.log(PORT, HOST);
const http= require("http") //http modülünü dahil et, node.js modülleri, node kurulumu ile gelen modüller. 
const app= http.createServer((req, res)=>{
 console.log("server is running");
})
app.listen(PORT, ()=>console.log(`server running: http://${HOST}:${PORT}`))
if(req.url=="/"){
    res.end(" <h1>Welcome FS18 </h1>")
}else if(req.url=="/blogs"){
    res.end("<h1>Blogs</h1>")

}