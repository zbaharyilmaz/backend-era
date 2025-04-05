"use strict";

//! TEK BİR FONKSİYON İÇİN KULLANILDI

const testFunct = () => {
  console.log("this is a function");
};
// module.exports = testFunct;

//! ÇOKLU FONKSİYON İÇİN KULLANILDI
    const imren = "14.01";
const birthday1 = function () {

  console.log(`imren is born on ${imren}`);
};

    const bahar = "14.02";
const birthday2 = function () {

  console.log(`bahar is born on ${bahar}`);
};

module.exports = {
  testing: testFunct,
  imrenbirth: birthday1,
  baharbirth: birthday2,
};
