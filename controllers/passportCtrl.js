//считываем админаккаунт с базы для сравнения с данными авторизации
const {Admin} = require('../models');
const crypto = require('./crypto');

module.exports = async (payload, done) => {
    try {
        const admin = await Admin.findById(payload.userId).select('name id')
        return (admin) ? done(null, admin) : done(null, false)
    } catch (e) {
        done(null, false)
        console.log(e)
    }
};
