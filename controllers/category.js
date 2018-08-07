const {Post, Category} = require("../models")

module.exports = async (req, res) => {
    try{
        pete = await Category.findOne(req.params).populate('posts');
        return res.status(200).json(pete)
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
