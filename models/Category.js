//модель приложения
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// Схема категории
const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
        lowercase:  true
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

CategorySchema.virtual('posts', {
    ref: 'posts', // The model to use
    localField: 'name', // Find people where `localField`
    foreignField: 'category' // is equal to `foreignField`
});

module.exports = mongoose.model('categories', CategorySchema);
