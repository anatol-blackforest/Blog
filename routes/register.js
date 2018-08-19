//установка админа
const express = require('express');
const router = express.Router();
const {register} = require('../controllers');

/* GET install. */
router.post('/', register)

module.exports = router;
