"use strict";
/* //! Middlewares*/
// Middleware, Express’te request ile response arasına giren fonksiyonlardır.
// ara yazılım, ara eleman, aslında bizi tekrardan kurtaran fonksiyonlar. middleware genelde tekrar eden işleri merkezi olarak yapar.
//* next() → middleware'in bir sonraki middleware'e geçmesini sağlar. Eğer next() çağrılmazsa, istek o middleware'de takılı kalır ve sonraki middleware'ler çalışmaz. Bu, middleware zincirinde akışı kontrol etmek için önemlidir. next() fonksiyonu, genellikle bir middleware'in sonunda çağrılır, böylece sonraki middleware'e geçilir. Eğer bir hata oluşursa, next() fonksiyonuna bir hata nesnesi geçirilebilir, bu da Express'in hata işleme mekanizmasını tetikler.

const middleware1 = (req, res, next) => {
  req.messageFn1 = "Hello, it is running 1";
  next();
};
const middleware2 = (req, res, next) => {
  req.messageFn2 = "Hello, it is running 2";
  next();
};

module.exports = { middleware1, middleware2 }; // export middlewares

//& DIGER YOL 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟

module.exports = {
  middleware1: (req, res, next) => {
    req.messageFn1 = "Hello, it is running 1";
    next();
  },
  middleware2: (req, res, next) => {
    req.messageFn2 = "Hello, it is running 2";
    next();
  },
};
