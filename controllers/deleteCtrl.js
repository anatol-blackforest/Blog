const {Post} = require("../models")

module.exports = async (req, res) => {
    try{
        const result = await Post.findByIdAndRemove(req.params.id)
        return res.status(200).json(result);
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
