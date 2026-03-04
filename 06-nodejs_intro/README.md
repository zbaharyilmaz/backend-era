# Backend-Era

npm init -y
node index.js
sudo npm install -g nodemon
npm i -D nodemon
npm i express dotenv
echo PORT=8000 > .env
add .gitignore file
nodemon
npm install express
npm install dotenv

🌐 Express Sunucu Kurulumu
const express = require("express");
const app = express();


📌 Node.js + Express Basic Server & Module Usage

Node.js ortamında bir web sunucusu oluşturuldu.

Express.js framework’ü kullanıldı.

module.exports ve require() ile modüler yapı kuruldu.

Tekli ve çoklu fonksiyon export etme yöntemleri öğrenildi.

Array destructuring ile export edilen fonksiyonlar kullanıldı.

"use strict" ile güvenli JavaScript modu aktif edildi.

🧱 Kullanılan Teknolojiler

Node.js

Express.js

Nodemon

🔐 Strict Mode

Kodun başında:

"use strict";

kullanılarak JavaScript’in Strict Mode özelliği aktif edildi.

Strict Mode sayesinde:

Tanımsız değişken kullanımında hata alınır.

Yanlışlıkla global değişken oluşturulması engellenir.

Daha güvenli ve hataya duyarlı kod yazılır.

🌐 Express Sunucu Kurulumu
const express = require("express");
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

Yapılanlar:

Express projeye dahil edildi.

app nesnesi oluşturuldu.

3000 portunda sunucu başlatıldı.

📦 Modül Yapısı
1️⃣ Tek Fonksiyon Export
module.exports = testFunct;

Tek bir fonksiyon dışa aktarılabilir.

2️⃣ Çoklu Fonksiyon Export
module.exports = {
  testing: testFunct,
  imrenbirth: birthday1,
  baharbirth: birthday2,
  numbers: [evenNumber, oddNumber],
  imren,
};

Birden fazla fonksiyon ve değişken obje yapısıyla export edildi.

📥 Destructuring ile Import
const { testing, imrenbirth, baharbirth, imren } = require("./module/module");

Export edilen fonksiyonlar ve değişkenler destructuring ile alındı.

📌 Array Destructuring Kullanımı
const {
  numbers: [oddNumber, evenNumber],
} = require("./module/module");

Export edilen array içindeki fonksiyonlar ayrı ayrı değişkenlere atandı.

🧠 Öğrenilen Konular

require() kullanımı

module.exports mantığı

Object export

Array export

Destructuring

Function declaration vs expression

Strict Mode

Basit Express server kurulumu


📌 Node.js Native HTTP Server & Environment Variables

Express kullanmadan, Node.js’in kendi http modülü ile bir web sunucusu oluşturduk.
Ayrıca .env dosyası kullanarak ortam değişkenlerini yönettik.

🔐 1️⃣ Strict Mode Aktifleştirildi
"use strict";

Daha güvenli JavaScript yazmak için aktif edildi.

Hataların daha erken yakalanmasını sağlar.

Yanlış global değişken kullanımını engeller.

🌱 2️⃣ dotenv ile Environment Variables Kullanımı
require("dotenv").config();

.env dosyasındaki değişkenleri projeye dahil ettik.

Port ve Host bilgilerini dışarıdan yönetilebilir hale getirdik.

const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

✔ Eğer .env içinde değer varsa onu kullanır
✔ Yoksa varsayılan değer kullanılır

Örnek .env:

PORT=3000
HOST=localhost
🌐 3️⃣ Node.js Native HTTP Server Oluşturduk
const http = require("http");

const app = http.createServer((req, res) => {
  ...
});

Node’un built-in http modülü kullanıldı.

createServer() ile sunucu oluşturuldu.

req → gelen istek

res → gönderilen cevap

🛣 4️⃣ Routing Mantığını Manuel Yazdık
Ana Sayfa /

GET → Welcome mesajı

POST → 400 hata döndürür

DELETE → 405 hata döndürür

if (req.url == "/") {
  if (req.method == "GET") {
    res.end("<h1>Welcome to Homepage</h1>");
  }
}

Burada:

res.statusCode

res.statusMessage

res.writeHead()

kullanımını öğrendik.

📦 5️⃣ JSON Response Gönderme
const obj = {
  error: false,
  message: "this is list page",
};

res.end(JSON.stringify(obj));

JavaScript objesi JSON formatına çevrildi.

API mantığının temeli atıldı.

🎯 6️⃣ Server Başlatma
app.listen(PORT, () =>
  console.log(`server running: http://${HOST}:${PORT}`)
);

Belirtilen host ve portta server çalıştırıldı.

Tarayıcıdan erişilebilir hale geldi.

🧠 Bu Projede Öğrenilenler

Node.js native http modülü

createServer() mantığı

Request (req) & Response (res) yapısı

HTTP Methods (GET, POST, DELETE)

Status Code & Status Message

Header gönderme (writeHead)

JSON response oluşturma

dotenv ile environment variable yönetimi

Strict Mode kullanımı

📌 Özetle

Bu projede Express kullanmadan:

✔ Kendi HTTP server’ımızı yazdık
✔ Route kontrolünü manuel yaptık
✔ HTTP method kontrolü yaptık
✔ Status code yönetimini öğrendik
✔ JSON response gönderdik
✔ .env ile port/host yönetimini dışarı aldık




