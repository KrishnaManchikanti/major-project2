const express = require('express');

const router = express.Router();
const homeController = require('../controlers/homeControler');
router.get('/',homeController.home);
router.get('/temp',homeController.temp);
module.exports=router;