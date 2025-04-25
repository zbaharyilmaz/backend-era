const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// http istekleri:
// app.METHOD(PATH, HANDLER)

//? app.get("/", (req, res)=> res.end("Hello get"))
//* app.post("/", (req, res)=>res.end("Hello post"))
//? app.put("/", (req, res)=> res.end("Hello put"))
//PUT genelde var olan veriyi tamamen güncellemek için kullanılır.
//* app.patch("/", (req, res)=> res.end("Hello patch"))
//PATCH genelde verinin bir kısmını güncellemek için tercih edilir.

//&  app.all("/", (req, res)=>res.end("Hello all"))
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
  .get((req, res) => res.send({ method: "GET" }))
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

app.listen(PORT, () => console.log("Running at : http://127.0.0.1:" + PORT));
