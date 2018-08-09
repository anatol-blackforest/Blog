const {Post, Category} = require("../models")
module.exports = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        return res.status(200).json(post);
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
