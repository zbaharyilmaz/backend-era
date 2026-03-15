//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 INTRO 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//? mongosh (mongosh terminaline giriş)
// cls; // console.clear()

//? exit from mongosh:
// exit; // exit() // .exit
// quit; // quit()

//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 DATABASE 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// show dbs
// use database_name
// show collections
// db.dropDatabase() (database silme)

//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 COLLECTIONS(TABLES)🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//* show collections //* (tab a basıp otomatik tamamla yap.)
db.createCollection("coll3"); //*(yeni bir collection oluşturma)
db.getCollectionNames(); // List by array.
db.getCollectionInfos(); // List by array with details.,
db.collName.renameCollection("collName2"); // Update
db.collName2.drop(); // Drop

//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 DOCUMENTS(RECORDS/ROWS)🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//! INSERT:
//* db.coll.insertOne( { new_values } )
//* db.coll.insertMany( [ { new_values } ] )
db.coll.insertOne({ firstName: "Test", lastName: "Test", age: 10 });
db.coll.insertMany([
  // in array[]
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
//! SELECT
//* db.coll.findOne( { filters }, { fields } )
//* db.coll.find( { filters }, { fields } )
db.coll.find();
db.coll.find({ firstName: "Test" });
db.coll.find({ firstName: true, lastName: true }); //? Select Fields, id de gelecek(default)
db.coll.find(
  {
    /* all */
  },
  { _id: 0, firstName: 1, lastName: 1 },
); // Select Fields
db.coll.findOne();
db.coll.findOne({ firstName: "Test" });
db.coll.distinct("firstName"); // get only firstName in array.
//! Comparison:
db.coll.find({ age: { $exists: true } }); // if exists
db.coll.find({ age: { $eq: 15 } }); // == : equal
db.coll.find({ age: { $ne: 15 } }); // <> : not equal
db.coll.find({ age: { $gt: 15 } }); // > : greather than
db.coll.find({ age: { $gte: 15 } }); // >= : greather than equal
db.coll.find({ age: { $lt: 15 } }); // <= : less than
db.coll.find({ age: { $lte: 15 } }); // <= : less than equal
db.coll.find({ age: { $in: [10, 11, 12] } }); // in list
db.coll.find({ age: { $nin: [10, 11, 12] } }); // not in list
