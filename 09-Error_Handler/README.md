## 🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆 İnitial Commands 🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆

- npm init -y
- npm i express dotenv
  (npm install express@4.18.2)
- npm i express-async-errors

## 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 Not 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

- JSON alıp verdiğimiz api ler REST API denir.
- Try Catch i hata yönetimi için kullanabiliriz.

## Örnek Kod:

"use strict";

const express = require("express");
const createError = require("http-errors"); // özelleştirilmiş hata nesneleri
const app = express();

app.use(express.json());

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

/_ ----------------------------- Error Handler ------------------------------ _/

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


