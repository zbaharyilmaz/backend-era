1. Sequelize backend’de ne yapar

Sequelize, Node.js için bir ORM (Object Relational Mapper) kütüphanesidir.

Amaç:
JavaScript kodu ile SQL veritabanını yönetmek.

Normalde veritabanı işlemleri şöyle olur:

SELECT * FROM users;
INSERT INTO users (name,email) VALUES ("Ali","ali@mail.com");

Sequelize ile aynı işlem JavaScript ile yapılır:

User.findAll()
User.create({ name: "Ali", email: "ali@mail.com" })

Yani:

Katman	Açıklama
JavaScript	Sequelize kullanır
Sequelize	SQL üretir
Database	SQL çalıştırır

Akış:

Request
   ↓
Express
   ↓
Controller
   ↓
Sequelize
   ↓
SQL Query
   ↓
Database
2. Model → Table ilişkisi

Sequelize’de Model = Database Table

Örnek:

Database tablosu
users
-------------------
id
name
email
createdAt
updatedAt
Sequelize Model
const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
})

İlişki:

Model (User)
      ↓
Table (users)
      ↓
Rows (records)

Row örneği:

id | name | email
1  | Ali  | ali@mail.com
2  | Ayşe | ayse@mail.com
3. Model → CRUD ilişkisi

CRUD:

İşlem	SQL	Sequelize
Create	INSERT	create()
Read	SELECT	findAll() / findByPk()
Update	UPDATE	update()
Delete	DELETE	destroy()
Create
await User.create({
  name: "Ali",
  email: "ali@mail.com"
})

SQL:

INSERT INTO users ...
Read
const users = await User.findAll()

SQL:

SELECT * FROM users
Update
await User.update(
 { name: "Ahmet" },
 { where: { id: 1 } }
)

SQL:

UPDATE users SET name="Ahmet" WHERE id=1
Delete
await User.destroy({
 where: { id: 1 }
})

SQL:

DELETE FROM users WHERE id=1
4. Express + Sequelize proje yapısı

Genelde backend şu şekilde organize edilir.

project
│
├── app.js
│
├── config
│     database.js
│
├── models
│     index.js
│     user.js
│     todo.js
│
├── controllers
│     userController.js
│
├── routes
│     userRoutes.js
│
└── package.json
5. Katmanların görevi
Express

HTTP request alır

GET /users
POST /users
Route

URL’yi controller’a gönderir

router.get("/users", getUsers)
Controller

Business logic

const users = await User.findAll()
res.json(users)
Model (Sequelize)

Database ile konuşur

User.findAll()
User.create()
User.update()
6. Tam akış
Client
   ↓
HTTP Request
   ↓
Express Route
   ↓
Controller
   ↓
Sequelize Model
   ↓
Database Table

Örnek:

GET /todos
      ↓
todoRoute
      ↓
todoController
      ↓
Todo.findAll()
      ↓
todos table
7. Özet

Sequelize’in yaptığı şey:

Database Table  ⇄  Sequelize Model
SQL Query       ⇄  JavaScript Method
SQL	Sequelize
SELECT	findAll
INSERT	create
UPDATE	update
DELETE	destroy

İstersen ayrıca şu konuyu da çok net gösterebilirim:

Sequelize’de en çok karıştırılan şey:

models/
config/
migrations/
seeders/

ve index.js dosyasının neden gerekli olduğu. Bu yapı öğrenildiğinde Sequelize tamamen oturur.