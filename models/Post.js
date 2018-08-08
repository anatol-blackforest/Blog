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
        lowercase:  true
    },
    postbody: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // createdAt, updatedAt
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true // for console.log, to output children
    }
});

module.exports = mongoose.model('posts', PostSchema);
