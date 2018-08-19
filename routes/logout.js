//авторизация
const express = require('express');
const router = express.Router();

//выход
router.get("/", (req, res) => {
    req.session = null;
    res.status(200).json({hint: "logout"});
});

module.exports = router;
