/*
 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 TERMINAL 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
mongosh (mongosh terminaline giriş)
help
cls   // ekran temizleme
exit
quit
.exit

🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 DATABASE 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
show dbs
show databases
use database_name
db.dropDatabase() (database silme)

🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 COLLECTIONS(TABLES)🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
show collections //* (tab a basıp otomatik tamamla yap.)
db.createCollection("collName"); //*(yeni bir collection oluşturma)
db.getCollectionNames(); // List by array.
db.getCollectionInfos(); // List by array with details.,
db.collName.renameCollection("collName_new"); // Update
db.collName.drop(); // Drop

🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 DOCUMENTS(RECORDS/ROWS)🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
 & INSERT:
*db.coll.insertOne( { new_values } )
*db.coll.insertMany( [ { new_values } ] )
db.coll3.insertOne({ firstName: "Test", lastName: "Test", age: 10 });
db.coll3.insertMany([
  ! in array[]
  { firstName: "Test1", lastName: "Test1", age: 11 },
  { firstName: "Test2", lastName: "Test2", age: 12 },
  { firstName: "Test3", lastName: "Test3", age: 13 },
  { firstName: "Test4", lastName: "Test4", age: 14 },
  { firstName: "Test5", lastName: "Test5", age: 15 },
  { firstName: "Test6", lastName: "Test6", age: 16 },
  { firstName: "Test7", lastName: "Test7", age: 17 },
  { firstName: "Test8", lastName: "Test8", age: 18 },
  { firstName: "Test9", lastName: "Test9", age: 19 },
  { firstName: "Test", lastName: "Test", age: 10 },
  { firstName: "Test1", lastName: "Test1", age: 11 },
  { firstName: "Test2", lastName: "Test2", age: 12 },
  { firstName: "Test3", lastName: "Test3", age: 13 },
  { firstName: "Test4", lastName: "Test4", age: 14 },
  { firstName: "Test5", lastName: "Test5", age: 15 },
  { firstName: "Test6", lastName: "Test6", age: 16 },
  { firstName: "Test7", lastName: "Test7", age: 17 },
  { firstName: "Test8", lastName: "Test8", age: 18 },
  { firstName: "Test9", lastName: "Test9", age: 19 },
  { firstName: "Test", lastName: "Test", age: 10 },
  { firstName: "Test1", lastName: "Test1", age: 11 },
  { firstName: "Test2", lastName: "Test2", age: 12 },
  { firstName: "Test3", lastName: "Test3", age: 13 },
  { firstName: "Test4", lastName: "Test4", age: 14 },
  { firstName: "Test5", lastName: "Test5", age: 15 },
  { firstName: "Test6", lastName: "Test6", age: 16 },
  { firstName: "Test7", lastName: "Test7", age: 17 },
  { firstName: "Test8", lastName: "Test8", age: 18 },
  { firstName: "Test9", lastName: "Test9", age: 19 },
]);
& COUNT
db.coll.countDocuments(); // count documents in collection
db.col.countDocuments({ age: 10 }); // count documents with filter
db.coll.estimatedDocumentCount()
& SELECT
db.coll.find()
! db.collection.find(filter, projection) // filtreleme ve fielt alan seçme
* Projection yazım kuralları
| ifade                 | anlam            |
| --------------------- | ---------------- |
| `{ firstName: 1 }`    | firstName göster |
| `{ firstName: true }` | aynı şey         |
| `{ _id: 0 }`          | id gösterme      |

ex: on trial collection> db.coll3.countDocuments({},{firstName:true}) //26

! ex: db.coll3.find( { firstName: "Test" },{ firstName: 1, _id: 0 } ) 
? firstName değeri "Test" olan documentları getir. firstName alanını göster. _id alanını gösterme.( 26 tane Test ismine sahip document var ve sadece firstName alanını göster.)

db.coll.find({ firstName: "Test" })
db.coll.find({}, { firstName: 1, lastName: 1 })// Select Fields, id de gelecek(default)
db.coll.find({}, { _id: 0, firstName: 1, lastName: 1 })
db.coll.findOne()
* db.coll.findOne( { filters }, { fields } )
db.coll.findOne({ firstName: "Test" })
db.coll.distinct("firstName")//? get only firstName in array.  benzersiz olanları seçer.
&COMPARISON OPERATORS
!| SQL      | MongoDB |
| -------- | ------- |
| `=`      | `$eq`   |
| `!=`     | `$ne`   |
| `>`      | `$gt`   |
| `>=`     | `$gte`  |
| `<`      | `$lt`   |
| `<=`     | `$lte`  |
| `IN`     | `$in`   |
| `NOT IN` | `$nin`  |

db.coll.find({ age: { $exists: true } })

db.coll.find({ age: { $eq: 15 } })
db.coll.find({ age: { $ne: 15 } })

! Mongo: db.coll.find({ age: { $gt: 15 } })
! SQL: SELECT * FROM coll WHERE age > 15
db.coll.find({ age: { $gte: 15 } })

db.coll.find({ age: { $lt: 15 } })
db.coll.find({ age: { $lte: 15 } })

db.coll.find({ age: { $gte: 18, $lt: 65 } }) //? age değeri 18 veya daha büyük ve 65'ten küçük olan documentları getir.

db.coll.find({ age: { $in: [10,11,12] } })
db.coll.find({ age: { $nin: [10,11,12] } })
! MongoDB Filter Rehberi
!| Durum                                   | Örnek                                                          | Açıklama                                                        |
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

* Not:

- {} içinde birden fazla koşul varsa virgül ile yazabilirsin → AND mantığı.

- $and ve $or kullanımı karmaşık koşullarda okunabilirlik için tercih edilir.

- Tırnaklar çoğu zaman opsiyoneldir, ama field adı boşluk, özel karakter veya sayı ile başlıyorsa zorunlu.

- Operatör kullanıyorsan { field: { $op: value } } şeklinde iç obje gerekir.

&REGEX
db.coll.find({ firstName: { $regex: "Test" } }) // contains "Test"
db.coll.find({ firstName: /Test/ }) // contains "Test"

db.coll.find({ firstName: /test/i })  // contains "test" case-insensitive (case önemli değil)

db.coll.find({ firstName: /^Test/ })  // starts with "Test"

db.coll.find({ firstName: /Test$/ }) // ends with "Test"
& LOGICAL OPERTAORS
db.coll.find({ firstName: "Test6", age: 16 }) //! firstName değeri "Test6" ve age değeri 16 olan documentları getir. default olarak AND işlemi yapar, virgül.

db.coll3.find({ "age": { $not: { $eq: 15 } } }) //! age değeri 15 olmayan documentları getir. TIRNAK " " OPSIYONEL
db.coll.find({
  $and: [
    { firstName: "Test6" },
    { age: 16 }
  ]
})

db.coll.find({
  $or: [
    { firstName: "Test6" },
    { age: 15 }
  ]
})

db.coll.find({
  $nor: [
    { firstName: "Test6" },
    { age: 15 }
  ]
})

db.coll.find({
  age: { $not: { $eq: 15 } }
})
& Limit / Pagination
db.coll.find().limit(5)

db.coll.find().skip(5).limit(5)
& Sort
db.coll.find().sort({ age: -1 })

db.coll.find().sort({ age: 1 })

& Update
db.coll.updateOne(
  { age: 19 },
  { $set: { age: 199 } }
)

db.coll.updateMany(
  { age: 19 },
  { $set: { status: "updated" } }
)

db.coll.updateMany(
  {},
  { $unset: { status: "" } }
)

db.coll.updateMany(
  {},
  { $inc: { age: 2 } }
)

db.coll.updateMany(
  {},
  { $rename: { updated_at: "updated" } }
)

db.coll.updateMany(
  {},
  { $currentDate: { updated_at: true } }
)
&Delete
db.coll.deleteOne({ age: 19 })

db.coll.deleteMany({ age: 19 })

db.coll.deleteMany({})

* Backend geliştirmede en çok kullanılan MongoDB akışı:

insertOne
find / findOne
updateOne / updateMany
deleteOne / deleteMany
countDocuments
sort / limit / skip

*/
