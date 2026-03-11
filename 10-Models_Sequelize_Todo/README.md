## Models and Sequelize

- npm init -y
- npm i express dotenv express-async-errors
- npm i sequelize
- npm i sqlite3 (hangi veritabanı kullanacaksan)

## MVC: Model View Controller

- Model: Data CRUD işlemleri(Veritabanı Tablosu)(Data Structure tanımlanması) 
- View: Frontend ve Template
- Controller: Kontrol logic


## 1️⃣ Model

Veri ve veri yapısını temsil eder

Database ile doğrudan ilişkili: tablolar, collectionlar

CRUD işlemleri burada tanımlanır (Create, Read, Update, Delete)

Örnek: User model → kullanıcı verilerini tutar, veritabanına sorgu atar

Model = Veritabanı + Data Logic


## 2️⃣ View

Kullanıcıya gösterilen kısım (UI / frontend)

Template veya frontend framework (React, Vue, EJS vb.)

Sadece veri gösterir, iş mantığı içermez

View = HTML / CSS / JS + Template

## 3️⃣ Controller

İş mantığı ve yönlendirme burada olur

Model’den veri alır, View’a iletir

Request ve Response yönetimini yapar

Örnek: /users endpoint → Controller: kullanıcıyı getir, iş kurallarını uygula, view’a gönder

Controller = Route logic + Business logic


## Özet
Katman	Görev	Örnek
Model	Veri + CRUD	User.find(), Post.create()
View	Kullanıcı arayüzü	HTML, React component, EJS template
Controller	Mantık + yönlendirme	Route handler, validation, middleware kullanımı

## ORM

Objects ➡️ ORM ➡️ SQL

Dili çeviren aradaki yazılıma ORM denir.
Sequlize ORM yazılımıdır.
Bir veritabanından başka bir veritabanına geçisi sağlar.
SQL olmadan veri tabanı işlemleri yapabilmek.

## ERD (Entity Relation Diagram)

Veritabanı tablo olarak dökümünü bize tablo olarak verebilecek yapıdır.

Note: Bir node.js projesinde Model ve ORM yapısı için Sequelize kullanıyoruz. Sequelize; SQL Veritabanları için kullanılabilen bir ORM modülüdür. Birçok veritabanını destekler. Komutları MongoDB komutlarına çok benzer.

## Data Types:

https://sequelize.org/docs/v7/models/data-types/

# Sequelize

* Model oluşturmak,
* Senkronize etmek,
* Authentication yapmak için kullanılır.