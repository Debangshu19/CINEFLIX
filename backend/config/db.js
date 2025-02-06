const mongoose = require('mongoose');
const ENV_VARS = require('./envVars');
function connectToDB() {
    const MONGO_URI = ENV_VARS.MONGO_URI;
    mongoose.connect(MONGO_URI).then(() => {
        console.log("Connected to the database");
    }).catch((error) => {  
        console.log("Error connecting to the database: ", error);
    });
}
module.exports = connectToDB;