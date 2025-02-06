const dotenv = require('dotenv');
dotenv.config();
module.exports.MONGO_URI = process.env.MONGO_URI;
module.exports.PORT = process.env.PORT || 5000;
module.exports.JWT_SECRET = process.env.JWT_SECRET;
module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.TMDB_API_KEY = process.env.TMDB_API_KEY;