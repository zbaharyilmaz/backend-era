# Todo App

# Controller-Route

Controller is a function that handles incoming HTTP requests and decides what to do with them.

Without a controller:
javascriptapp.get("/users", (req, res) => {
const users = db.getUsers();
res.json(users);
});
This is fine for small projects, but as the project grows, everything piles up inside app.get, app.post and the code becomes messy.

With a controller:
javascript// controllers/userController.js
const getUsers = (req, res) => {
const users = db.getUsers();
res.json(users);
};

const createUser = (req, res) => {
const user = db.createUser(req.body);
res.json(user);
};

module.exports = { getUsers, createUser };
javascript// routes/userRoutes.js
const { getUsers, createUser } = require("../controllers/userController");

app.get("/users", getUsers);
app.post("/users", createUser);

```

---

## Folder structure:
```

src/
├── controllers/
│ └── userController.js ← business logic lives here
├── routes/
│ └── userRoutes.js ← only routing lives here
└── app.js

Summary
ResponsibilityRoute"A request came in for this URL"Controller"Got it, here's what to do"
Route only directs traffic, controller does the actual work.

---

## Controller-Route

- Controller, gelen HTTP isteğini karşılayan ve ne yapılacağına karar veren fonksiyondur.

Basit örnek — controllersız:
javascriptapp.get("/users", (req, res) => {
const users = db.getUsers();
res.json(users);
});
Bu küçük projede sorun yok, ama proje büyüdükçe her şey app.get, app.post içine yığılır ve kod karmaşıklaşır.

Controller ile:
javascript// controllers/userController.js
const getUsers = (req, res) => {
const users = db.getUsers();
res.json(users);
};

const createUser = (req, res) => {
const user = db.createUser(req.body);
res.json(user);
};

module.exports = { getUsers, createUser };
javascript// routes/userRoutes.js
const { getUsers, createUser } = require("../controllers/userController");

app.get("/users", getUsers);
app.post("/users", createUser);

```

---

## Klasör yapısı:
```

src/
├── controllers/
│ └── userController.js ← iş mantığı burada
├── routes/
│ └── userRoutes.js ← sadece yönlendirme burada
└── app.js

Özet

- GörevRoute"Bu URL'e istek geldi"Controller"Tamam, şunu yap"
- Route sadece yönlendirir, controller işi yapar.

## MVC

- MVC Structure ile backendi kodluyoruz. Önce Model. Ardından Controllere bağla. Ardından onu Route a bağla. Sonra onu App e bağla.
- M ➡️ C ➡️ R ➡️ App

MVC Structure
MVC = Model, View, Controller
Backend'de View olmadığı için sadece MC kullanıyoruz, View'ın görevi frontend'e (React, HTML) ait.

M ➡️ C ➡️ R ➡️ App akışı:

1. Model — Veriyi tanımla
   javascript// models/User.js
   const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name: String,
age: Number,
});

module.exports = mongoose.model("User", userSchema);

Database ile konuşan katman. Verinin nasıl görüneceğini tanımlar.

2. Controller — İş mantığını yaz
   javascript// controllers/userController.js
   const User = require("../models/User");

const getUsers = async (req, res) => {
const users = await User.find();
res.json(users);
};

const createUser = async (req, res) => {
const user = await User.create(req.body);
res.json(user);
};

module.exports = { getUsers, createUser };

Model'i kullanır, isteği işler, cevabı gönderir.

3. Route — URL'e bağla
   javascript// routes/userRoutes.js
   const express = require("express");
   const router = express.Router();
   const { getUsers, createUser } = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;

Controller'ı URL'e bağlar.

4. App — Route'u kaydet
   javascript// app.js
   const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

```
> Route'u uygulamaya tanıtır.

---

## Tam akış:
```

Request gelir
↓
App.js → "/users" route'una yönlendir
↓
Router → GET mi? POST mu? Controller'a gönder
↓
Controller → Model'i kullan, veriyi işle
↓
Model → Database'e git, veriyi getir
↓
Controller → res.json() ile cevap gönder
↓
Response gider

```

---

## Klasör yapısı:
```

src/
├── models/
│ └── User.js
├── controllers/
│ └── userController.js
├── routes/
│ └── userRoutes.js
└── app.js
Her katmanın tek bir görevi var, birbirinin işine karışmıyor.
