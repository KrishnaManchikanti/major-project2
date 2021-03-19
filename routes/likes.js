const express = require('express');

const router = express.Router();

const likesController = require('../controlers/like_controller');

router.get('/toggle',likesController.toggleLike);

module.exports = router;