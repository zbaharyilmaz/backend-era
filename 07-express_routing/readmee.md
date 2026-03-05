1. Çoğu veritabanı veriyi JSON olarak saklamaz.

Örneğin bir SQL veritabanında (örneğin PostgreSQL):

users tablosu şöyle görünür:

id	name	age
1	Zeynep	28
2	Ali	30

Yani veri satır ve sütunlar halinde saklanır.

JSON yok.

2. Backend database’den veriyi alır

Backend database’e sorar:

SELECT * FROM users

Database sonucu döndürür:

id	name	age
1	Zeynep	28
2	Ali	30
3. Backend bunu JavaScript object’e çevirir

Node.js içinde veri genelde şöyle görünür:

[
  { id: 1, name: "Zeynep", age: 28 },
  { id: 2, name: "Ali", age: 30 }
]

Bu artık JavaScript array + object.

4. Frontend veri isteyince

Frontend bir HTTP isteği gönderir:

GET /users

Backend şu object’i gönderir:

[
  { id: 1, name: "Zeynep", age: 28 },
  { id: 2, name: "Ali", age: 30 }
]

Ama network üzerinden object gönderilemez.

Bu yüzden backend bunu JSON’a çevirir.

5. Object → JSON dönüşür

Backend şu işlemi yapar:

JSON.stringify()

Sonuç:

[{"id":1,"name":"Zeynep","age":28},{"id":2,"name":"Ali","age":30}]

Bu JSON string artık HTTP response olur.

6. Frontend JSON’u tekrar object yapar

Frontend:

const data = await res.json()

arka planda:

JSON.parse()

ve tekrar şu olur:

[
  { id: 1, name: "Zeynep", age: 28 },
  { id: 2, name: "Ali", age: 30 }
]
En basit haliyle tüm süreç
Database
(id | name | age)

        ↓

Backend
{ id: 1, name: "Zeynep", age: 28 }

        ↓ JSON.stringify()

JSON
{"id":1,"name":"Zeynep","age":28}

        ↓ internet

Frontend

        ↓ JSON.parse()

{ id: 1, name: "Zeynep", age: 28 }
Önemli gerçek

JSON aslında database formatı değildir.

JSON sadece:

backend ile frontend arasında veri taşımak için kullanılan formattır.

İstisna

Bazı veritabanları JSON saklayabilir. Örneğin:

MongoDB

MongoDB’de veri şöyle görünür:

{
  "name": "Zeynep",
  "age": 28
}

Ama SQL veritabanlarının çoğunda veri tablo halinde saklanır.




NOT:

MVC veri akışı (en net şema)
Frontend
   │
   │ HTTP Request
   ▼
Router
   │
   ▼
Controller
   │
   ▼
Model
   │
   ▼
Database
   │
   ▼
Model
   │
   ▼
Controller
   │
   ▼
JSON Response
   │
   ▼
Frontend




## Note

Express.js içinde:

res.json(user)

➡ ne parse eder
➡ ne de sen manuel stringify yazarsın

✅ Gerçekte ne olur?

Sen sadece şunu yazarsın:

res.json(user)

Express arka planda otomatik olarak:

JSON.stringify(user)

yapar.

👉 Yani bu stringfy işlemidir.

✅ Parse yapılır mı?

Hayır.

parse işlemi backend’de yapılmaz.

Parse işlemi genelde frontend’de olur:

const data = await res.json()

Burada browser:

JSON.parse()

yapar.

⭐ Mantık zinciri

Backend memory → object
↓
res.json() → stringify (otomatik)
↓
Network → JSON string
↓
Frontend → parse → object

🔥 Kısa cevap (sınavlık)

👉 res.json(user) = otomatik stringify
👉 Parse işlemi frontend tarafındadır.,




## note 

2. Senior düşünce (data flow odaklı)

Senior developer veri hareketini düşünür:

👉 Memory’de veri object
👉 Network’te veri string (JSON)
👉 Client runtime’da tekrar object

Express.js içinde:

res.json(user)

aslında şu pipeline’dır:

Object
 ↓
JSON.stringify()
 ↓
HTTP Response Body (string)
 ↓
Frontend JSON.parse()
 ↓
Object
⭐ Kritik fark (çok önemli)
Junior → "JSON nedir?"

→ Syntax öğrenir.

Senior → "Why JSON?"

Çünkü:

✅ Network binary/object taşıyamaz
✅ HTTP text protocol’dür
✅ Platform bağımsız veri gerekir

JSON bu problemleri çözer.

⭐ Profesyonel mental model (altın bilgi)

Backend’de veri hiçbir zaman JSON olarak yaşamaz.

Veri hayat döngüsü:

Database
 ↓
Backend Object
 ↓
JSON only during transport
 ↓
Frontend Object

JSON = sadece taşıma formatı.

⭐ Interview seviyesinde kritik cümle

👉 Backend logic → object
👉 Network communication → JSON string
👉 Application runtime → object


Frontend → backend veri gönderir

Backend → frontend veri gönderir

Bu veri internet üzerinden taşınır. Buna network denir.
HTTP (HyperText Transfer Protocol) tasarım gereği metin tabanlıdır.


User Action (Frontend)
        ↓
HTTP Request (Text)
        ↓
Network Transfer
        ↓
Express Server
        ↓
Controller
        ↓
Model
        ↓
Database
        ↓
Return Object
        ↓
JSON.stringify()
        ↓
HTTP Response Text
        ↓
Frontend JSON.parse()



💚

👉 Database object bilmez, SQL veya document format bilir
👉 Network object bilmez, text taşır
👉 Application runtime(uygulamanın çalıştığı anlık execution ortamı) object kullanır


## note
Application runtime, uygulamanın çalıştığı anlık execution ortamıdır. Basitçe:
👉 Programın “çalışma zamanı belleği” diyebilirsin.

1. Runtime ne demek?

Kod yazmak ≠ kodun çalışması.

Writing time → kodu dosyaya yazarsın

Compile time → bazı dillerde derlenir

Runtime → uygulama gerçekten çalışır

2. Backend’de runtime örneği

Express.js çalıştığında:

const users = [{ name: "Zeynep" }]

Bu veri:

👉 Server RAM’inde tutulur
👉 Program çalıştığı sürece vardır

Server kapanınca gider.

3. Runtime memory içinde ne olur?

Application runtime ortamında:

Object’ler

Array’ler

Variable’lar

Function call stack

hepsi RAM’de tutulur.

4. Backend mimarisinde runtime yeri

Akış:

Database
   ↑
Model Layer
   ↑
Controller Layer
   ↑
Runtime Memory (JS Object)
   ↑
Network Response (JSON)
5. Çok önemli fark
Kavram	Ne demek
Runtime	Programın çalıştığı an
Database	Kalıcı veri depolama
Network	Veri taşıma yolu
Source code	Yazdığın dosya
6. Senior düşünce (kritik nokta)

Backend uygulaması aslında şu 3 yerde yaşar:

Disk (code + config)

Memory (runtime state)

Network (communication)

🔥 En kısa tanım (akılda kalıcı)

👉 Runtime = uygulamanın RAM üzerinde aktif çalıştığı zaman dilimi.