const express = require('express');

const router = express.Router();

const friendshipController = require('../controlers/friendship_controller');
router.get('/',friendshipController.addfriend);

module.exports = router;