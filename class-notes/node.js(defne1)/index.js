

const express= require("express")  //Bu satır, Express.js kütüphanesini projene dahil eder. Express hızlı ve minimal bir Node.js web framework'üdür.  Express modülünü yükler ve express fonksiyonunu alır.
const app= express()  //Bu satır, Express uygulaması oluşturur. Artık bu app objesi, web sunucusu oluşturmak ve çeşitli işlemler yapmak için kullanılacak.


require("./module/module")
const port= 3000 //Port numarasını tanımlıyoruz. Bu port üzerinden sunucuya erişim sağlanacak.
app.listen(port, () => { //Sunucuyu belirtilen portta dinlemeye başlıyoruz. Sunucu çalışmaya başladığında konsola bir mesaj yazdırıyoruz.
    console.log(`Server is running on port ${port}`);
  });

// const testFunct= require("./module/module")         //! TEK BİR FONKSİYON İÇİN KULLANILDI
// testFunct()

const {testing, imrenbirth, baharbirth}= require("./module/module")   //! ÇOKLU FONKSİYON İÇİN KULLANILDI
imrenbirth()
baharbirth()
testing()