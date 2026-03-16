## SQL ↔ MongoDB Karşılaştırma Tablosu

| SQL                  | MongoDB             |
| -------------------- | ------------------- |
| `CREATE DATABASE db` | `use db`            |
| `DROP DATABASE db`   | `db.dropDatabase()` |
| `SHOW DATABASES`     | `show dbs`          |

# Tables / Collections

| SQL                  | MongoDB                        |
| -------------------- | ------------------------------ |
| `CREATE TABLE users` | `db.createCollection("users")` |
| `SHOW TABLES`        | `show collections`             |
| `DROP TABLE users`   | `db.users.drop()`              |

# Insert (CREATE)

| SQL                                     | MongoDB                              |
| --------------------------------------- | ------------------------------------ |
| `INSERT INTO users VALUES (...)`        | `db.users.insertOne({...})`          |
| `INSERT INTO users VALUES (...), (...)` | `db.users.insertMany([{...},{...}])` |

# Select (READ)

| SQL                                | MongoDB                       |
| ---------------------------------- | ----------------------------- |
| `SELECT * FROM users`              | `db.users.find()`             |
| `SELECT name FROM users`           | `db.users.find({}, {name:1})` |
| `SELECT * FROM users WHERE age=20` | `db.users.find({age:20})`     |

db.coll3.find({ age: 15 }) // geçerli
db.coll3.find({ "age": 15 }) // geçerli
db.coll3.find({ 'age': 15 }) // geçerli

db.coll3.find({ "first name": "Test" }) // space va veya özel karakter içeriyorsa → tırnak gerekli

# Comparison

| SQL      | MongoDB |
| -------- | ------- |
| `=`      | `$eq`   |
| `!=`     | `$ne`   |
| `>`      | `$gt`   |
| `>=`     | `$gte`  |
| `<`      | `$lt`   |
| `<=`     | `$lte`  |
| `IN`     | `$in`   |
| `NOT IN` | `$nin`  |

Örnek:

SQL

SELECT \* FROM users WHERE age > 18

MongoDB

db.users.find({ age: { $gt: 18 } })

# Logical Operators

| SQL   | MongoDB |
| ----- | ------- |
| `AND` | `$and`  |
| `OR`  | `$or`   |
| `NOT` | `$not`  |

Örnek

SQL

SELECT \* FROM users WHERE age=20 AND city='Paris'

MongoDB

db.users.find({
$and: [
{ age: 20 },
{ city: "Paris" }
]
})

# MongoDB Filter Rehberi

| Durum                                   | Örnek                                                          | Açıklama                                                        |
| --------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| **Basit eşitlik**                       | `{ age: 15 }` veya `{ "age": 15 }`                             | age = 15 olan kayıtlar. Tırnak opsiyonel.                       |
| **Eşit değil**                          | `{ age: { $ne: 15 } }`                                         | age ≠ 15 olan kayıtlar. `$ne` daha okunaklı.                    |
| **Büyüktür / Küçüktür**                 | `{ age: { $gt: 18 } }` / `{ age: { $lt: 18 } }`                | `$gt` > , `$lt` <                                               |
| **Büyük eşit / Küçük eşit**             | `{ age: { $gte: 18 } }` / `{ age: { $lte: 18 } }`              | `$gte` ≥ , `$lte` ≤                                             |
| **Operatörleri NOT ile kullanma**       | `{ age: { $not: { $eq: 15 } } }`                               | age ≠ 15. `$ne` ile aynı.                                       |
| **AND (ve) mantığı**                    | `{ firstName: "Test6", age: 16 }`                              | Virgülle yazmak zaten AND.                                      |
| **AND explicit**                        | `{ $and: [ { firstName: "Test6" }, { age: 16 } ] }`            | Aynı sonucu verir, bazen karmaşık mantık için tercih edilir.    |
| **OR (veya) mantığı**                   | `{ $or: [ { firstName: "Test6" }, { age: 15 } ] }`             | firstName = "Test6" veya age = 15 olanları getir.               |
| **Regex (desen arama)**                 | `{ firstName: /Test/ }`                                        | firstName içinde "Test" geçenleri getir (case-sensitive).       |
| **Belirli alanları seçme (Projection)** | `db.coll.find({ age: { $gt: 15 } }, { firstName: 1, _id: 0 })` | Sorgu filtreyi uygular, sadece firstName gösterir, id gizlenir. |

- Not:

* {} içinde birden fazla koşul varsa virgül ile yazabilirsin → AND mantığı.

* $and ve $or kullanımı karmaşık koşullarda okunabilirlik için tercih edilir.

* Tırnaklar çoğu zaman opsiyoneldir, ama field adı boşluk, özel karakter veya sayı ile başlıyorsa zorunlu.

* Operatör kullanıyorsan { field: { $op: value } } şeklinde iç obje gerekir.

# Update

| SQL                                        | MongoDB                                            |
| ------------------------------------------ | -------------------------------------------------- |
| `UPDATE users SET age=25 WHERE name='Ali'` | `db.users.updateOne({name:"Ali"},{$set:{age:25}})` |

Örnek

db.users.updateOne(
{ name: "Ali" },
{ $set: { age: 25 } }
)

# Delete

| SQL                              | MongoDB                         |
| -------------------------------- | ------------------------------- |
| `DELETE FROM users WHERE age=20` | `db.users.deleteMany({age:20})` |
| `DELETE FROM users WHERE id=1`   | `db.users.deleteOne({_id:1})`   |

# Limit

| SQL                           | MongoDB                    |
| ----------------------------- | -------------------------- |
| `SELECT * FROM users LIMIT 5` | `db.users.find().limit(5)` |

# Pagination

| SQL                 | MongoDB             |
| ------------------- | ------------------- |
| `LIMIT 5 OFFSET 10` | `skip(10).limit(5)` |

db.users.find().skip(10).limit(5)

# Sort

| SQL                 | MongoDB          |
| ------------------- | ---------------- |
| `ORDER BY age ASC`  | `sort({age:1})`  |
| `ORDER BY age DESC` | `sort({age:-1})` |

db.users.find().sort({ age: -1 })

# Count

| SQL                          | MongoDB                     |
| ---------------------------- | --------------------------- |
| `SELECT COUNT(*) FROM users` | `db.users.countDocuments()` |

## Backend açısından kritik fark

SQL

table → row → column

MongoDB

collection → document → field

Document yapısı JSON benzeridir:

{
"firstName": "Ali",
"lastName": "Veli",
"age": 25
}

- Backend geliştiricilerin %90’ının kullandığı MongoDB query pattern:

find
findOne
insertOne
updateOne
deleteOne
sort
limit
skip

## AGGREGATION PIPELINE

Aggregation Pipeline, SQL’deki GROUP BY, SUM, AVG gibi işlemlerin karşılığıdır. Veri adım adım işlenir. Her adım bir “stage”tir. Bu özellik MongoDB içinde güçlü veri analizini sağlar.

Temel yapı
db.collection.aggregate([
{ stage1 },
{ stage2 },
{ stage3 }
])

Pipeline mantığı:

data → stage → stage → stage → result
En çok kullanılan aggregation stage’leri
| Stage | Görev |
| ---------- | -------------------------------- |
| `$match` | filtreleme (WHERE) |
| `$group` | gruplayarak hesaplama (GROUP BY) |
| `$project` | alan seçme |
| `$sort` | sıralama |
| `$limit` | limit |
| `$skip` | pagination |
| `$count` | kayıt sayısı |
| `$unwind` | array parçalama |
| `$lookup` | join |

# SQL → MongoDB örnekleri

- GROUP BY

SQL

SELECT age, COUNT(\*)
FROM users
GROUP BY age

MongoDB

db.users.aggregate([
{
$group: {
_id: "$age",
count: { $sum: 1 }
}
}
])

- SUM

SQL

SELECT SUM(age) FROM users

MongoDB

db.users.aggregate([
{
$group: {
_id: null,
totalAge: { $sum: "$age" }
}
}
])

- AVG

SQL

SELECT AVG(age) FROM users

MongoDB

db.users.aggregate([
{
$group: {
_id: null,
averageAge: { $avg: "$age" }
}
}
])

- MAX / MIN

MongoDB

db.users.aggregate([
{
$group: {
_id: null,
maxAge: { $max: "$age" },
minAge: { $min: "$age" }
}
}
])

- WHERE + GROUP BY

SQL

SELECT age, COUNT(\*)
FROM users
WHERE age > 18
GROUP BY age

MongoDB

db.users.aggregate([
{
$match: { age: { $gt: 18 } }
},
{
$group: {
_id: "$age",
count: { $sum: 1 }
}
}
])

- SELECT specific fields
  db.users.aggregate([
  {
  $project: {
  name: 1,
  age: 1,
  _id: 0
  }
  }
  ])
- ORDER BY
  db.users.aggregate([
  { $sort: { age: -1 } }
  ])
- LIMIT
  db.users.aggregate([
  { $limit: 5 }
  ])
- Pagination
  db.users.aggregate([
  { $skip: 10 },
  { $limit: 5 }
  ])
- COUNT
  db.users.aggregate([
  { $count: "totalUsers" }
  ])
- JOIN (lookup)

MongoDB’de join karşılığı $lookup.

SQL

SELECT \*
FROM orders
JOIN users
ON orders.user_id = users.id

MongoDB

db.orders.aggregate([
{
$lookup: {
from: "users",
localField: "user_id",
foreignField: "_id",
as: "user"
}
}
])

# Gerçek backend pipeline örneği

db.users.aggregate([
{ $match: { age: { $gt: 18 } } },

{ $group: {
      _id: "$age",
total: { $sum: 1 }
}},

{ $sort: { total: -1 } },

{ $limit: 5 }
])

Akış:

filter → group → sort → limit

Backend geliştiricilerin en çok kullandığı aggregation stage’leri
$match
$group
$project
$sort
$limit
$skip
$lookup

Backend’de kritik üç MongoDB konusu vardır:

Indexes (çok büyük performans farkı)

Aggregation pipeline

Schema design
