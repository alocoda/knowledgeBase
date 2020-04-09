let db = require('../db/db');

function getPost(id) {
    return db.query("Select p.postid, p.authorid, p.title, p.explanation, p.topic, up.imageUrl from posts p join userprofile up on p.authorid = up.userprofileid where p.postid = " + id);
}

function getPostReplies(id) {
    return db.query("Select r.replyid, r.authorid, r.body, up.imageUrl from replies r join userprofile up on r.authorid = up.userprofileid where r.postid = $1 order by r.date asc", [id]);
}

function getAuthorid(email) {
    return db.query("Select userprofileid from userprofile where email = $1", [email]);
}

function insertReply(postid, authorid, replyBody) {
    db.query("Insert into replies (postid, authorid, date, body) values ($1, $2, NOW(), $3)", [postid, authorid, replyBody]);
}


module.exports = {
    getPost : getPost,
    getPostReplies : getPostReplies,
    getAuthorid : getAuthorid,
    insertReply : insertReply
}