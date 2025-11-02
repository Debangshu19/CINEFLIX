const searchService = require('../services/tmdb.service');
const ENV_VARS = require('../config/envVars');
const api = ENV_VARS.TMDB_API_KEY;
const User = require('../models/user.model');

module.exports.searchPerson = async (req, res) => {
    const {query} = req.params;
    try{
        const response = await searchService.fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&api_key=${api}&include_adult=false&language=en-US&page=1`);
        if(response.results.length === 0){
            return res.status(404).json({success:false, message: "No results found"});
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({success:true, content: response.results});
    }catch(err){
        console.log("Error in searchPerson", err.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.searchMovie = async (req, res) => {
    const {query} = req.params;
    try{
        const response = await searchService.fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api}&include_adult=false&language=en-US&page=1`);
        if(response.results.length === 0){
            return res.status(404).json({success:false, message: "No results found"});
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].backdrop_path,
                    title: response.results[0].original_title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({success:true, content: response.results});
    }catch(err){
        console.log("Error in searchPerson", err.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.searchTv = async (req, res) => {
    const {query} = req.params;
    try{
        const response = await searchService.fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${api}&include_adult=false&language=en-US&page=1`);
        if(response.results.length === 0){
            return res.status(404).json({success:false, message: "No results found"});
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].backdrop_path,
                    title: response.results[0].original_name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({success:true, content: response.results});
    }catch(err){
        console.log("Error in searchPerson", err.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.getSearchHistory = async (req, res) => {
    try{
        console.log("User data from getSearchHistory: ", req.user);
        res.status(200).json({success:true, content: req.user.searchHistory});
    }catch(err){
        console.log("Error in getSearchHistory", err.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};

module.exports.removeItemFromSearchHistory = async (req, res) => {
    let {id} = req.params; //it is coming as string 
    id = parseInt(id);
    try{
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id
                }
            }
        });
        res.status(200).json({success:true, message: "Item removed from search history"});
    }catch(err){
        console.log("Error in removeItemFromSearchHistory", err.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
};
