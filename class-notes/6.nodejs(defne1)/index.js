

const express= require("express")  //Bu satır, Express.js kütüphanesini projene dahil eder. Express hızlı ve minimal bir Node.js web framework'üdür.  Express modülünü yükler ve express fonksiyonunu alır.
const app= express()  //Bu satır, Express uygulaması oluşturur. Artık bu app objesi, web sunucusu oluşturmak ve çeşitli işlemler yapmak için kullanılacak.


require("./module/module")
const port= 3000 //Port numarasını tanımlıyoruz. Bu port üzerinden sunucuya erişim sağlanacak.
app.listen(port, () => { //Sunucuyu belirtilen portta dinlemeye başlıyoruz. Sunucu çalışmaya başladığında konsola bir mesaj yazdırıyoruz.
    console.log(`Server is running on port ${port}`);
  });

//! TEK BİR FONKSİYON İÇİN KULLANILDI
// const testFunct= require("./module/module")         
// testFunct()

//! ÇOKLU FONKSİYON İÇİN KULLANILDI
// const {testing, imrenbirth, baharbirth, imren}= require("./module/module")   
// imrenbirth()
// baharbirth()
// testing()
// console.log(imren);

const {testFunct, birthday1, birthday2, imren, numbers:[oddNumber, evenNumber]}= require("./module/module")  

testFunct()
birthday1()     
birthday2()
console.log(imren);
oddNumber()
evenNumber()




