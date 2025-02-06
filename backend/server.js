const express = require('express');
const app = express();
const ENV_VARS = require('./config/envVars');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const movieRoutes = require('./routes/movie.route');
const tvRoutes = require('./routes/tv.route');
const searchRoutes = require('./routes/search.route');
const middleware = require('./middleware/protectRoute');
const connectToDB = require('./config/db');
const PORT = ENV_VARS.PORT;
const cors = require('cors');

connectToDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const corsOptions = {
    origin: 'https://cineflix-psi.vercel.app', // New frontend URL
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", middleware.protectRoute, movieRoutes);
app.use("/api/v1/tv", middleware.protectRoute, tvRoutes);
app.use("/api/v1/search", middleware.protectRoute, searchRoutes);
