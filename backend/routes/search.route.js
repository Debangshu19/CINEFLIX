const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');

router.get("/person/:query", searchController.searchPerson);
router.get("/movie/:query", searchController.searchMovie);
router.get("/tv/:query", searchController.searchTv);
router.get("/history", searchController.getSearchHistory);
router.delete("/history/:id", searchController.removeItemFromSearchHistory);

module.exports = router;