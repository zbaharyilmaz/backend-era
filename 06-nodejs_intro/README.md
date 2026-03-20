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
rs(nodemon için restart komutu)

## Package json varlığı: nodejs projesi göstergesidir.

- package.json nedir?

package.json, bir Node.js projesinin “kalbi” gibidir. İçinde şunlar bulunur:

Proje bilgileri: isim, versiyon, yazar, açıklama

Dependencies (bağımlılıklar): projede kullanılan npm paketleri

Scripts: çalıştırma veya build komutları (npm start, npm test)

Engines / config: Node sürümü veya özel ayarlar

Örnek:

{
"name": "my-app",
"version": "1.0.0",
"description": "A Node.js project",
"main": "index.js",
"scripts": {
"start": "node index.js"
},
"dependencies": {
"express": "^5.0.0"
}
}

- package.json varsa Node.js projesi demek

Node.js projelerinde npm (Node Package Manager) kullanılır

npm projelerinin temel göstergesi package.json dosyasıdır

Dosya varsa, proje Node.js tabanlıdır veya Node.js ekosisteminde geliştirilmiştir

⚠️ Not: package.json sadece Node.js projelerinde zorunlu değil, ama npm kullanan her proje mutlaka bunu içerir.

🌐 Express Sunucu Kurulumu
const express = require("express");
const app = express();

ÖZET:
🖥 1️⃣ Node.js Nedir?

Node.js = JavaScript’i tarayıcı dışında çalıştıran ortamdır.

Normalde JavaScript:

Sadece tarayıcıda çalışır (Chrome, Firefox)

Node.js sayesinde:

JS ile server yazabiliyoruz

Dosya okuyabiliyoruz

Database’e bağlanabiliyoruz

Yani:

Node.js = JavaScript’in bilgisayar tarafında çalışan versiyonu

🌐 2️⃣ Server Nedir?

Server = Sürekli açık duran ve gelen isteklere cevap veren program.

Sen şunu yazınca:

http.createServer(...)

şunu diyorsun:

"Ben hazırım. Biri gelirse cevap vereceğim."

🔢 3️⃣ Port Nedir?

Bilgisayarı bir apartman gibi düşün.

IP adresi = apartmanın adresi
Port = daire numarası

Örneğin:

http://localhost:8000

localhost → bu bilgisayar

8000 → o bilgisayardaki kapı (port)

Aynı bilgisayarda:

3000 portunda başka app

5000 portunda başka app

8000 portunda senin server olabilir

Port = uygulamanın dinlediği kapı

🏠 4️⃣ Host Nedir?

Host = Server’ın bulunduğu adres

Örnek:

127.0.0.1
localhost
192.168.1.5

127.0.0.1 → kendi bilgisayarın

Gerçek projede → domain olur (örn: google.com)

📩 5️⃣ req Kim Atar?

req = request (istek)

İsteği kim atar?

Tarayıcı

Postman

Başka bir frontend uygulaması

Mobil app

Başka bir server

Mesela sen tarayıcıya şunu yazınca:

http://localhost:8000/list

Tarayıcı bir HTTP isteği gönderir.

Bu istek server’a gelir.

O istek = req

📤 6️⃣ res Kim Verir?

res = response (cevap)

Server cevabı verir.

res.end("Hello")

Bu şu demek:

"Tamam isteğini aldım, işte cevabın."

🔁 Olayın Akışı
Tarayıcı → Request (req) → Server
Tarayıcı ← Response (res) ← Server
🧠 7️⃣ Arada Yardımcı Olan Şeyler Ne?

- HTTP Protokolü

İnternette konuşma dili.

Kuralları belirler:

GET nedir

POST nedir

Status code nedir (200, 404, 500)

- Node http Modülü

Node’un içindeki araç.

Şunu sağlar:

http.createServer()

Yani:

“Server oluşturma makinesi”

Express (kullanırsan)

Node’un işini kolaylaştırır.

Senin yazdığın:

if(req.url == "/")

Express’te:

app.get("/")

olur.

🎯 Şu Anda Sen Ne Yapıyorsun?

Sen:

Bilgisayarında bir kapı açıyorsun (port)

Orada bekleyen bir görevli koyuyorsun (server)

Gelen isteğe göre cevap yazıyorsun

🏗 Gerçek Dünya Örneği

Restoran:

Müşteri → Sipariş verir (req)

Garson → Mutfağa iletir

Mutfak → Yemeği hazırlar

Garson → Müşteriye getirir (res)

Server = Mutfak
Frontend = Müşteri salonu

API = Server’ın dış dünyaya açtığı veri kapılarıdır.
Node.js → Server yazmanı sağlar
Server → İstek dinler
Route (/list) → API endpoint

- Endpoint’lerin tamamı → API

Menü = API

Menüdeki her yemek = Endpoint

Sipariş = Request

Yemek = Response

💡 En Net Özet

Node.js → JS’i server’da çalıştırır
Server → İstek dinler
Port → Hangi kapıda beklediğini belirler
Host → Server’ın adresi
req → Gelen istek
res → Verilen cevap

---

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

## Note

Layer Format
JavaScript Object
API JSON
NoSQL Document
SQL Table

## Network Transfer → JSON

API iletişiminde veri:

👉 JSON formatına serialize edilir.
Neden JSON?

Lightweight

Language independent

Standard web format

---

Backend memory → object

Network transfer → JSON

Database → storage format
