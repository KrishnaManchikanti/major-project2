const express = require('express');

const router = express.Router();

const homeController = require('../controlers/home_controller');
console.log('r loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/reset',require('./reset'));
router.use('/api',require('./api'));

module.exports=router;