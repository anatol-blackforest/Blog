//подключение к базе 
exports.mongoUrl = process.env.MONGOURI || "mongodb://localhost:27017/blog"
//ключ сессии
exports.key = process.env.KEY || "key"
//постов на странице 
exports.postsPerPage = 4
//минимальная длинна пароля при установке
exports.passLength = 4
