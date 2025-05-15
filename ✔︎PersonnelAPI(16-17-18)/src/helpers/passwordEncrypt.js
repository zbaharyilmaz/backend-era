"use strict";
const {
    crypto,
    SECRET_KEY: keyCode,
    LOOP_COUNT:loopCount,
    CHAR_COUNT: charCount,
    ENC_TYPE: encType,
} =  {
    crypto: require("node:crypto"),
    ...process.env
};

//& .env'den gelen değerler string olduğu için sayıya çevriliyor.
const loopCountNum= Number(loopCount);
const charCountNum= Number(charCount);
module.exports=(password)=>{
return crypto.pbkdf2Sync(password, keyCode, loopCountNum, charCountNum, encType).toString("hex")
}
//! Amaç: Girilen bir şifreyi kriptografik olarak güvenli bir şekilde şifrelemek (hashlemek) ve bunu hex formatında döndürmek.


//* pbkdf2Sync(...) = Senkron şekilde şifreyi hash’liyor.

//* password: Kullanıcının girdiği şifre

//* keyCode: Şifreleme için kullanılacak tuz (salt) — gizli bir kelime

//* loopCountNum: Şifreleme algoritması kaç defa tekrar edilecek

//* charCountNum: Sonuç kaç karakter uzunluğunda olacak

//* encType: Hangi algoritma kullanılacak (örn. sha512)

//* .toString("hex"): Sonuç hexadecimal (16'lık sayı sistemi) olarak döndürülür.