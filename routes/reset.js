const express = require('express');
const router = express.Router();
    const resetController = require('../controlers/reset_controller');
    router.get('/',resetController.details);
    router.post('/verify-email', resetController.verify);
    router.post('/newP',resetController.newP);
    router.get('/reset_password',resetController.resetPassword);
module.exports = router;