# BLOG Project with Mongoose

## MONGOOSE (ODM (Object Data Modeling) Library → MongoDB dokümanlarını JavaScript objeleri ile yönetmek için Node.js kütüphanesi.)

https://mongoosejs.com/


## M-C-R (kosun yazılış sırası) asında mimari: MVC

## 1️⃣ Mongoose ve Schema Mantığı
const mongoose = require("mongoose");

mongoose MongoDB için ODM (Object Data Modeling) kütüphanesi.

MongoDB dokümanlarını JavaScript objeleri ile kullanmamızı sağlar.

Schema → veri yapısını tanımlar

Model → Schema’dan oluşturulan sınıf, veri tabanı ile etkileşim sağlar.

## 2️⃣ BlogCategory Schema
const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: "blogCategories",
  },
);
Açıklama

name → kategori adı

type: String → veri tipi

trim: true → baş ve sondaki boşlukları keser

required: true → boş olamaz

unique: true → aynı isim birden fazla olamaz

collection: "blogCategories" → MongoDB’de tablo adı belirler

Yoksa Mongoose otomatik olarak blogcategories gibi çoğul küçük harfli isim oluşturur.

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

BlogCategory artık bir Model.

MongoDB’de CRUD işlemlerini bu Model üzerinden yaparız.

## 3️⃣ BlogPost Schema
const BlogPostSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
  },
  {
    collection: "blogPosts",
    timestamps: true,
  },
);
Açıklama

categoryId → BlogCategory ile ilişki

type: ObjectId → MongoDB’nin ID tipi

ref: "BlogCategory" → populate ile ilişkili dokümanı çekmek için referans

required: true → boş bırakılamaz

Eğer unique: true olsaydı, her kategoriye sadece bir post bağlanır → One-to-One

title ve content → string alanlar, trim ve required

timestamps: true → otomatik olarak createdAt ve updatedAt ekler

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

BlogPost artık veri tabanı ile etkileşim için kullanacağımız Model.

## 4️⃣ Model ve Schema Farkı
Kavram	Açıklama
Schema	MongoDB dokümanının yapısı (field’lar, validation, default değerler)
Model	Schema’dan üretilen sınıf, CRUD işlemleri için kullanılır

Örnek:

const newCategory = new BlogCategory({ name: "Tech" });
await newCategory.save(); // MongoDB’ye eklenir
## 5️⃣ Populate ile İlişkili Veri Çekmek
const post = await BlogPost.findOne({ title: "JS Tips" }).populate("categoryId");

populate("categoryId") → categoryId alanındaki ObjectId’nin referans gösterdiği BlogCategory dokümanını getirir

Böylece MongoDB’de join işlemi gibi davranır.

## 6️⃣ Schema Options Önemli Parametreler
new mongoose.Schema({ ... }, {
  collection: "collectionName",  // tablo adı
  timestamps: true,              // createdAt & updatedAt
});

Diğer field-level opsiyonlar:

Opsiyon	Açıklama
trim	Baş ve sondaki boşlukları keser
unique	Tekrarlanmamasını sağlar
required	Zorunlu alan
default	Varsayılan değer
enum	Belirli değerler arasında olmasını sağlar
validate	Custom validation fonksiyonu

Getter/Setter ile veri okuma/yazma esnasında otomatik dönüşüm yapabiliriz:

get: v => v.toUpperCase()
set: v => v.trim()


## 7️⃣ Özet Mantık

Schema → veri yapısını belirler

Model → schema’dan sınıf oluşturur

CRUD işlemleri modeli kullanarak yapılır

Ref ve populate ile ilişkili dokümanlar çekilebilir

Options ile validation ve veri davranışları kontrol edilir


----------------------------------------------------------------------------------------------------------------------


## 1️⃣ Mongoose nedir ve nasıl indirilir

Mongoose: Node.js içinde MongoDB ile çalışmayı kolaylaştıran ODM (Object Data Modeling) kütüphanesi.

Kurulum:

# Projeye eklemek için
npm install mongoose

Kullanım örneği:

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

Node.js projen içinde require("mongoose") ile kullanılır.

Schema ve Model ile veri yapısı ve CRUD işlemleri yapılır.

## Mongosh

mongosh = MongoDB shell (komut satırı arayüzü).

Veritabanına bağlanmak ve komut çalıştırmak için kullanılır.

Örnek:

mongosh "mongodb://localhost:27017/mydb"

İçinde:

show dbs
db.users.find()


| Özellik  | Mongoose                        | Mongosh                        |
| -------- | ------------------------------- | ------------------------------ |
| Tür      | Node.js kütüphanesi             | MongoDB shell                  |
| Amaç     | Uygulama kodundan veri yönetimi | Komut satırından veri yönetimi |
| Kullanım | require/import                  | Terminal                       |
 

## 3️⃣ MongoDB’de Collection

Collection → MongoDB’de tablo gibi düşün.

Dokümanları (documents) içerir.

Örnek:

db.createCollection("users")   // collection oluşturma
db.users.insertOne({name: "Ali", age: 25}) // document ekleme
name, age // fields
db.users.find()                 // document listeleme

Mongoose’da Model → belirli collection ile eşleşir:

const User = mongoose.model("User", userSchema); // collection: users

User üzerinden CRUD işlemi yapılır; MongoDB’de users collection’ına yazılır.

- Özet

Mongoose → Node.js içinde MongoDB’yi kolay kullanmak için kütüphane, npm ile kurulur

Mongosh → MongoDB komut satırı, shell, uygulama dışında

Collection → MongoDB’de dokümanların toplandığı tablo benzeri yapı