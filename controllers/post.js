const {Post, Category} = require("../models")

module.exports = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        return res.status(200).json({...post, isAdmin: req.isAuthenticated()}) 
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
