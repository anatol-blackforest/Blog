const Sequelize = require('sequelize');
const connect = require("./connect")

module.exports = connect.define('categories', {
    title: {
        type: Sequelize.STRING,
        primaryKey: true
    }
},{
    createdAt: false,
    updatedAt: false,
});
