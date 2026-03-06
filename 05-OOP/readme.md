JavaScript’te OOP (Object Oriented Programming) yani Nesne Yönelimli Programlama, kodu nesneler üzerinden organize etme yaklaşımıdır.
OOP (Object-Oriented Programming) temel fikir: veri ve davranışı aynı yapı içinde toplamak.
OOP’i en basit şekilde düşün: gerçek hayattaki bir şeyi programda modellemek.

Basitçe:

Gerçek dünyadaki varlıkları (Car, User, Animal gibi) kodda modellememizi sağlar.

Class → plan, şablon
Object → o plandan üretilen gerçek şey

8️⃣ Görsel mantık
Class (plan)
   ↓
Car
   ↓
Objects
   ↓
car1, car2, car3

## 🧠 JavaScript’te OOP Nedir?

JavaScript’te OOP:

Nesneler (objects)

Class yapısı

Prototypal inheritance

Encapsulation teknikleri

üzerine kuruludur.

ES6 ile gelen class yapısı sayesinde klasik OOP daha okunabilir hale gelmiştir.

## 🎯 OOP'nin 4 Temel Prensibi

Encapsulation (Kapsülleme)

Abstraction (Soyutlama)

Inheritance (Kalıtım)

Polymorphism (Çok Biçimlilik)


1️⃣ Encapsulation (Kapsülleme)

Veriyi ve o veriye ait metodları bir arada tutmaktır.
Ayrıca dışarıdan doğrudan erişimi kontrol etmektir.

Örnek:
class BankAccount {
    #balance = 0; // private field

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

Burada:

#balance → private (dışarıdan erişilemez)

Kullanıcı sadece metodlar üzerinden işlem yapabilir

👉 Veri korunmuş oldu.

2️⃣ Abstraction (Soyutlama)

Gereksiz detayları gizleyip sadece gerekli kısmı göstermektir.

Örnek:

class Car {
    start() {
        this.#injectFuel();
        console.log("Car started");
    }

    #injectFuel() {
        console.log("Fuel injected");
    }
}

Kullanıcı sadece:

car.start();

yazar.

Yakıt nasıl enjekte edildiğini bilmek zorunda değildir.

👉 İç detay gizlendi.

3️⃣ Inheritance (Kalıtım)

Bir sınıfın başka bir sınıfın özelliklerini miras almasıdır.

Örnek:
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log("Generic sound");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Woof!");
    }
}

Dog, Animal’dan:

name özelliğini

speak metodunu

miras alır.

👉 Kod tekrarını azaltır.

4️⃣ Polymorphism (Çok Biçimlilik)

Aynı metodun farklı sınıflarda farklı davranmasıdır.

const animals = [
    new Animal("A"),
    new Dog("B")
];

animals.forEach(a => a.speak());

Çıktı farklı olur çünkü:

Animal → "Generic sound"

Dog → "Woof!"

👉 Aynı metod adı, farklı davranış.

Bu method overriding ile olur.

🔥 JavaScript’te OOP’nin Önemli Gerçeği

JavaScript aslında:

Prototype-based bir dildir.

Yani class yapısı aslında syntactic sugar’dır.

Şunun:

class Animal {}

arkasında aslında prototype sistemi vardır.

🧩 OOP Neden Kullanılır?

✔ Kod daha düzenli olur
✔ Büyük projelerde yönetilebilirlik artar
✔ Tekrar azalır
✔ Gerçek dünya modellemesi kolaylaşır
✔ SOLID prensiplerine uygun mimari kurulur

🎯 Özet Tablo
Prensip	Amaç
Encapsulation	Veriyi korumak
Abstraction	Gereksiz detayı gizlemek
Inheritance	Kod tekrarını azaltmak
Polymorphism	Esnek davranış sağlamak