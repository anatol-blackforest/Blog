const express = require('express');
const router = express.Router();
const connect = require("../model/connect")
const Post = require("../model/post")

router.post('/add', async (req, res, next) => {
  
  try{
    await connect.authenticate()
    console.log('Connection has been established successfully.');
    const resultPost = await Post.create(req.body)
    const resultCategory = await Category.create(req.body.category)
    if (resultPost && resultCategory) res.json(resultPost);
    else res.status(500).json({error: 500});
  }catch(err) {
      console.error('Unable to connect to the database:', err);
      res.status(500).json({error: 500});
  };
});

module.exports = router;
