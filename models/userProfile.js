let db = require('../db/db');

function getProfile (id) {
    return db.query("Select userprofileid, firstname, lastname, email, imageurl, about, country, dob, ROUND(likes) from userprofile where userprofileid = " + id);
}

function getUserPost(id) {
    return db.query("Select p.postid, p.title, p.explanation, p.topic, to_char(p.date,'DD-MM-YYYY'), up.imageurl, COUNT(r.replyid)  from posts p join userprofile up on p.authorid = up.userprofileid left Join public.replies r on p.postid = r.postid where p.authorid = $1 group by p.postid, up.imageurl order by p.date desc", [id]);
}

function getNumPost(id) {
    return db.query("Select count(*) from posts where authorid = " + id);
}

function addLike(id) {
    db.query("Update userprofile Set likes = likes + 1 Where userprofileid = " + id);
}

updateUser = async (user) => {
    const query = `UPDATE UserProfile SET
        firstname = $1, lastname = $2, password = $3, imageurl = $4, about = $5, country = $6, dob = $7
        WHERE userprofileid = $8`;
    const values = [
        user.fname,
        user.lname,
        user.pwd,
        user.image,
        user.details,
        user.country,
        user.birthdate,
        user.id
    ];
    try {
        await db.query(query, values);
    } catch (err) {
        console.log(err.stack);
    }
};

module.exports = {
    getProfile : getProfile,
    getUserPost : getUserPost,
    getNumPost : getNumPost,
    addLike : addLike,
    updateUser: updateUser
}