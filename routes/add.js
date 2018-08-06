const express = require('express');
const router = express.Router();
const {add} = require('../controllers');

router.post('/', (req, res) => add(req, res))

module.exports = router;
