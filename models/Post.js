//модель приложения
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// Схема поста
const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        default: "No title"
    },
    category: {
        type: String,
        default: "No category"
    },
    postbody: {
        type: String,
        required: true
    }
}, {
    timestamps: true // createdAt, updatedAt
});

module.exports = mongoose.model('Posts', PostSchema);
