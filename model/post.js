const Sequelize = require('sequelize')
const Category = require("./category")
const connect = require("./connect")

const Post = connect.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    category: Sequelize.STRING,
    postbody: Sequelize.TEXT,
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

Post.belongsTo(Category, {foreignKey: 'category', targetKey: 'title'});

module.exports = Post
