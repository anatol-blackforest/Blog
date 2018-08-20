// сводим роуты
const homeRouter = require("./home")
const postsRouter = require("./posts")
const categoryRouter = require("./category")
const pageRouter = require("./page")
const registerRouter = require("./register")
const loginRouter = require("./login")

module.exports = {homeRouter, postsRouter, categoryRouter, pageRouter, registerRouter, loginRouter}
