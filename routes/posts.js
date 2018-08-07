const express = require('express');
const router = express.Router();
const {posts, post} = require('../controllers');

/* GET all posts. */
router.get('/', posts);
router.get('/:id', post);

module.exports = router;
