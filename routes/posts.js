const express = require('express');
const router = express.Router();
const {posts, post, add, update, deleteCtrl} = require('../controllers');

/* Роутинг. */
router.get('/', posts);
router.get('/:id', post);
router.post('/', add)
router.put('/:id', update);
router.delete('/:id', deleteCtrl)

module.exports = router;
