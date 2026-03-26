brew services start mongodb-community

## Search vs Filter

# Search

Tam eşleşme aramaz
İçerik bazlıdır
Örnek:
title: { $regex: "node", $options: "i" }

# Filter

Tam eşleşme ister
Kesin değerle çalışır
Örnek:
category: "tech"

## Frontend vs Backend işlemleri

Frontend (React Data Table)
Tüm daha çekilir ve Pagination, search, filter client-side da yapılır.
Küçük veri için hızlı
Ama:
Büyük datada yavaş
Tüm data client’a gelir → kötü
Backend (önerilen)
Pagination, search, filter server-side
Avantaj:
Performans yüksek
Az veri taşınır
Güvenli

# Net özet

Search → esnek arama
Filter → kesin eşleşme
Pagination/search/filter → backend’de yapılmalı


## Query için ? 

http://127.0.0.1:8000/blogs/post?published=1 
- published 1 olan verileri getir.

http://127.0.0.1:8000/blogs/post?filter[published]=1&search[title]=test 1&filter[categoryId]=69c4b89155d2ab62912cf731&sort=asc 
- Query Param objesi: 
{ filter: { published: '1', categoryId: '69c4b89155d2ab62912cf731' }, search: { title: 'test 1' }, sort: 'asc' }

* filter → $and içinde direct match
* search → $or + $regex
* ikisi birleşince → nested ($and + $or)
- Sonuç query (tam hali)
{
  $and: [
    { published: 1, categoryId: "69c4b89155d2ab62912cf731" },
    { $or: [{ title: { $regex: "test 1", $options: "i" } }] }
  ]
}