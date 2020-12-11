const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controlers/users_controller');

router.get('/signup',userController.SignUpPage);
router.get('/signin',userController.SignInPage);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/sign-out',userController.signout);
router.post('/sign-up',userController.signup);
router.post('/update/:id',userController.update);
//use passport as a middleware
router.post('/sign-in',passport.authenticate(
    'local',
    //on failure
    {failureRedirect:'/users/signin'}
    //on success
),userController.signin);

module.exports =router;