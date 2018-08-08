const {Post, Category} = require("../models")

module.exports = async (req, res) => {
    try{
        const deleted = await Post.findByIdAndRemove(req.params.id)
        const post = await Post.findOne({category: deleted.category})
        if (!post) await Category.remove({name: deleted.category})
        const categories = await Category.find()
        return res.status(200).json({deleted, categories});
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
