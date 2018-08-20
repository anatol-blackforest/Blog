const jwt = require('jsonwebtoken')
const {Admin} = require('../models');
const crypto = require('./crypto');
const {noAuth} = require('../config/messages');
const {key} = require('../config');

module.exports = async (req, res, next) => {
    try{
        console.log(req.body)
        password = crypto(req.body.password)
        let admin = await Admin.findOne({name: req.body.name, password})
        console.log(admin)
        if (admin) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                name: admin.name,
                userId: admin._id
            }, key, {expiresIn: 60 * 60})
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            // Пароли не совпали
            res.status(401).json({hint: noAuth})
        }
    }catch(err){
        res.status(401).json({error: 500})
        console.error(err)
    }
}