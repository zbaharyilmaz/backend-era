## Bu projede Mongodb Atlas (cloud) kullanılmıştır.

- Express 5 → built-in async error handling
  extra paket → gereksiz
  sadece middleware yeterli

- Primary Key (PK)
  Ana kimlik
  Her kaydı benzersiz tanımlar
- Foreign Key (FK)
  Başka bir koleksiyona referans verir
  İlişki kurar

## TOKENS

- Web App, Mobile App, IOT(akıllı cihazlar, internet of things) ye hizmet eder. Web Applerde Browser tarafında session kullanıyorduk. Ama session mobile app veya IoT de yok. Bu yüzden yeni bir kavram olarak, TOKENS!

- Web App ve Session
  Web uygulamalarında tarayıcı üzerinden backend’e bağlanırsın.
  Kullanıcı giriş yaptığında session oluşturulur:
  Bu session sunucuda saklanır.
  Tarayıcı bir cookie ile session id gönderir.
  Böylece backend, her istekte “Bu kullanıcı kim?” sorusunu cevaplayabilir.

Özet: Web → session + cookie ile kimlik doğrulama.

- Mobile App ve IoT
  Mobil uygulamalar ve IoT cihazları tarayıcıya sahip değil.
  Session/cookie mekanizması yok veya kullanımı zor.
  Ama backend’e veri göndermeleri gerekiyor (login, veri gönderme vb.).

Problem: Session mekanizması bu ortamda çalışmaz.

- Çözüm: Tokens
  Token = kısa süreli, güvenli bir kimlik bilgisi
  Örneğin JWT (JSON Web Token)

Kullanıcı login olunca backend bir token üretir ve döner:

{
"token": "eyJhbGciOiJIUzI1NiIsInR..."
}

Mobile/IoT her API isteğinde bu token’ı gönderir:

Authorization: Bearer <token>
Backend token’ı doğrular → kimlik doğrulaması yapılır.

Avantajları:

Tarayıcıya bağlı değil → Mobile / IoT uyumlu
Stateless → Server her isteği session saklamadan doğrulayabilir
Güvenli → Süresi dolmuş token’lar geçersiz

| Platform      | Kimlik Doğrulama | Nasıl saklanır                        |
| ------------- | ---------------- | ------------------------------------- |
| Web App       | Session          | Cookie (tarayıcıda)                   |
| Mobile App    | Token            | Local Storage / Secure Storage        |
| IoT cihazları | Token            | Cihazın hafızası / hafif veri saklama |

💡 Kısa cümle ile:

Session = Web için, Token = Mobile ve IoT için modern kimlik doğrulama yöntemi

# API nedir?

👉 Bütün sistemin adı : API = veri isteme ve gönderme kapısı 🚪

Senin backend’in:

/users
/login
/products

👉 Bunların hepsi birlikte = API

# Endpoint nedir?

👉 API içindeki tek bir adres

Örnek:

GET /users

Bu = 1 endpoint

🎯 Kısaca:
API = restoran 🍽️
Endpoint = menüdeki yemekler 📋

# REST API nedir?

REST = API yazmanın en yaygın standardı
HTTP metodlarını kullanır:

| Method | Ne yapar   |
| ------ | ---------- |
| GET    | Veri alır  |
| POST   | Veri ekler |
| PUT    | Günceller  |
| DELETE | Siler      |
