//устанавливаем админа для приложения
const {Admin} = require('../models');
const {alreadyInst, enterLogPass, enterLogin, enterPass, passLengthHint, success, installed} = require('../config/messages');
const {passLength} = require('../config');
const crypto = require('./crypto');

module.exports = async (req, res) => {
    try{
        let body = req.body
        //проверяем есть ли адмиин
        const array = await Admin.find()
        //если аккаунт уже был установлен
        if (array.length !== 0) res.status(409).json({hint: alreadyInst}); 
        //если форма незаполнена
        else if (body && !body.name && !body.password)  res.status(406).json({hint: enterLogPass})
        //Если нет логина
        else if (body && !body.name) res.status(406).json({hint: enterLogin}) 
        //Если нет пароля
        else if (body && !body.password) res.status(406).json({hint: enterPass}) 
        //Если пароль меньше установленной длинны
        else if (body && body.password.length < passLength) res.status(406).json({hint: passLengthHint(passLength)}) 
        //длинна пароля НЕ менее 4 символов
        else if (body && body.name.length > 0 && body.password.length > 3){
            let adminAccount = {}
            adminAccount.name = body.name;
            adminAccount.password = await crypto(body.password);
            let admin = new Admin(adminAccount);
            await admin.save(adminAccount)
            res.status(200).json({hint: success, isAdmin: req.isAuthenticated()})
        }
          
    }catch(err){
        res.status(500).json({hint: err});
        console.error(err)
    }
};
