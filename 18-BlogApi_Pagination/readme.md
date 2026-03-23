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
