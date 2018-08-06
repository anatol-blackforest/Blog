const {Post, Category} = require("../models")
module.exports = async (req, res) => {
    try{
        const posts = await Post.find()
        const categories = await Category.find()
        return {posts, categories}
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        res.status(500).json({error: 500});
    };
}
