

const express= require("express")  //Bu satır, Express.js kütüphanesini projene dahil eder. Express hızlı ve minimal bir Node.js web framework'üdür.  Express modülünü yükler ve express fonksiyonunu alır.
const app= express()  //Bu satır, Express uygulaması oluşturur. Artık bu app objesi, web sunucusu oluşturmak ve çeşitli işlemler yapmak için kullanılacak.

app.set("view engine", "ejs")

const productsdata=[
    {id:1, name:"itgon", price:39990},
    {id:2, name:"itgon 5", price:39990},
    {id:3, name:"itgon 9", price:39990}
]
//routes
app.use("/products/:id", function(req, res){
    // res.send("product details" + req.params.id)
    res.render("product-details")
})

app.use("/products", function(req,res){    //EN ÖZELİ EN YUKARI, EN GENELİ AŞAĞI AL. İLK EŞLEŞMEDE SEÇİM YAPIYOR ÇÜNKÜ.
    res.render("products",{
        list:productsdata
    })
}) 

app.use("/", function(req, res){    //app.use("/", ...): Bu satır, middleware işlevini tanımlar. Middleware, gelen her isteğe cevap vermek için kullanılan fonksiyonlardır.Bu middleware, sadece / (ana sayfa) yolu için çalışacak
    res.render("index")

})


app.listen(3000, ()=>{
    console.log("listening on port 3000");
})   //app.listen(3000, ...): Bu satır, sunucunun 3000 numaralı portu dinlemesini sağlar. Yani, sunucu 3000 portundan gelen istekleri kabul etmeye başlar.Bu komut çalıştırıldığında, tarayıcıya http://localhost:3000 yazarak uygulamayı görüntüleyebilirsin.