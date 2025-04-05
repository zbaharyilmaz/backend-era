
//request-response(kullanıcı serverdan ne talep ediyor requestte pakettelenir; server tarafı requesti değerlendirir ve kullanıcı tarafında tarayıcıda bir cevp yayınlar)
//modülleri çağırıp node.js ile bir app geliştirme yapabiliriz. Ama node.js ortamında bir express framework ü yazılmış Onu kullanmak daha kolay.

//1.server kur

var http=require("http") //http modülünü dahil et, node.js modülleri, node kurulumu ile gelen modüller. fs modülü
var fs= require("fs") //file system modülü, dosya okuma ve yazma işlemleri için kullanılır.
var server=http.createServer(function(req,res){ 
if(req.url=="/home"){
    fs.readFile("index.html", (err, html)=>{
        res.write(html); //response
        res.end() //sonlandır mutlaka
    })
}else if(req.url=="/urunler"){
    fs.readFile("urunler.html", (err, html)=>{
        res.write(html); //response
        res.end() //sonlandır mutlaka
    })
}else{ 
    fs.readFile("404.html", (err, html)=>{
        res.write(html) //response
        res.end() //sonlandır mutlaka
    })
}
})

server.listen(3000, ()=>{
    console.log("node.js serveri 3000 portunda çalışıyor");
}) //serveri 3000 portunda hizmete aç.