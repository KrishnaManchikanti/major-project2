const express = require('express');

const router = express.Router();

const homeController = require('../controlers/home_controller');
console.log('r loaded');

router.get('/',homeController.home);
router.use('/users',require('./user'));
router.use('/posts',require('./posts'));

module.exports=router;