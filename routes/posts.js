const express = require('express');
const router = express.Router();
const passport = require('passport')
const {posts, post, add, update, deleteCtrl} = require('../controllers');

/* Роутинг. */
router.get('/', posts);
router.get('/:id', post);
router.post('/', passport.authenticate('jwt', {session: false}), add)
router.put('/:id', passport.authenticate('jwt', {session: false}), update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), deleteCtrl)

module.exports = router;
