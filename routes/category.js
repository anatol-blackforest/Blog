const express = require('express');
const router = express.Router();
const {category} = require('../controllers');

/* GET start page. */
router.get('/:name', category);

module.exports = router;
