const Sequelize = require('sequelize')
const Category = require("./category")
const connect = require("./connect")

const Post = connect.define('posts', {
    title: Sequelize.STRING,
    parentCategory: Sequelize.STRING,
    postbody: Sequelize.TEXT,
},{
    createdAt: false,
    updatedAt: false,
});

Post.belongsTo(Category, {foreignKey: 'parentCategory', targetKey: 'title'});

module.exports = Post
