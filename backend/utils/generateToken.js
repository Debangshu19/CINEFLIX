const jwt = require('jsonwebtoken');
const ENV_VARS = require('../config/envVars');

module.exports.generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {expiresIn: '14d'});

    res.cookie('jwt-cineflix', token, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevents XSS attacks cross-site scripting attacks, make it not be accessed by JavaScript
        secure: ENV_VARS.NODE_ENV !== 'development',
        sameSite: "strict" //CSRF attacks cross-site request forgery attacks
    });
    return token;
};