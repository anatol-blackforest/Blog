//считываем админаккаунт с базы для сравнения с данными авторизации
const {Admin} = require('../models');
const {noAuth} =  require('../config/messages');
const crypto = require('./crypto');

module.exports = async (req, name, password, done) => {
    try{
        password = crypto(password)
        let admin = await Admin.findOne({name, password})
        return (admin) ? done(null, admin) : done(null, false)
    }catch(err){
        done(null, false)
        console.error(err)
    }
};
