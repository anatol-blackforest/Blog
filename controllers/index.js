//сводим модели
const add = require("./add")
const page = require("./page")
const list = require("./list")
const post = require("./post")
const posts = require("./posts")
const category = require("./category")

module.exports = {
    list,
    page,
    add,
    post,
    posts,
    category
}
