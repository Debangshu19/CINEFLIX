const movieService = require('../services/tmdb.service');
const ENV_VARS = require('../config/envVars');
const api = ENV_VARS.TMDB_API_KEY;

module.exports.getTrendingMovie = async (req, res) => {
    try{
        const data = await movieService.fetchFromTMDB(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api}&language=en-US`);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({success:true, content: randomMovie}); //content = movie,tvshows,etc
    }catch(err){
        console.log(err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getMovieTrailers = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await movieService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api}&language=en-US`);
        res.status(200).json({success:true, trailers: data.results});
    }catch(err){
        if(err.message.includes("404")){
            res.status(404).send(null);
        }
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getMovieDetails = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await movieService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US`);
        res.status(200).json({success:true, content: data});
    }catch(err){
        if(err.message.includes("404")){
            res.status(404).send(null);
        }
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getSimilarMovies = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await movieService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api}&language=en-US&page=1`);
        res.status(200).json({success:true, similar: data.results});
    }catch(err){
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getMoviesByCategory = async (req, res) => {
    const {category} = req.params;
    try{
        const data = await movieService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?api_key=${api}&language=en-US&page=1`);
        res.status(200).json({success:true, content: data.results});
    }catch(err){
        res.status(500).json({success:false, message: "Internal server error"});
    }
};