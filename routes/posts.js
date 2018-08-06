const express = require('express');
const router = express.Router();
const {posts} = require('../controllers');

/* GET all posts. */
router.get('/', posts);

module.exports = router;
