"use strict"
/* -------------------------------------------------------
EXPRESS - Personnel API
------------------------------------------------------- */

const Token = require('../models/token');

module.exports = async (req, res, next) => {

    // Authorization: Token ...tokenKey...
    // Authorization: ApiKey ...tokenKey...
    // Authorization: Bearer ...tokenKey...
    // Authorization: Auth ...tokenKey...
    // Authorization: X-API-KEY ...tokenKey...
    // Authorization: x-auth-token ...tokenKey...

    req.user = null;

    // Get token from header:
    const auth = req.headers?.authorization || null; // Token ...TokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...TokenKey...']

    if (tokenKey && tokenKey[0] == 'Token') {

        const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId');

        if (tokenData) req.user = tokenData.userId
    };

    next()

};