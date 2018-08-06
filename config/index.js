//подключение к базе 
exports.mongoUrl = process.env.MONGOURI || "mongodb://localhost:27017/blog"
//постов на странице 
exports.postsPerPage = 4
