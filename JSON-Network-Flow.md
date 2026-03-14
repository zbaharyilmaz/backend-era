📥 Direction 1: Frontend → Backend (Request)
1. There's an object on the frontend:
javascriptconst data = { name: "Ali", age: 25 }; // JS object
2. It needs to be converted to a string before sending over the network, fetch does this manually:
javascriptfetch("/api/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data), // object → '{"name":"Ali","age":25}'
});
```

**3.** It travels over the network as a JSON string inside the **HTTP body**:
```
'{"name":"Ali","age":25}'  ← just a string
4. It arrives at the backend, express.json() parses it:
javascriptapp.use(express.json()); // string → converts to object

app.post("/api/user", (req, res) => {
  console.log(req.body); // { name: "Ali", age: 25 } ✅
});

📤 Direction 2: Backend → Frontend (Response)
1. There's an object on the backend:
javascriptconst user = { name: "Ali", age: 25 }; // JS object
2. res.json() automatically stringifies and sends it:
javascriptres.json(user); // internally calls JSON.stringify(user)
```

**3.** It travels over the network as a JSON string inside the **HTTP body**:
```
'{"name":"Ali","age":25}'  ← just a string
4. It arrives at the frontend, fetch automatically parses it:
javascriptconst response = await fetch("/api/user");
const data = await response.json(); // string → converts to object
console.log(data); // { name: "Ali", age: 25 } ✅
```

---

## Full Flow
```
FRONTEND                    NETWORK                      BACKEND
─────────────────────────────────────────────────────────────────
JS Object
  ↓ JSON.stringify()
                    →  HTTP body: '{"name":"Ali"}'  →
                                                   express.json() ↓
                                                       req.body (JS Object)
                                                             ↓ res.json()
                    ←  HTTP body: '{"name":"Ali"}'  ←
response.json() ↓
JS Object
The rule is always the same: JS objects become strings before hitting the network, and become objects again after leaving it.

----------------------------------------------------------------------------

📤 Backend → Frontend (Response)
Senin notların bunu anlatıyor:
Backend object → JSON.stringify() → Network → JSON.parse() → Frontend object
Bunda res.json() veya res.send() otomatik stringify yapar.

📥 Frontend → Backend (Request)
express.json() bunu anlatıyor, tam tersi yön:
Frontend object → JSON.stringify() → Network → JSON.parse() → Backend object (req.body)
Bunda express.json() otomatik parse yapar.

Özet
Yapılan işlemKim yaparResponseobject → JSON stringres.json() / ExpressRequestJSON string → objectexpress.json() middleware
JSON her zaman sadece network'te taşınan bir format, her iki yönde de ağa girmeden önce string'e, ağdan çıkınca object'e dönüşüyor. Notların doğru, sadece tek yönü anlatıyordu.o zaman bana iki yönü de detaylı anlat, istemci clientten başla00:58📥 Yön 1: Frontend → Backend (Request)
1. Frontend'de bir object var:
javascriptconst data = { name: "Ali", age: 25 }; // JS object
2. Ağa göndermeden önce string'e çevrilmesi lazım, fetch bunu otomatik yapar:
javascriptfetch("/api/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data), // object → '{"name":"Ali","age":25}'
});
```

**3.** Ağda JSON string olarak seyahat eder:
```
'{"name":"Ali","age":25}'  ← sadece bir string
4. Backend'e ulaşır, express.json() onu parse eder:
javascriptapp.use(express.json()); // string → object'e çevirir

app.post("/api/user", (req, res) => {
  console.log(req.body); // { name: "Ali", age: 25 } ✅
});

📤 Yön 2: Backend → Frontend (Response)
1. Backend'de bir object var:
javascriptconst user = { name: "Ali", age: 25 }; // JS object
2. res.json() onu otomatik stringify edip gönderir:
javascriptres.json(user); // arka planda JSON.stringify(user) yapılır
```

**3.** Ağda yine JSON string olarak seyahat eder:
```
'{"name":"Ali","age":25}'  ← sadece bir string
4. Frontend'e ulaşır, fetch otomatik parse eder:
javascriptconst response = await fetch("/api/user");
const data = await response.json(); // string → object'e çevirir
console.log(data); // { name: "Ali", age: 25 } ✅
```

---

## Tam Tablo
```
FRONTEND                    NETWORK                   BACKEND
────────────────────────────────────────────────────────────────
JS Object
  ↓ JSON.stringify()
                    →  '{"name":"Ali"}'  →
                                            express.json() ↓
                                                      req.body (JS Object)
                                                            ↓ res.json()
                    ←  '{"name":"Ali"}'  ←
response.json() ↓
JS Object
Kural hep aynı: JS object ağa çıkmadan string olur, ağdan çıkınca tekrar object olur.

## HTTP Body
HTTP body, HTTP isteğinin/cevabının veri taşıyan kısmı.
HTTP mesajı iki parçadan oluşur:
┌─────────────────────────────┐
│           HEADERS           │  ← meta bilgi
│  Content-Type: application/json  │
│  Authorization: Bearer ...  │
├─────────────────────────────┤
│            BODY             │  ← asıl veri
│  '{"name":"Ali","age":25}'  │
└─────────────────────────────┘

Headers → "Bu veri ne formatında, kim gönderiyor, nereye gidiyor" gibi meta bilgiler
Body → gerçek taşınan veri, yani JSON string buraya girer


Kodda şurası body:
javascriptfetch("/api/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" }, // ← header
  body: JSON.stringify(data), // ← body, JSON string buraya girer
});


