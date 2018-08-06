const express = require('express');
const router = express.Router();
const {list} = require('../controllers');

/* GET start page. */
router.get('/', list);

module.exports = router;
