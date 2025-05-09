"use strict";

/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Authentication middleware:

const User = require('../models/user.model');

module.exports = async (req, res, next) => {

    req.user = null;

    if (req.session?._id) {

        const user = await User.findOne({ _id: req.session._id, email: req.session.email });

        // if (user) {
        //     req.user = user;
        // } else {
        //     req.session = null;
        // };

        user ? req.user = user : req.session = null;

    };

    next();

};