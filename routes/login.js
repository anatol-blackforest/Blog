//авторизация
const passport = require('passport');
const express = require('express');
const router = express.Router();
const {login} = require('../controllers');

/* GET users listing. */

//авторизация
router.post('/', login)

module.exports = router;
