let mod = require('../models/postReplies');

exports.getPost  = async (req, res, next) => {
    let postid = req.params.postid;
    console.log(postid);
    let postDetail = await mod.getPost(postid);
    let postReplies = await mod.getPostReplies(postid);
    res.render('postreply', {postDetail: postDetail.rows[0], postReplies: postReplies.rows});
}