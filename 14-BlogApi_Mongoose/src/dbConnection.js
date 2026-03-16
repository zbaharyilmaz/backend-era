"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
//& Mongoose ODM (Mongoose bir ODM (Object Data Modeling) kütüphanesidir. MongoDB ile Node.js arasında veri modelleme katmanı sağlar. MongoDB dokümanlarını JavaScript objeleri ile yönetmek. ODM = Object Document Mapper) )

const mongoose = require("mongoose");

const dbConnection = () => {
  // mongoose.connect('mongodb://localhost:27017/blogAPI') // defatul DB name -> test
  // alternative method:
  // const uri = process.env.DB_URI
  // if(!uri) throw new Error('DB_URI Not Found!');

  mongoose
    .connect(process.env.DB_URI || "mongodb://localhost:27017/blogAPI") // mongodb://localhost:27017/ yazarsak: / sonrasına defatul DB name olarak -> test algılar. O yüzden ; mongodb://localhost:27017/blogAPI yazalım. //! mongoose.connect yapısı ASYNC yapıdır. Bağlantı başarılı olursa then bloğu, başarısız olursa catch bloğu çalışır. DATABASE İLE YAPACAĞIMIZ HER İLETİŞİM ASYNC TİR.
    .then(() => console.log("* DB Connected *"))
    .catch((err) => console.log("! DB Not Connected !", err));
};

module.exports = dbConnection;

//! URI: bir kaynağı tanımlayan genel kavram
// URL: o kaynağın adresi (https://api.example.com/users)
// URN: o kaynağın ismi/kimliği (urn:isbn:0451450523)
/* 
URI (ÜST KAVRAM)
 ├─ URL
 └─ URN */

//Her URL bir URI’dir.
// Her URI URL değildir.
