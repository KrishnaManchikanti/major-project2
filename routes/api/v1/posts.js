const express = require('express');

const router = express.Router();
const postsApi = require("../../../controlers/api/v1/posts_api");


router.get('/', postsApi.index);
router.delete('/:id',postsApi.destroy);


module.exports = router;