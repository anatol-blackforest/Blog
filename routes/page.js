const express = require('express');
const router = express.Router();
const {page} = require('../controllers');

/* GET start page. */
router.get('/:activePage', page);

module.exports = router;
