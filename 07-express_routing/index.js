//! Express is microframework for Node.js

const express = require("express");  //! express modülünü projemize dahil eder. express, Node.js için popüler bir web framework'üdür ve web uygulamaları geliştirmek için kullanılır.
const app = express();   //! express() → Express uygulaması (instance) oluşturur. app → artık bu uygulamayı temsil eden değişken. app → Server instance’ı (bellekte çalışan örnek)
//!Bu app üzerinden server’ı kontrol edebiliriz: Route ekleyebiliriz → /, /users vs. Middleware ekleyebiliriz. Server’ı başlatabiliriz
require("dotenv").config();

const PORT = process.env?.PORT || 8000;

//& HTTP Methods
// app.METHOD(PATH, HANDLER)

app.get("/", (req, res)=> res.end("Hello get"))
app.post("/", (req, res)=>res.end("Hello post"))
app.put("/", (req, res)=> res.end("Hello put"))
//PUT genelde var olan veriyi tamamen güncellemek için kullanılır.
app.patch("/", (req, res)=> res.end("Hello patch"))
//PATCH genelde verinin bir kısmını güncellemek için tercih edilir.

// app.all("/", (req, res)=>res.end("Hello all"))
// app.all() metodu, belirtilen URL'ye gelen tüm HTTP isteklerini yakalamak için kullanılır.

//& Response Methods
app.get("/", (req, res) => {
  // res.sendStatus(201) yerine res.status(201) kullanabiliriz.
  // res.send({
  //     message: "Bad Request",
  // })
  //*Bunlar yerine de res.status.send kullan.
  res.status(202).send({
    message: "Response Methods",
  });
});

// Extra Methods
app.get("/download", (req,res)=> res.download("./index.js", "algulumvergulum.js"));


app
  .route("/")
  .get((req, res) => res.send({ method: "GET" }))  // res.send ile object gönderebiliriz, Express bunu otomatik olarak JSON formatına çevirir.
//! Express.js şu kodu gördüğünde: es.send({ method: "GET" }) arka planda şu işlemi yapar: JSON.stringify({ method: "GET" })
// Sonuç: {"method":"GET"} anahtarlar tırnak içine alınır ve bu artık bir stringtir. 
// JavaScript object: { method: "GET" } JSON’a çevrildiğinde: {"method":"GET"}


  .post((req, res) => res.send({ method: "POST" }))
  .put((req, res) => res.send({ method: "PUT" }))
  .delete((req, res) => res.send({ method: "DELETE" }));

app.get("/", (req, res) => res.send("in 'root' path"));
app.get("/path", (req, res) => res.send("in path"));
//express-urls supported JOKERCHAR
app.get("/abc(x?)123", (req, res) => res.send("in abc(x?)123"));
app.get("/abc(x+)123", (req, res) => res.send("in abc(x+)123"));
app.get("/abc*123", (req, res) => res.send("in abcbahar123"));
app.get("/path", (req, res) => res.send("in path"));
//express-urls supported REGEXP
// app.get(/xyz/, (req,res)=>res.send("in /xyz/"));
app.get(/^\/xyz/, (req, res) => res.send("starts with /xyz/")); //starts with xyz
app.get(/xyz$/, (req, res) => res.send("ends with /xyz/")); //ends with xyz

//TODO URL PARAMETERS
app.get("/blogs/:blogId/:author/search", (req, res) => {
  console.log(req); //  params: { blogId: '123', author: 'nur' }, query: { title: 'whatisexpress' },
  res.send({
    params: req.params,
    blogId: req.params.blogId,
    author: req.params.author,
    queries: req.query,
    title: req.query.title,
    url: {
      protocol: req.protocol,
      subdomain: req.subdomains,
      hostname: req.hostname,
      path: req.path,
      origialUrl: req.originalUrl,
    },
  });
});



app.listen(PORT, () => console.log("Running at : http://127.0.0.1:" + PORT));  //! app.listen(PORT) → Server’ı çalıştırır ve dinlemeye başlar. Express ile yazılan API servis ayağa kaldıırldı.



//& NOTE

//! Node.js http vs Express Server

//Node.js http server               Express server (app)
/* const http = require("http");      const express = require("express");
const server = http.createServer(  const app = express();
  (req, res) => {                  app.get("/", (req, res) => {
    if (req.url === "/") {           res.send("Hello World");
      res.end("Hello World");      });
    }
  }
);                                app.listen(3000, () => console.log("Server running"));
server.listen(3000);

!Farklar:
Özellik	Node.js http	Express
Server oluşturma	http.createServer()	express() → app instance
Route yönetimi	Manual if(req.url ...)	app.get(), app.post()
Middleware desteği	Yok / manuel	Built-in / kolay eklenir
Kod okunabilirliği	Daha uzun / manuel	Kısa ve temiz
Development kolaylığı	Az	Çok kolay
🔑 Özet

Node.js http → low-level, daha fazla kod, her şeyi manuel yapman gerekir

Express (app) → high-level, server’ı daha kolay kurar ve yönetir

app → artık senin server’ın “çalışan örneği” */

//!comment
/* single line comment: Cmd + 
multi-line comment: Shift + Option + A */

