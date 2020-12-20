const express = require('express');

const router = express.Router();

const postsApi = require('../../../controlers/api/v1/post_api');

router.get('/',postsApi.index);
module.exports =router;