const express = require('express');
const router = express.Router();

const likesController = require('../controlers/likes_controller'); 
router.post('/toogle',likesController.toggleLike); 
module.exports = router;