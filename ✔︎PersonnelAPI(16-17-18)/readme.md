
## Cluster oluşturma ile MongoDB bağlantısı
* npm i express dotenv mongoose express-async-errors
* npm i cookie-session
* npm i jsonwebtoken


* Note: Session Cookieler sadece Web Applerine(Browser) hizmet edebilirken; Token lar Web App, Mobile App(ios, android), IOT(Akıllı cihazlar) ve diğer(tesla) teknolojilere hizmet verebilmektedir. Token: karmaşık bir string yapısındaki veri(id no tc gibi). Amacı kullanıcıyı authenticate yapmaktır.

 # Package.json a ekle
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"nodemon index.js"
  },