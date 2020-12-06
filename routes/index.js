const express = require('express');

const router = express.Router();
const homeController = require('../controlers/homeControler');
const passport = require('passport');
console.log('r loaded');

router.get('/profile',passport.checkAuthentication,homeController.profile);
router.get('/',homeController.SignUpPage);
router.get('/signin',homeController.SignInPage);

router.post('/sign-up',homeController.signup);
//use passport as a middleware
router.post('/sign-in',passport.authenticate(
    'local',
    //on failure
    {failureRedirect:'/signin'}
    //on success
),homeController.signin);

module.exports=router;