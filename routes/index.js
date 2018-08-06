const express = require('express');
const router = express.Router();
const {list} = require('../controllers');

/* GET home page. */
router.get('/', async (req, res, next) => {
    const {posts, categories} = await list(req, res)
    console.log(posts)
    res.status(200).render('index', await list(req, res))
});

module.exports = router;
