const {Post, Category} = require("../models")

module.exports = async (req, res) => {
    try{
        const result = await Post.findByIdAndRemove(req.params.id)
        const post = await Post.findOne({category: result.category})
        if (!post) await Category.remove({name: result.category})
        return res.status(200).json(result);
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
