"use strict";
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//& 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑
//? 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑
//* 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑 TRY-CATCH 🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑

app.get("/user/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      // res.send("id must be a number")
      throw new Error("id must be a number");
    } else {
      res.send("id is a number");
    }
  } catch (error) {
    console.log(error);
    res.send("There is an error: " + error.message);
  }
});

app.get("/", (req, res) => {
  throw new Error("There is an error");
});

//& 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//? 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ERROR HANDLER 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

// 4 parametresi olan bir middleware. Görevi: hata yakalamak. En sonda çağrılır.

const errorHandler = (err, req, res, next) => {
  console.log(err, "Error Handler is working");
  res.send({
    error: true,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
    status: err.status || 500,
  });
};
app.use(errorHandler);

//& 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  CATCH AND ERROR HANDLER 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
//? 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  CATCH AND ERROR HANDLER 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
//* 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  CATCH AND ERROR HANDLER 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳

app.get("/user/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      // res.send("id must be a number")
      throw new Error("id must be a number");
    } else {
      res.send("id is a number");
    }
  } catch (error) {
    next(error); //error handler middleware'ine yönlendiriyoruz.
  }
});

//* 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  ASYNC FONK 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// sistem kilitlenir.
// hata vermesi muhtemel kodlar ayrı bir async func a yazılır.
//Kullanılan bir töntem değil.

const asyncFunction = async () => {
  //* Hata vermesi muhtemel kodlar ayrı bir async func'a yazılır.
  throw new Error("ASYNC ERROR");
};

app.get("/async", async (req, res, next) => {
  // async fonksion hatasını errorHandler'a göndermek için catch(next) kullanılır.
  await asyncFunction().catch(next);
});

//& 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  EXPRESS ASYNC ERRORS MODULE 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
//& 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  EXPRESS ASYNC ERRORS MODULE 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
//& 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳  EXPRESS ASYNC ERRORS MODULE 🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳
// express-async-errors modülünü dahil ettik. Bu modül, async fonksiyonlarda hata yakalamak için kullanılır.


// require("express-async-errors");

// app.get("/async", async (req, res, next) => {
//   throw new Error("Async Error");
// });

// const errorHandler = (err, req, res, next) => {
//     console.log(err, "Error Handler is working");
//     res.send({
//       error: true,
//       message: err.message,
//       cause: err.cause,
//       stack: err.stack,
//       status: err.status || 500,
//     });
//   };
//   app.use(errorHandler);

app.listen(PORT, () => console.log("Running at http://127.0.0.1:" + PORT));
