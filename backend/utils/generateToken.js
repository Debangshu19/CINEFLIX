const jwt = require('jsonwebtoken');
const ENV_VARS = require('../config/envVars');

module.exports.generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '14d' });

    res.cookie('jwt-cineflix', token, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none' // 'none' allows cross-origin
    });

    return token;
};
