---------------- SQL 2 ----------------
-- DML (Data Manipulation Language) - CRUD işlemleri
-- DQL (Data Query Language) - Sadece okuma (SAFE)
-- BNF Form: SQL sözdiziminin kurallarını tanımlamak için kullanılır.

SELECT * 
FROM Invoice;

SELECT InvoiceId, BillingCity 
FROM Invoice;


--# DISTINCT: Tekrar eden kayitlari getirmez.
SELECT DISTINCT BillingCountry
FROM Invoice;

SELECT DISTINCT BillingCountry, BillingCity
FROM Invoice;


--# WHERE: Koşul belirterek veri çekme işlemi
--# Operatörler: =, >, <, !=, <>, <=, >=, BETWEEN, LIKE, AND, OR, NOT, NOT IN 

--? Almanyada kesilen faturalari listeleme
SELECT * 
FROM Invoice
WHERE BillingCountry = 'Germany';

--? Fatura miktari 5 ile 8 arasinda olanlari listeleme

-- >= ve <= kullanarak
SELECT *
FROM Invoice
WHERE Total >= 5 AND Total <=7.96;

-- BETWEEN
SELECT *
FROM Invoice
WHERE Total BETWEEN 5 AND 8;

--? Belli tarihler arasındaki faturaları listeleme
SELECT *
FROM Invoice
WHERE InvoiceDate BETWEEN '2009-1-1' AND '2009-3-1';

--# LIKE operatörü: Belirli bir desene uygun kayıtları getirir

--? Fatura ulkesi 'Germany' olanlari listeme
SELECT *
FROM Invoice
WHERE BillingCountry LIKE 'Germany';

--? Fatura ülkesi "G" harfi ile başlayanları listeleme
SELECT *
FROM Invoice
WHERE BillingCountry LIKE 'G%';

--? Sonu "y" harfi ile biten ülkeleri listeleme
SELECT *
FROM Invoice
WHERE BillingCountry LIKE '%y';

SELECT *
FROM Invoice
WHERE BillingCountry LIKE 'G%y';

--? İçinde "w" harfi geçen ülkeleri listeleme
SELECT *
FROM Invoice
WHERE BillingCountry LIKE '%w%';

--? İkinci harfi "o" olan ülkeleri listeleme
SELECT *
FROM Invoice
WHERE BillingCountry LIKE '_o%';

--? Üçüncü harfi "r" ve son harfi "y" olan ülkeleri listeleme
SELECT *
FROM Invoice
WHERE BillingCountry LIKE '__r%y';

--# NOT IN: Belirtilen verilerle eslesmeyenleri listeleme
SELECT *
FROM Invoice
WHERE BillingCountry NOT IN ('Norway', 'USA');

SELECT *
FROM Invoice
WHERE NOT BillingCountry = 'Norway';



--# LIMIT: Belirtilen sayıda kayıt getirme

--? İlk 10 faturayı listeleme
SELECT *
FROM Invoice
LIMIT 10;

--# ORDER BY: Sıralama işlemi (ASC: Artan, DESC: Azalan)

--? Ülke adına göre artan sıralama
SELECT *
FROM Invoice
ORDER BY BillingCountry; -- default ASC

--? Ülke adına göre azalan sıralama
SELECT *
FROM Invoice
ORDER BY BillingCountry DESC;

--? Ülke adına göre artan, şehir adına göre azalan sıralama
SELECT BillingCountry, BillingCity
FROM Invoice
ORDER BY BillingCountry, BillingCity DESC;

--? AC/DC grubunun ilk  parçasını listeleme
SELECT *
FROM Track
WHERE Composer = 'AC/DC'
LIMIT 1;

--? AC/DC grubunun son 3 parçasını listeleme
SELECT *
FROM Track
WHERE Composer = 'AC/DC'
ORDER BY TrackId DESC
LIMIT 3;

--# Fonksiyonlar: MIN, MAX, AVG, SUM, ROUND, LENGTH (Tek değer döndüren fonksiyonlar)(SELECT ile FROM arasina yazilir)
SELECT * FROM Invoice;

--? Toplam fatura miktarını hesaplama
SELECT SUM(Total) 'Toplam Fatura Degeri'
FROM Invoice;

--? En düşük, en yüksek ve ortalama fatura miktarlarını getirme
SELECT 
	MIN(Total) minFatura, 
	MAX(Total) maxFatura,
	ROUND(AVG(Total),2) avgFatura
FROM Invoice;

--? Fatura adres uzunluklarını listeleme
SELECT BillingAddress, LENGTH(BillingAddress) AS 'BillingAddressLength'
FROM Invoice;

--? Billy Cobham grubunun en kısa sürede çalan parçasını listeleme
SELECT * 
FROM Track
WHERE Composer = 'Billy Cobham'
ORDER BY Milliseconds ASC
LIMIT 1;

--? roger glover grubunun en uzun sürede çalan parçasını listeleme
SELECT * 
FROM Track
WHERE Composer = 'roger glover'
ORDER BY Milliseconds DESC
LIMIT 1;

-- v1
SELECT *, MIN(Milliseconds) 'En Kisa Parca'
FROM Track
WHERE Composer = 'roger glover';

SELECT *, MAX(Milliseconds) 'En Uzun Parca'
FROM Track
WHERE Composer = 'roger glover';

--! Birden fazla fonksiyon kullanırken diğer alanlara dikkat etmek gerekir
SELECT MAX(Milliseconds), MIN(Milliseconds), *
FROM Track
WHERE Composer = 'roger glover';

--# GROUP BY: Verileri gruplama

--? Faturaları ülkeye göre gruplama
SELECT * 
FROM Invoice
GROUP BY BillingCountry;

--? Her bir ülke için kesilen ortalama fatura miktarını getirme
SELECT *, ROUND(AVG(Total),2)
FROM Invoice
GROUP BY BillingCountry;

--? Sadece ortalama fatura miktarı 6'ten fazla olan ülkeleri liseteleme
SELECT *, ROUND(AVG(Total),2)
FROM Invoice
GROUP BY BillingCountry
HAVING AVG(Total) > 6;

--# SUBQUERY: İç içe sorgular kullanma

--? Ortalama fatura miktarından yüksek olan faturaları listeleme

--1 Ortalama fatura miktarını hesaplama
SELECT ROUND(AVG(Total))
FROM Invoice;

--Final query 
SELECT * 
FROM Invoice
WHERE Total > 6;

-- SubQuery exp of perviuos question
SELECT * 
FROM Invoice
WHERE Total > ( SELECT ROUND(AVG(Total)) FROM Invoice );


--? Track tablosundaki "Big Ones" albümünün parçalarını listeleme
-- Önce albümün bilgilerini bul, ardından AlbumId değerini al ve parçaları listele

--1 'Big Ones' albumune ait  biligileri getir
SELECT * 
FROM Album
WHERE Title = 'Big Ones';

--2 Album Id`si 5 olan parcalri listelem
SELECT * 
FROM Track 
WHERE AlbumId = 5;

--Final solution with subQuery
SELECT * 
FROM Track 
WHERE AlbumId = (SELECT AlbumId
				FROM Album
				WHERE Title = 'Big Ones');
				

--? Mark Philips için kesilen faturaları listeleme

--# JOIN: Tabloları birleştirme

--? Her bir albüm ve ait olduğu sanatçı bilgilerini getirme (LEFT JOIN)
SELECT * 
FROM Album 
LEFT JOIN Artist ON Album.ArtistId = Artist.ArtistId;

--? Her bir sanatçı ve ona ait albümleri listeleme (INNER JOIN)
SELECT * 
FROM Artist  
JOIN Album ON Album.ArtistId = Artist.ArtistId;
