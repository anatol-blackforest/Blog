const express = require('express');
const router = express.Router();
const {deleteCtrl} = require('../controllers');

router.delete('/:id', deleteCtrl)

module.exports = router;
