let mod = require('../models/postReplies');

exports.getPost = async (req, res, next) => {
    let postid = req.params.postid;
    let postDetail = await mod.getPost(postid);
    let postReplies = await mod.getPostReplies(postid);
    res.render('postreply', {postDetail: postDetail.rows[0], postReplies: postReplies.rows});
}

exports.postReply = async (req, res, next) => {
    let postid = req.params.postid;
    let sessionEmail = req.session.userEmail;
    let replyDetail = req.body.replyDetail;
    let authorid = await mod.getAuthorid(sessionEmail);
    await mod.insertReply(postid, authorid.rows[0].userprofileid, replyDetail);
    res.redirect("/post/" + postid);
}