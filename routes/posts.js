const express = require('express');
const router = express.Router();
const {posts, post, update} = require('../controllers');

/* GET all posts. */
router.get('/', posts);
router.get('/:id', post);
router.put('/:id', update);

module.exports = router;
