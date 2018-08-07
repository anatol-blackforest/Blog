const {Post} = require("../models")
const {postsPerPage} = require("../config")
let activePage = 0

module.exports = async (req, res) => {
    try{
        let {activePage} = req.params
        activePage = parseInt(activePage)
        activePage += postsPerPage
        const posts = await Post.find().sort({createdAt: -1}).skip(activePage).limit(postsPerPage)
        return res.status(200).json({posts, activePage})
    }catch(err) {
        console.error('Unable to connect to the database:', err);
        return res.status(500).json({error: 500});
    };
}
