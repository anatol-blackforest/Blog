//сводим модели
const connection = require("./connection")
const Category = require("./Category")
const Post = require("./Post")
const Admin = require("./Admin")

module.exports = {
    connection,
    Category,
    Post,
    Admin
}
