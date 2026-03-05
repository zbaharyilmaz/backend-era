Çoğu veritabanı veriyi JSON olarak saklamaz.

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