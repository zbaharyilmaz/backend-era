"use strict"
//* Sample
//1. Create Schema(oop yapısı)
// new mongoose.Schema({fields}, {options})
const nameSchema= new mongoose.Schema({
  //_id: auto created and increment
  fieldName: Number,  
  fieldName2: Boolean,
     //!MongoDb type ları VScode ile aynı olduğu için mongoose.Schema.Types.String yazmana gerek yok. Sequelize da datatypes kullanıyorduk.
},{
  collections: "collectionName",
  timestamps: true, //createdAt ve updatedAt oluşturmak için. Sequelize da otomatik oluşturuluyordu.
})
