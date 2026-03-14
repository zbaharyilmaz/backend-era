SEQUELIZE CONCEPTS: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

📝 Todo API – CRUD Endpoints


Base URL: http://127.0.0.1:8000
MethodEndpointAçıklamaPOST/todosYeni todo oluştururGET/todosTüm todoları listelerGET/todos/:idTek todo getirirPUT/todos/:idTodo güncellerDELETE/todos/:idTodo siler

Request Body (POST / PUT)
json{
"title": "string (zorunlu)",
"description": "string",
"priority": -1 | 0 | 1,
"isDone": false | true
}
Response Örnekleri

201 – Oluşturuldu
200 – Başarılı
202 – Güncellendi
204 – Silindi (body yok)
404 – Bulunamadı
500 – Sunucu hatası

Kullanılan Teknolojiler

Express.js – REST API
Sequelize – ORM
SQLite – Veritabanı


CRUD nedir?
Bir veritabanıyla yapabileceğin her şey aslında bu dört işleme indirgenir. Düşün: Instagram kullanıyorsun. Fotoğraf yüklüyorsun → Create. Akışı görüntülüyorsun → Read. Bio'nu düzenliyorsun → Update. Gönderiyi siliyorsun → Delete. Hepsi bu.

Create — POST /todos
Veritabanına yeni satır ekler. req.body ile frontend'den gelen veriyi alıp direkt Todo.create() ye veriyorsun. Sequelize bunu SQL'e çevirir:
sqlINSERT INTO todos (title, description, priority, isDone) VALUES (...)

Read — GET /todos ve GET /todos/:id
Veriyi sadece okur, değiştirmez. İki versiyonu var:
findAll() → tüm tabloyu getirir:
sqlSELECT * FROM todos
findOne({where:{id}}) → sadece o satırı getirir:
sqlSELECT * FROM todos WHERE id = 3

Update — PUT /todos/:id
Var olan kaydı değiştirir. İki parametre alır: ne ile değiştireceğin (req.body), hangi kaydı değiştireceğin (where):
sqlUPDATE todos SET title='yeni' WHERE id = 3
Önemli bir nokta: Todo.update() sana güncellenmiş veriyi döndürmez, sadece kaç satırın etkilendiğini söyler ([1] veya [0]). Bu yüzden kodda hemen ardından findByPk ile güncellenmiş veriyi ayrıca çekiyoruz.

Delete — DELETE /todos/:id
Kaydı tamamen siler:
sqlDELETE FROM todos WHERE id = 3
Silme başarılıysa 204 No Content döner — yani "tamam sildim ama sana gösterecek bir şey yok" demek. Kayıt bulunamazsa error handler devreye girer ve 404 döner.

Özet tablo
İşlemSQLSequelizeHTTPCreateINSERT.create()POSTReadSELECT.findAll() / .findOne()GETUpdateUPDATE.update()PUTDeleteDELETE.destroy()DELETE
Sequelize burada sana SQL yazmaktan kurtarıyor — sen JavaScript objesiyle çalışıyorsun, o arkada SQL'e çeviriyor.