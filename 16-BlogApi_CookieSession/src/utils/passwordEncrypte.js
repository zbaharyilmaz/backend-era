"use strict";
const crypto = require("node:crypto");
module.exports= (password) => {
  /* const salt = "jakdlldşdşdşdşdşşdşdşdşdşzzzzzz";
  const iteration = 10000;
  const keylen = 32;
  const digest = "sha512"; */ //! ENV de olması gerekir.
  const salt=process.env.PASS_SALT
  //! env den STRING gelir. pasrseInt ile number dönüşümü yap.
  const iteration=parseInt(process.env.PASS_ITERATION)
  const keylen=parseInt(process.env.PASS_KEYLEN)
  const digest=process.env.PASS_DIGEST
  return crypto
    .pbkdf2Sync(password, salt, iteration, keylen, digest)
    .toString("hex");
};
// string olmadan öncesi: <Buffer ad 40 d1 23 67 7f b9 c2 1d ea 2b d4 6f a9 8e c2 e0 83 24 34 10 14 74 0c b3 9e 60 52 22 b4 14 fc>
