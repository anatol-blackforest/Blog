const {Post, Category} = require("../models")

module.exports = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post) 
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        res.status(500).json({error: 500});
    };
}
