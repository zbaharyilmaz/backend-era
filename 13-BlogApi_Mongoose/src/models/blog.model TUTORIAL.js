"use strict"
//& Sample
//1. Create Schema(oop yapısı)
//* new mongoose.Schema({fields}, {options})
const nameSchema= new mongoose.Schema({
  //_id: auto created and increment
  fieldName: Number,  
  fieldName2: Boolean,
     //!MongoDb type ları VScode ile aynı olduğu için mongoose.Schema.Types.String yazmana gerek yok. Sequelize da datatypes kullanıyorduk.
  fieldName3: String,
  fieldName4: {
    type: String,
    default: null,
    trim:true, // cuts the spaces before and after.
    unique:true,
    select: false,
    index:true,  //remde saklanan veri.
    // required:true,
    required: [true, "custom error message"],
    // enum:[1,"2", "3", ]      //belli değerler girilmediyse enum hatası olur.
    enum:[[1,"2", "3"], "custom error message"],
    min: 3,
    max: 15,
    // validate: ()=>true,
    validate: [()=>true, "custom error message"],
    get: ()=> {return data},  // It works default when we do read operation.
    set: ()=>{ return data},  // It works default when we do create operation.
  }
},{
  collections: "collectionName",
  timestamps: true, //createdAt ve updatedAt oluşturmak için. Sequelize da otomatik oluşturuluyordu.
})
//& Convert Schema to Model
module.exports= mongoose.model("Model Name",nameSchema )
