const express = require('express');

const router = express.Router();
const usersApi = require('../../../controlers/api/v1/users_api');

router.post('/create-session', usersApi.signin);

module.exports = router;