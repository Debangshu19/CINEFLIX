const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ENV_VARS = require('../config/envVars');

module.exports.protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies['jwt-cineflix'] || res.locals.T;
        console.log("Token: ", token);
        if(!token){
            return res.status(401).json({success:false, message: "Unauthorized - no token provided"});
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false, message: "Unauthorized - invalid token"});
        }
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({success:false, message: "Unauthorized - user not found"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log("Error in protectRoute middleware: ", err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};
