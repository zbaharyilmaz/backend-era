"use strict";
console.log("server");

require("dotenv").config(); //.env dosyasını kullanabilmek için dotenv modülünü dahil ettik.

const PORT = process.env?.PORT || 8001; //PORT değişkenini .env dosyasından alıyoruz. Eğer yoksa 3000 portunu kullanıyoruz.
const HOST = process.env?.HOST || "127.0.0.1";

console.log(PORT, HOST);
const http = require("http"); //http modülünü dahil et, node.js modülleri, node kurulumu ile gelen modüller.
const app = http.createServer((req, res) => {
  //  console.log("server is running");
  //  if(req.url== "/" ){
  //     res.end("<h1>Hello</h1>")
  //  }else if(req.url=="/blogs"){
  //     res.end("<h1>Blogs</h1>")
  //  } else if(req.url=="/newBlog"){
  //     res.end("<h1>New Blog</h1>")
  //  }
  if (req.url == "/") {
    if (req.method == "GET") {
      //default
      res.end("<h1>Welcome to Homepage</h1>");
    } else if (req.method == "POST") {
      res.statusCode = 400;   //default 200 dür.
      res.statusMessage = "can not post"; //asla Türkçe karakter kullanma. hata verir.
      res.end("can not post");
    } else if (req.method == "DELETE") {
      res.writeHead(405, "can not delete", {                  //diğer metod. writeHead 3 parametre alır. statuscode, status code mesaage, ...
        "Content-Type":"text/html",
        "another-header":"another content",
        "another-header1":"another content",
      });
      res.end("can not use the method")
    }
  }
  else if(req.url=="/list"){          //TODO : JSON.stringify(obj)
        const obj={
            "error":false,
            "message":"this is list page",
        }
        res.end(JSON.stringify(obj))
  }
});
app.listen(PORT, () => console.log(`server running: http://${HOST}:${PORT}`));
