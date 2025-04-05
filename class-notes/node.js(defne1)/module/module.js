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

// module.exports = {
//   testing: testFunct,
//   imrenbirth: birthday1,
//   baharbirth: birthday2,
//   imren
// };


const evenNumber= function(){
    console.log("2,4,6,8,10,12,14,16,18");
}
const oddNumber= function(){
    console.log("1,3,5,7,9,11,13,15,17,19");
}

module.exports = { testFunct, birthday1, birthday2, imren, numbers:[evenNumber, oddNumber] };