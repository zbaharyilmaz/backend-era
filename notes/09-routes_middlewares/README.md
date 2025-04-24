# Routes

 Initial commands;
* npm init -y
* npm i -D nodemon
* npm i express dotenv
* echo PORT=8000 > .env
* add .gitigore file

/* Alt shift A */

Coommand+F (terminalde arama)



Kullanıcı bir istek gönderir (GET, POST, PUT, vs)
         ⬇
Express sunucusu (router.js) bu isteği yakalar
         ⬇
`app.use(router)` ile routes/index.js'e yönlendirir
         ⬇
routes/index.js içindeki router.route("/") yakalar
         ⬇
Uygun HTTP metoduna göre (GET, POST, PUT) cevap döner
