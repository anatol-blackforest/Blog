//сводим модели
const add = require("./add")
const page = require("./page")
const list = require("./list")
const post = require("./post")
const posts = require("./posts")
const update = require("./update")
const category = require("./category")
const deleteCtrl = require("./deleteCtrl")
const register = require("./register")

module.exports = {
    list,
    page,
    add,
    post,
    posts,
    update,
    category,
    deleteCtrl,
    register
}
