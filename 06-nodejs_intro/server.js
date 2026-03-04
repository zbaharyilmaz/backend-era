"use strict";
console.log("server");

//npm install dotenv

require("dotenv").config();
//!.env dosyasını kullanabilmek için dotenv modülünü dahil ettik.

const PORT = process.env?.PORT || 8000; //PORT değişkenini .env dosyasından alıyoruz. Eğer yoksa 3000 portunu kullanıyoruz.
const HOST = process.env?.HOST || "127.0.0.1";

console.log(PORT, HOST);

const http = require("http"); //node içinden http modülünü dahil et, node.js modülleri, node kurulumu ile gelen modüller.
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
      res.statusCode = 400; //default 200 dür.
      res.statusMessage = "can not post"; //asla Türkçe karakter kullanma. hata verir.
      res.end("can not post");
    } else if (req.method == "DELETE") {
      res.writeHead(405, "can not delete", {
        //diğer metod. writeHead 3 parametre alır. statuscode, status code mesaage, ...
        "Content-Type": "text/html", // yanıtın içeriğinin türünü belirtir. Bu örnekte, yanıtın HTML formatında olduğunu belirtiyoruz.
        "another-header": "another content", //bu örnekte, "another-header" adlı özel bir başlık ekliyoruz ve değerini "another content" olarak belirtiyoruz.
        "another-header1": "another content",
      });
      res.end("can not use the method");
    }
  } else if (req.url == "/list") {
    //JSON.stringify(obj)

    // default status code 200 dür. yani başarılı bir şekilde yanıt verildiğini belirtir.
    const obj = {
      error: false,
      message: "this is list page",
    };
    res.end(JSON.stringify(obj));
  }
});
app.listen(PORT, () => console.log(`server running: http://${HOST}:${PORT}`)); // belirtilen host ve portta server çalışıyor.
