"use strict";
const mongoose = require("mongoose");

//PASSWORD ENCRYPTION
/* //!REUSABLE COMP OLMASI İÇİN BU KISMI UTILS E TAŞI. require ile çağır.
const crypto = require("node:crypto");
const passwordEncrypte = (password) => {
  const salt = "jakdlldşdşdşdşdşşdşdşdşdşzzzzzz";
  const iteration = 10000;
  const keylen = 32;
  const digest = "sha512";
  return crypto
    .pbkdf2Sync(password, salt, iteration, keylen, digest)
    .toString("hex");
};
console.log(passwordEncrypte("test"));
- string olmadan öncesi: <Buffer ad 40 d1 23 67 7f b9 c2 1d ea 2b d4 6f a9 8e c2 e0 83 24 34 10 14 74 0c b3 9e 60 52 22 b4 14 fc> */
// string hex hali: ad40d123677fb9c21dea2bd46fa98ec2e08324341014740cb39e605222b414fc

const passwordEncrypte= require("../utils/passwordEncrypte")

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: [true, "This email address is already in use."],
      trim: true,
      //validate:()=>{return false}
      validate: (email) => {
        if (email.includes("@") && email.includes(".")) {
          return true;
        }
        throw new Error("invalid email address");
      },
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      trim: true,
      //PASSWORD ENCRYPTION
      //! SET METHOD ile güvenlik açığı önlenir.
      // set: () => { return "password is hashed."},
      // artık set metodundan dönen veri, password da gözükecek. Thunder da dene. Güvenlik açığını önlemek için set metodu kullanılır.
      //! pratik kullanım:
      set: passwordEncrypte, // set: (pass) => {return passwordEncrypte(pass)  // pass password field ının değerini tutar.
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: "users",
    timestamps: true,
  },
);
module.exports = mongoose.model("User", UserSchema);
