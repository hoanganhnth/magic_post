const { model } = require('mongoose');
const allowedOrigins = require('../config/allowed_origins');
const credential  = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', true)
        res.header('Access-Control-Allow-Credentials', true)
    }
    next();
}
module.exports = credential;