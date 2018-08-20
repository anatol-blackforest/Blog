//модель приложения
const mongoose = require('mongoose');
mongoose.Promise = Promise;

//схема аккаунта
const AdminSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 4,
        required: "Enter login!"
    },
    password: {
        type: String,
        required: "Enter password!"
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
