const {Post, Category} = require("../models")
module.exports = async (req, res) => {
    try{
        const result = await Post.create(req.body)
        const category = await Category.find({name: req.body.category})
        if (!category) await Category.create({name: req.body.category})
        res.status(200).json(result);
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        res.status(500).json({error: 500});
    };
}
