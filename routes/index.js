const express = require('express');
const router = express.Router();
const {list} = require('../controllers');

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { list: list(req, res) }));

module.exports = router;
