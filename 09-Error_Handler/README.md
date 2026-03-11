## 🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆 İnitial Commands 🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆

- npm init -y
- npm i express dotenv
  (npm install express@4.18.2)
- npm i express-async-errors

(
Express 5 ve üzeri için express-async-errors yüklemeye gerek yok.
Önceki Express 4 sürümlerinde async route’larda throw edilen hatalar otomatik yakalanmazdı.
Bu yüzden express-async-errors paketini kullanırdık; paket async fonksiyonlarda throw edilen hatayı next(err) ile error middleware’e yönlendirirdi.
)

## 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

- JSON alıp verdiğimiz api ler REST API denir.
- Try Catch i hata yönetimi için kullanabiliriz.

## Örnek Kod:

"use strict";

const express = require("express");
const createError = require("http-errors"); // özelleştirilmiş hata nesneleri
const app = express();

app.use(express.json());

## Error Handler

Express’te varsayılan hata çıktısı genelde HTML olur.
Ama bu Express’in default error handler’ı tarafından üretilir. Bu yüzden çoğu backend geliştiricisi kendi error middleware’ini yazıp JSON döndürür.

1. Express’in varsayılan hata davranışı

Eğer uygulamada özel bir error handler yoksa ve bir hata oluşursa Express kendi handler’ını kullanır.

Örnek hata:

app.get("/", (req,res)=>{
throw new Error("Something went wrong")
})

Express default olarak şöyle bir HTML sayfası döndürür:

<!DOCTYPE html>
<html>
<body>
<pre>Error: Something went wrong</pre>
</body>
</html>

Bu tarayıcı için yapılmıştır, API için değil.

2. API'lerde neden JSON kullanılır

Backend çoğu zaman frontend veya başka servisler tarafından kullanılır.

Bu yüzden hata formatı genelde şöyle olur:

{
"error": true,
"message": "Something went wrong"
}

Frontend bunu kolayca okuyabilir.

3. Express error middleware

Error middleware 4 parametreli olur:

(err, req, res, next)

Örnek:

app.use((err, req, res, next) => {
res.status(500).json({
error: true,
message: err.message
});
});

Önemli nokta:

Express bir middleware'in error handler olduğunu
4 parametresinden anlar. 4. Hata nasıl bu middleware'e gelir

Hata oluştuğunda:

next(err)

veya

throw new Error()

Express akışı:

Request
↓
Middleware
↓
Route
↓
Hata oluştu
↓
Error Middleware
↓
Response

## note

// 📌 Express 5'te async hataları otomatik yakaladığı için burada doğrudan error handler kullanılır
app.use((err, req, res, next) => {
console.error("❗ Error caught:", err.message);
res.status(err.status || 500).json({
success: false,
error: true,
message: err.message || "Internal Server Error",
});
});

/_ ----------------------------- Server Listen ----------------------------- _/

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});

/_ --------------------------------- Routes --------------------------------- _/

// ✅ Normal route
app.get("/", (req, res) => {
res.send({ message: "Hello from Express 5!" });
});

// ✅ Async route – hata fırlatır
app.get("/error", async (req, res) => {
// Direkt hata fırlatıyoruz (Express 5 bunu yakalayacak)
throw createError(400, "This is a custom bad request error");
});

// ✅ Async route – başarılı sonuç döner
app.get("/success", async (req, res) => {
res.json({ message: "Async route worked fine!" });
});

Express 4’te async fonksiyonlarda throw yakalanmaz, paket (express-async-errors) veya try/catch gerekir.

Express 5 bunu otomatik yapıyor.
