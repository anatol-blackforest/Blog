//добавление небесных тел
const passport = require('passport');
const express = require('express');
const router = express.Router();
const {uploader, postuploader} = require('../controllers');
const {noAuth} = require('../config/messages');

/* GET users listing. */

//авторизация
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err) 
        if (!user) return res.status(401).json({hint: noAuth, isAdmin: false});
        console.log('got user');
        return res.status(200).json({user, isAdmin: true});
    })(req, res, next)
})

module.exports = router;
