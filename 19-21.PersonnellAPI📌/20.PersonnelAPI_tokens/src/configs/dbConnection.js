"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Mongoose ODM(Object Data Modeling)
//! Bu kod, Express + Mongoose projesinde MongoDB’ye bağlanmayı yöneten bir modül.

const mongoose = require("mongoose");

// MongoDB’ye bağlan
mongoose
  .connect(process.env.DB_URI || "mongodb://localhost:27017/blogAPI") // default DB name -> blogAPI
  .then(() => console.log("* DB Connected *"))
  .catch((err) => console.log("! DB Not Connected !", err));

// mongoose’u export ediyoruz, böylece diğer dosyalarda schema ve model tanımlayabiliriz
module.exports = mongoose;

/* -------------------------------------------------------
Açıklama:

1️⃣ MongoDB’ye JS ile komut vermek
- MongoDB normalde NoSQL bir veritabanıdır.
- Node.js’den doğrudan bağlanmak mümkün ama saf MongoDB driver ile kod biraz karmaşık olur:

const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("blogAPI");
const users = await db.collection("users").find().toArray();

- Görüyorsun, bir collection alıp find() yapmak bile uzun.

2️⃣ Mongoose ile kolaylaştırıyoruz
- Mongoose ile aynı işi çok daha JS objesi gibi yapabilirsin:

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
}));

const users = await User.find();

- Kod kısa, okunabilir ve bakımı kolay.
- Ayrıca schema, validasyon ve middleware gibi özellikler de kullanabiliyorsun.

3️⃣ Mongoose kullanmanın mantığı
- `mongoose.connect(...)` ile **tek bir bağlantı** açıyoruz.
- `module.exports = mongoose` ile:
  - Model dosyalarında tekrar `require("mongoose")` yapıyoruz.
  - Ama **yeni bağlantı açmıyoruz**, mevcut global connection üzerinden çalışıyoruz.

4️⃣ Özet mantık
- dbConnection.js → sadece MongoDB’ye bağlanır.
- Model dosyaları → `const mongoose = require("mongoose")` ile schema/model tanımlar.
- Token / API / Web, Mobile veya IoT uygulamaları bu modeli kullanarak veri gönderir/alır.

💡 Not:
- Model dosyalarında `require("../configs/dbConnection")` yapmaya gerek yok.
- Sadece connection açmak için dbConnection.js’i import et ve çalıştır, modeller mongoose üzerinden çalışır.
------------------------------------------------------- */
