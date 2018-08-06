const {Post, Category} = require("../models")
const {postsPerPage} = require("../config")

module.exports = async (req, res) => {
    try{
        const posts = await Post.find().limit(postsPerPage).sort({createdAt: -1})
        const categories = await Category.find().sort()
        return {posts, categories}
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        res.status(500).json({error: 500});
    };
}