/*const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');

router.get("/person/:query", searchController.searchPerson);
router.get("/movie/:query", searchController.searchMovie);
router.get("/tv/:query", searchController.searchTv);
router.get("/history", searchController.getSearchHistory);
router.delete("/history/:id", searchController.removeItemFromSearchHistory);

module.exports = router;*/
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const protectRoute = require('../middleware/protectRoute'); // Import protectRoute middleware

// Apply protectRoute to routes that need authentication
router.get("/person/:query", protectRoute, searchController.searchPerson);
router.get("/movie/:query", protectRoute, searchController.searchMovie);
router.get("/tv/:query", protectRoute, searchController.searchTv);
router.get("/history", protectRoute, searchController.getSearchHistory); // ✅ Protecting search history
router.delete("/history/:id", protectRoute, searchController.removeItemFromSearchHistory); // ✅ Protecting delete history

module.exports = router;
