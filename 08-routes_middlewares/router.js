"use strict"; // Modern JavaScript hatalarını yakalamak için kullanılır.

/* Routes */

//! Express is microframework for Node.js

const express = require("express"); //! express modülünü projemize dahil eder. express, Node.js için popüler bir web framework'üdür ve web uygulamaları geliştirmek için kullanılır.
const app = express(); //! express() → Express uygulaması (instance) oluşturur. app → artık bu uygulamayı temsil eden değişken. app → Server instance’ı (bellekte çalışan örnek)
//!Bu app üzerinden server’ı kontrol edebiliriz: Route ekleyebiliriz → /, /users vs. Middleware ekleyebiliriz. Server’ı başlatabiliriz
require("dotenv").config(); //! .env dosyasındaki değişkenleri process.env içine yükler. Bu sayede uygulama içinde bu değişkenlere erişebiliriz.

const PORT = process.env.PORT ?? 8000;

// app.get()	Tek bir HTTP methodu
// app.route()	Aynı route için birden fazla method

//app.route("/").get((req, res)=> {
//res.send({
// method: "GET" })})
//? GET request için route tanımlandı.
//*bunun yerine de aşağıdaki gibi yazabiliriz. app.route() → Belirli bir rota için birden fazla HTTP metodunu zincirleme olarak tanımlamamıza olanak tanır. Bu, kodun daha düzenli ve okunabilir olmasını sağlar.

//& ROUTER
//? Router is a special app for URL control in ExpressJS. It allows us to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

const router = express.Router(); //Bu satır mini bir route sistemi oluşturur. express.Router() küçük bir router objesi üretir. router instance'ı, uygulamanın geri kalanından bağımsız olarak kendi middleware'lerini ve route'larını tanımlamamıza olanak tanır. Bu, kodun daha modüler ve organize olmasını sağlar. Router'lar, uygulamanın farklı bölümlerini yönetmek için kullanılabilir, örneğin kullanıcı işlemleri, ürün işlemleri gibi.
// router.get("/", (req, res) => res.send({ method: "GET" })); //! anlamı: Client → GET / → router yakalar → response gönderilir. Eğer "/" endpointine GET request gelirse şu fonksiyon çalışsın.
// router.post("/", (req, res) => res.send({ method: "POST" }));
// router.delete("/",(req,res)=>res.send({method:"DELETE"}))
//!yerine router.route("/") → aynı endpoint için route başlatır sonra metodlar zincirlenir.
//router.route("/")
//.get((req,res)=>res.send({method:"GET"}))
//.post((req,res)=>res.send({method:"POST"}))
//.put((req,res)=>res.send({method:"PUT"}))
//! yerine dosya aç.

//const router = require("./routes/index");
app.use(router); //! tanışma merasimi (after finished route design, it will call it in app.use())

app.listen(PORT, () => {
  console.log("Running at : http://127.0.0.1:" + PORT); //yani localhostta çalışıyor.
});
