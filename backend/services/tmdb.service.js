/*const axios = require('axios');
const ENV_VARS = require('../config/envVars');

module.exports.fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY
        },
    };
    const response = await axios.get(url, options);
    if(response.status !== 200){
        throw new Error("Failed to fetch data from TMDB" + response.statusText);
    }
    return response.data;
};*/
const axios = require("axios");
const ENV_VARS = require("../config/envVars");

// Create axios instance for TMDB API
const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
  },
});

// Interceptor for smooth handling (no crashes)
tmdbAPI.interceptors.response.use(
  (response) => response, // success
  (error) => {
    if (error.response) {
      console.warn(
        `TMDB API Warning: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      console.warn("TMDB API Warning: No response from TMDB server");
    } else {
      console.warn("TMDB Request Setup Error:", error.message);
    }

    // ✅ Instead of throwing error, return a default empty object
    return { data: { results: [] } };
  }
);

// Wrapper function to fetch from TMDB
module.exports.fetchFromTMDB = async (endpoint) => {
  try {
    const response = await tmdbAPI.get(endpoint);
    return response.data || { results: [] };
  } catch (err) {
    // ✅ Should rarely reach here, but still safe fallback
    console.error("Unexpected TMDB fetch error:", err.message);
    return { results: [] };
  }
};
