const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tv.controller');

router.get("/trending", tvController.getTrendingTv);
router.get("/:id/trailers", tvController.getTvTrailers);
router.get("/:id/details", tvController.getTvDetails);
router.get("/:id/similar", tvController.getSimilarTvs);
router.get("/:category", tvController.getTvsByCategory);

module.exports = router;