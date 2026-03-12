## Models and Sequelize

- npm init -y
- npm i express dotenv express-async-errors
- npm i sequelize
- npm i sqlite3 (hangi veritabanı kullanacaksan)

## MVC: Model View Controller

- Model: Data CRUD işlemleri(Veritabanı Tablosu)(Data Structure tanımlanması, datanın rastgele olmaması, kurallı data yapısı, nasıl bir data istiyorum; modelle denetle.)
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

Katman Görev Örnek
Model Veri + CRUD User.find(), Post.create()
View Kullanıcı arayüzü HTML, React component, EJS template
Controller Mantık + yönlendirme Route handler, validation, middleware kullanımı

## ORM

Bir translator gibi çalışır.
Objects ➡️ ORM ➡️ SQL (model ile database arasında ORM)
Dili çeviren aradaki yazılıma ORM denir.

Orm kullanımı ; projeyi farklı bir database e taşıak noktasında bize kolaylık sağlar.

## Sequelize

ORM for nodejs
It supports relational databases, such as MySql, SqLite, PostgreSQl
Sequlize Modülü: neden kullandık? - SQL kullanmadan veritabanı işlemleri yapayım; ORM bu imkanı versin. Sequelize bir orm yazılımıdır.SQL olmadan veri tabanı işlemleri yapabilmek.
Bu node.js projesinde Model ve ORM yapısı için Sequelize kullanıyoruz. Sequelize; SQL Veritabanları için kullanılabilen bir ORM modülüdür. Birçok veritabanını destekler. Komutları MongoDB komutlarına çok benzer.

Not: prisma da bir orm dir.

## ERD (Entity Relation Diagram)-veritabanı yol haritası(tablo dökümü ve ilişkiler)

ERD (Entity-Relationship Diagram / Varlık-İlişki Diyagramı), bir veritabanındaki varlıkları (tablolar) ve bunlar arasındaki ilişkileri görselleştiren diyagramdır.

Entity (Varlık) → tabloyu temsil eder

Attributes (Özellikler) → tablo sütunları

Relationship (İlişki) → tablolar arasındaki bağlantı (1-1, 1-N, N-M)

- ERD neden kullanılır?

Veritabanı tasarımını görselleştirir

Tablo ve ilişki yapısını net gösterir

Kompleks projelerde veri akışını ve ilişkileri anlamayı kolaylaştırır

Backend geliştirme ve database migration planlamasında yol gösterir

## Data Types:

https://sequelize.org/docs/v7/models/data-types/

# Sequelize

- Model oluşturmak,
- Senkronize etmek,
- Authentication yapmak için kullanılır.
