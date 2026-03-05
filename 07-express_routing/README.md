# Express & Routing

Initial commands;

- npm init -y
- npm i -D nodemon
- npm i express dotenv
- echo PORT=8000 > .env
- add .gitigore file

/_ Alt shift A _/

Coommand+F (terminalde arama)

## Environment Variables

# Backend

Secret keys, database passwords, and other sensitive data are stored in the .env file.

Important: These values are never exposed to the frontend.

Access in Node.js:

require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;

# Frontend

Only values that the client needs to know should be stored in environment variables, such as:

API URLs

Ports

Feature flags

Example in React:

REACT_APP_API_URL=http://localhost:8000

Access in code:

fetch(process.env.REACT_APP_API_URL + "/users")

Note: Frontend environment variables are visible to anyone who can access the app.

## MVC(Model View Controller)

Database-Model(database boss)-Controller-View

database-model= data layer
controller=brain(logic layer)
view=presentation layer(UI)-with just backend

🧱 Katmanları Netleştirelim
1️⃣ Model (Data Layer)

Database ile konuşur

Veri yapısını tanımlar

CRUD işlemleri yapar

Örnek:

User modeli

Product modeli

2️⃣ Controller (Logic Layer)

İstek alır (req)

İş mantığını çalıştırır

Model’i kullanır

Sonucu View’a yollar

Controller = beynin kendisi

3️⃣ View (Presentation Layer)

View = Kullanıcıya gösterilen şey.

Ama bu 2 şekilde olabilir:

🖥 1️⃣ Server-Side Rendering (Klasik MVC)

Eskiden backend HTML üretirdi.

Örneğin:

PHP

ASP.NET

Django

Express + EJS

Burada View gerçekten şudur:

HTML template dosyası

Evet 👇
EJS tam olarak bir View örneğidir.

Mesela:

res.render("index.ejs", { name: "Zeynep" })

Controller çalışır

Model’den veri alır

View (EJS) HTML üretir

Tarayıcıya gönderilir

Bu gerçek MVC’dir.

🌐 2️⃣ Modern Yapı (API + React)

Bugün genelde şu yapılır:

Backend:

Sadece JSON döner

View yoktur

Frontend:

React / Vue / Angular

UI burada oluşturulur

Bu durumda:

Backend'te View yoktur.

Çünkü UI frontend’dedir.

🔁 Senin Öğrendiğin Yapı

Şu an Node ile API yazıyorsan:

Model → database

Controller → logic

View → YOK (sadece JSON dönüyorsun)

Yani bu aslında:

MVC değil, REST API mimarisi

🧠 Özetle
Durum View Nerede?
Express + EJS Backend’te
React + Node API Frontend’te
Sadece Node API View yok

Backend tarafındaki View:

👉 EJS gibi template engine’lerdir.
👉 HTML üreten dosyalardır.

Ama modern projelerde genelde backend sadece API olur, View frontend’dedir.

---

http request- API call- router tarafından karşılanır- controller istege bakar, modele istek yollar isteneni- model database ile iletişim kurar, istenen veri doğrultusunda - veri array veya obje cinsinden gelir; frontendin istediği kısma dönüüştürülür- http response (html)

🔁 HTTP Request Akışı (Backend Perspektifi)

HTTP Request / API Call

Frontend veya başka bir client, server’a istek gönderir.

Örnek:

fetch("http://localhost:8000/users")

Bu, HTTP request veya API call olarak adlandırılır.

Router / Route

Server, gelen isteği hangi endpoint’in (route) karşılayacağını belirler.

Örnek Express:

app.get("/users", userController.listUsers)

Controller

Route’a gelen isteği işler.

İstek methodunu (GET, POST) ve parametreleri kontrol eder.

İş mantığını uygular ve model’e veri talebi gönderir.

Controller = “Beyin”

Model

Controller’dan gelen isteği alır.

Database ile iletişim kurar.

CRUD işlemleri yapar: Create, Read, Update, Delete

Model = “Data Layer”

Database

Model’den gelen talebi gerçekleştirir.

İstenen veri gelirse controller’a geri gönderir.

Veri array veya obje formatında olabilir.

Controller → Frontend’e Hazırlar

Model’den gelen ham veriyi frontend’in anlayacağı şekilde (JSON veya HTML) formatlar.

HTTP Response

Server controller’dan gelen veriyi client’a gönderir.

JSON veya HTML olabilir.

Frontend bunu alır ve kullanıcıya gösterir.

🌐 Örnek Basit Akış
Frontend (React / Tarayıcı)
│
│ HTTP GET /users
▼
Server (Node.js + Express)
│
Router → /users
│
Controller → userController.listUsers
│
Model → UserModel.findAll()
│
Database → MongoDB / MySQL / PostgreSQL
│
Data (Array/Object)
│
Controller → JSON formatla
▼
HTTP Response → Frontend
│
Frontend render → Kullanıcı ekranı
🔑 Özet

HTTP Request / API Call → İstek

Router → Hangi controller çalışacak

Controller → Mantık, model çağrısı

Model → Database işlemleri

Database → Veri

HTTP Response → Cevap

Frontend → Ekrana gösterir

---

## Structure of Url

URL = Uniform Resource Locator

İnternette bir kaynağın (resource) adresi.

Örnek:

http://localhost:8000/users/123?sort=asc

Bunu parçalayalım:

2️⃣ URL’nin Parçaları
Parça Örnek Açıklama
Protocol / Scheme http:// İletişim protokolü (http / https)
Host / Domain localhost Server’ın adresi
Port 8000 Hangi kapıda dinlendiği
Path / Route /users/123 Kaynağın yolu (endpoint)
Query String ?sort=asc Opsiyonel parametreler, filtreler
Fragment #section1 Sayfa içi yönlendirme, genelde frontend

1️⃣ Protocol: HTTP / HTTPS

URL’deki ilk kısım protokolü gösterir:

http://localhost:8000
https://www.google.com

HTTP → HyperText Transfer Protocol

İnternet üzerinden veri taşımak için standart protokol

Güvensiz, veri şifrelenmez

HTTPS → HTTP Secure

Veriler şifreli olarak gider

Günümüzün standart güvenli protokolü

2️⃣ Protokol Ne İşe Yarar?

Veri gönderme/alma kurallarını belirler

Tarayıcı ve server’ın aynı dili konuşmasını sağlar

Hangi port kullanılacağını, mesaj formatını ve response kodlarını belirler

3️⃣ URL Backend Perspektifi

Backend’te genelde path (route) ve query önemli:

/users → tüm kullanıcıları getir

/users/123 → id=123 olan kullanıcıyı getir

/users?sort=asc → kullanıcıları sıralı getir

4️⃣ RESTful API Örnekleri
HTTP Method URL (Route) Ne İşe Yarar
GET /users Tüm kullanıcıları al
GET /users/123 ID 123 kullanıcıyı al
POST /users Yeni kullanıcı ekle
PUT /users/123 ID 123 kullanıcıyı güncelle
DELETE /users/123 ID 123 kullanıcıyı sil
5️⃣ URL + Controller + Model
GET /users/123 → Router → Controller.listUser → Model.findById(123) → Database → Response




NOT:

MVC veri akışı (en net şema)
Frontend
   │
   │ HTTP Request
   ▼
Router
   │
   ▼
Controller
   │
   ▼
Model
   │
   ▼
Database
   │
   ▼
Model
   │
   ▼
Controller
   │
   ▼
JSON Response
   │
   ▼
Frontend