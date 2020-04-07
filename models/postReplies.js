let db = require('../db/db');

function getPost(id) {
    return db.query("Select p.postid, p.title, p.explanation, p.topic, up.imageUrl from posts p join userprofile up on p.authorid = up.userprofileid where p.postid = " + id);
}

function getPostReplies(id) {
    return db.query("Select r.replyid, r.authorid, r.body, up.imageUrl from replies r join userprofile up on r.authorid = up.userprofileid where r.postid = " + id);
}

module.exports = {
    getPost : getPost,
    getPostReplies : getPostReplies
}