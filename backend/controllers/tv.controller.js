const tvService = require('../services/tmdb.service');
const ENV_VARS = require('../config/envVars');
const api = ENV_VARS.TMDB_API_KEY;

module.exports.getTrendingTv = async (req, res) => {
    try{
        const data = await tvService.fetchFromTMDB(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api}&language=en-US`);
        console.log(data);
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({success:true, content: randomTv}); //content = movie,tvshows,etc
    }catch(err){
        console.log(err);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getTvTrailers = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await tvService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api}&language=en-US`);
        res.status(200).json({success:true, trailers: data.results});
    }catch(err){
        if(err.message.includes("404")){
            res.status(404).send(null);
        }
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getTvDetails = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await tvService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?api_key=${api}&language=en-US`);
        res.status(200).json({success:true, content: data});
    }catch(err){
        if(err.message.includes("404")){
            res.status(404).send(null);
        }
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getSimilarTvs = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await tvService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${api}&language=en-US&page=1`);
        res.status(200).json({success:true, similar: data.results});
    }catch(err){
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getTvsByCategory = async (req, res) => {
    const {category} = req.params;
    try{
        const data = await tvService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?api_key=${api}&language=en-US&page=1`);
        res.status(200).json({success:true, content: data.results});
    }catch(err){
        res.status(500).json({success:false, message: "Internal server error"});
    }
};
