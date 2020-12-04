const express = require('express');

const router = express.Router();
const homeController = require('../controlers/homeControler');

console.log('r loaded');

router.post('/sign-up',homeController.signup);

router.get('/',homeController.home);
router.get('/home2',homeController.home2);
module.exports=router;