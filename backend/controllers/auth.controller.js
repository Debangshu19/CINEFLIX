/*const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateTokenAndSetCookie } = require('../utils/generateToken');
module.exports.signup = async (req, res) => {
    try{
        const {email, password, username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false, message: "Please fill in all fields"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message: "Please enter a valid email"});
        }
        if(password.length < 6){
            return res.status(400).json({success:false, message: "Password must be at least 6 characters long"});
        }
        const existingUserByEmail = await User.findOne({email: email});
        if(existingUserByEmail){
            return res.status(400).json({success:false, message: "User with this email already exists"});
        }
        const existingUserByUsername = await User.findOne({username: username});
        if(existingUserByUsername){
            return res.status(400).json({success:false, message: "User with this username already exists"});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const PROFILE_PICS = ["/avator1.png","/avator2.png","/avator3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newUser = new User({
            email, 
            password: hashedPassword, 
            username, 
            image
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            //remove password from response
            res.status(201).json({success:true, 
                user: {
                    ...newUser._doc,
                    password: "",
                },
            });
        }
    }catch(err){
        console.error("Error in signup controller: ", err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};
module.exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message: "Please fill in all fields"});
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({success:false, message: "Invalid credentials"});
        }
        const isMatch = await bcryptjs.compare(password, user.password); // (current password, hashed password)
        if(!isMatch){
            return res.status(400).json({success:false, message: "Invalid credentials"});
        }
        generateTokenAndSetCookie(user._id, res);
        //remove password from response
        res.status(200).json({success:true, 
            user: {
                ...user._doc,
                password: "",
            },
        });
    }catch(err){
        console.error("Error in login controller: ", err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};
module.exports.logout = async (req, res) => {
    try{
        res.clearCookie('jwt-cineflix');
        res.status(200).json({success:true, message: "Logged out successfully"});
    }catch(err){
        console.error("Error in logout controller: ", err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.authCheck = async(req,res) =>{
    try{
        res.status(200).json({success:true, user: req.user});
    }catch(err){
        console.error("Error in authCheck controller: ", err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
}*/
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateTokenAndSetCookie } = require('../utils/generateToken');

module.exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }
        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "User with this username already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const PROFILE_PICS = ["/avator1.png", "/avator2.png", "/avator3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

        if (newUser) {
            const token = generateTokenAndSetCookie(newUser._id, res); // Generate token and set cookie
            await newUser.save();
            res.status(201).json({
                success: true,
                token, // Send the token as part of the response
                user: {
                    ...newUser._doc,
                    password: "", // Exclude password
                },
            });
        }
    } catch (err) {
        console.error("Error in signup controller: ", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            success: true,
            token, // Send the token in the response
            user: {
                ...user._doc,
                password: "", // Exclude password
            },
        });
    } catch (err) {
        console.error("Error in login controller: ", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt-cineflix');
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in logout controller: ", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports.authCheck = async (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        console.error("Error in authCheck controller: ", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
