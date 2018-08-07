const {Post, Category} = require("../models")

module.exports = async (req, res) => {
    try{
        let posts = await Category.findOne(req.params).populate('postes');
        return res.status(200).json(posts)
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
