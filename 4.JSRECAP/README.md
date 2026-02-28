## let:
- yeniden tanımlama yok. let a = 1 bitti. tekrar let a=.... olmaz. redeclared yapılamaz.
- ama değeri değiştirilebilir. let a =1, sonra a=3 olabilir. reassign var.
- block scope(block içindeki let ile tanımlanan değişkene block dışında erişememe hali)
if (true) {
  let b = 5;
}
console.log(b);

## const
- yeniden tanımlama yok. let a = 1 bitti. tekrar let a=.... olmaz. redeclared yapılamaz.
- değeri değiştirilemez.ama----> 
const obj = { name: "Ali" };
obj.name = "Veli"; // ✅ olur

Referans sabittir, içeriği değişebilir.
- block scope(block içindeki let ile tanımlanan değişkene block dışında erişememe hali)
if (true) {
  let b = 5;
}
console.log(b);

## var
- Modern JavaScript'te önerilmez.


## HOISTING

🔹 var Hoisting

var değişkenleri hoist edilir ve başlangıç değeri undefined olur.

console.log(a); // undefined
var a = 5;

JavaScript bunu arka planda şöyle algılar:

var a;          // yukarı alındı
console.log(a); // undefined
a = 5;          // atama burada

Yani hata vermez, undefined döner.

🔹 let ve const Hoisting

Bunlar da hoist edilir ❗
Ama Temporal Dead Zone (TDZ) denen bir durum vardır.

Tanımlanmadan önce erişmeye çalışırsan hata alırsın:

console.log(a); // ❌ ReferenceError
let a = 5;

Neden?

Arka planda şöyle olur:

// a bellekte var ama henüz kullanılamaz (TDZ)
let a = 5;

Yani:

Hoisting var ✅

Ama erişim yok ❌

🔹 Temporal Dead Zone (TDZ)

Bir değişkenin:
-Block’un başı ile
-Tanımlandığı satır arasındaki bölge

Bu aralıkta değişkene erişemezsin.

{
  // TDZ başlıyor
  console.log(x); // ❌
  let x = 10;     // TDZ bitiyor
}
🔹 Fonksiyonlarda Hoisting

Fonksiyon deklarasyonları tamamen hoist edilir:

test(); // ✅ Çalışır

function test() {
  console.log("Merhaba");
}

Ama function expression hoist edilmez:

test(); // ❌

var test = function() {
  console.log("Merhaba");
};

Burada var test hoist edilir ama değeri undefined olur.

🎯 Kısaca Mantık

var → Hoist + undefined

let/const → Hoist + TDZ (kullanamazsın)

function declaration → tamamen hoist


## TDZ 
🔥 TDZ (Temporal Dead Zone) Nedir?

TDZ = Bir değişkenin tanımlanmadan önce kullanılamadığı zaman aralığıdır.
TDZ şundan dolayı var:

JavaScript seni yanlışlıkla erken kullanım hatalarından korumak ister.
Benzetme: var:

"Oda hazır ama içi boş."

let/const:

"Oda var ama kapı kilitli. Tanımlanana kadar içeri giremezsin."

👉 let ve const için geçerlidir.
👉 var için yoktur.

👇 Örneğe Bak
console.log(a);
let a = 5;

Bu kod ne verir?

❌ ReferenceError

Ama neden?

🧠 JavaScript Arka Planda Ne Yapıyor?

Kod çalışmadan önce:

let a belleğe alınır (hoist edilir)

Ama değer atanmamıştır

Ve henüz kullanıma açılmamıştır

Yani şu durum oluşur:

a var ama dokunamazsın 😄

İşte bu aralık TDZ’dir.

📍 TDZ Nerede Başlar, Nerede Biter?

TDZ:

Bloğun başında başlar

Değişkenin tanımlandığı satırda biter

Örnek:

{
  console.log(x); // ❌ TDZ
  let x = 10;     // ✅ burada TDZ biter
  console.log(x); // 10
}

Yani:

Block başı  →  let satırı arası = TDZ
