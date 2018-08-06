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
    timestamps: true // createdAt, updatedAt
});

CategorySchema.virtual('posts', {
    ref: 'Post', // The model to use
    localField: 'category', // Find people where `localField`
    foreignField: 'name' // is equal to `foreignField`
});

module.exports = mongoose.model('Categories', CategorySchema);
