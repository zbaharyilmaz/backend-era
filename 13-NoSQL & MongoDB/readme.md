## Non Relational Databases (Not Only SQL)

- No relation, no strict rules.
- Data is not safe compared to RDBs.
- Not any standart like SQL. Each db has own code-styles.
- MongoDB document type data yapısı kullanır.
- Json veri Bson a çevrilir.(binary json)

## Intro MongoDB

Local MongoDB → kendi bilgisayarında çalışır, port: 27017, internet gerekmez.

MongoDB Atlas → MongoDB’nin bulut servisi, online, her yerden erişebilirsin. Bağlanmak için kullanıcı adı, şifre ve cluster URL gerekir.

mongosh ise MongoDB Shell:

MongoDB server ile konuşmanı sağlayan terminal aracı.

Veri ekleme, sorgulama, güncelleme, silme, database ve collection yönetimi gibi işleri yaparsın.

Yani mongosh bir uygulama değil, MongoDB server’a bağlanan komut satırı arayüzü.

Özet:

Şey Ne olduğu Kullanım
MongoDB server Veritabanı Veri saklar, sorgular vs.
Mongosh CLI aracı Server’a bağlanıp komut çalıştırır
Atlas Bulut server Online veritabanı, internete bağlı,

## Backend Developer Mental Model
LOCAL
backend → localhost MongoDB

PRODUCTION
backend → MongoDB Atlas


## Local Compass or Cloud Atlas
Atlas connection: get your string from Atlas.

VS Code UI ve terminal ayrı bağlantılar kullanıyor.Terminalden Atlas’ı görmek için Atlas connection string’i kullanman gerekiyor:

mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydb"

Local Connection: mongosh tek başına çalıştırıldığında default olarak local MongoDB server’a bağlanır:

mongodb://127.0.0.1:27017

127.0.0.1 = localhost = senin bilgisayarın.

Port 27017 = MongoDB’nin standart portu.


## MongoDB Links

- CommunityServer: https://www.mongodb.com/try/download/community
- Compass: https://www.mongodb.com/try/download/compass
- Cloud: https://account.mongodb.com
- VSCode Extension: https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode

## MongoDB Installation Steps

- Installation Notes:
  - Windows
    - MongoDB CommunityServer & Compass
      - https://www.mongodb.com/try/download/community
      - https://lms.CourseName/mod/lesson/view.php?id=4089
    - MongoDB Shell (Mongosh):
      - https://www.mongodb.com/try/download/shell [Select "Windows 64-bit (8.1+) (MSI)"]
      - Set "uncheck" for "install just for you"

  - MacOS
    - HomeBrew: https://brew.sh
      ```sh
      # HomeBrew Install
      $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      $ brew -v # --version
      # HomeBrew Uninstall:
      $ brew cleanup # delete unused apps.
      $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
      ```
    - MongoDB CommunityServer & Mongosh: https://www.mongodb.com/docs/v4.0/tutorial/install-mongodb-on-os-x/
      ```sh
      $ brew tap mongodb/brew # brew tap
      $ brew install mongodb-community
      $ brew services start mongodb-community # brew services list|stop
      # Manual Start: $ mongod --config /usr/local/etc/mongod.conf --fork
      ```
    - MongoDB Compass: https://www.mongodb.com/try/download/compass
  - Linux:
    - https://www.mongodb.com/docs/manual/administration/install-on-linux/

## Mongosh:

    ```sh
    $ mongosh --version
    $ mongosh # defaul:local
    $ mongosh mongodb://localhost:27017/

```

```
