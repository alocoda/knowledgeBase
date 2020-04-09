
let db = require("../db/db");






async function loadProfile(email) {
    try {
        let data = await db.query(`SELECT COUNT(p.postid),userprofileid, firstname, lastname, imageurl, likes, 
        ROUND(likes)as likes, ROUND(messages) as messages, about
        FROM userprofile as u left join posts as p on u.userprofileid = p.authorid
        WHERE u.userprofileid = (SELECT userprofileid FROM userprofile WHERE email = $1)
        GROUP BY u.userprofileid`, [email])
        return data.rows;
    } catch (err) {
        console.log(err)
    }
}

async function getLatestPosts(UserID) {
    try {
        let data = await db.query(`Select p.c, p.postid, p.authorid, p.title, 
        p.explanation, p.topic, to_char (p.date, 'yyyy-MM-DD')as date,
        u.imageurl,u.userprofileid FROM (SELECT COUNT(replies.postid) as c, posts.topic as topic, 
        posts.postid as postid, posts.authorid as authorid, title, explanation, posts.date as date 
        FROM posts left join replies on posts.postid = replies.postid 
        GROUP BY posts.postid) as p inner join userProfile as u on p.authorid = u.userprofileid
        ORDER BY p.date DESC LIMIT 6`);
        return data.rows;
    } catch (err) {
        console.log(err)
    }
}




async function getLatestPostsNext(previousPostId) {
    try {
        let data = await db.query(`Select p.c, p.postid, p.authorid, p.title, 
        p.explanation, p.topic, to_char (p.date, 'yyyy-MM-DD')as date,u.imageurl,u.userprofileid
        FROM (SELECT COUNT(replies.postid) as c, posts.topic as topic, posts.postid as postid, 
        posts.authorid as authorid, title, explanation, posts.date as date 
        FROM posts left join replies on posts.postid = replies.postid GROUP BY posts.postid) 
        as p inner join userProfile as u on p.authorid = u.userprofileid
        WHERE p.date < (SELECT date FROM posts WHERE postid = $1) ORDER BY  p.date DESC LIMIT 5`, [previousPostId]);
        return data.rows;
    } catch (err) {
        console.log(err)
    }
}



async function getLatestPostsPrevious(previousPostId) {
    try {
        let data = await db.query(`Select p.c, p.postid, p.authorid, p.title, 
        p.explanation, p.topic, to_char (p.date, 'yyyy-MM-DD')as date,u.imageurl,u.userprofileid
        FROM (SELECT COUNT(replies.postid) as c, posts.topic as topic, posts.postid as postid, posts.authorid as authorid, title, explanation, 
        posts.date as date FROM posts left join replies on posts.postid = replies.postid GROUP BY posts.postid) as p inner join userProfile as u on p.authorid = u.userprofileid
        WHERE p.date >= (SELECT date FROM posts WHERE postid = $1) ORDER BY  p.date ASC LIMIT 6`, [previousPostId]);

        return data.rows;
    } catch (err) {
        console.log(err)
    }
}



async function insertPost(userEmail, title, explanation, topic) {
    try {

        let data = await db.query(`INSERT INTO posts 
        (authorid,title,explanation,topic,date)
        VALUES((SELECT userprofileid FROM userProfile WHERE email = $1),$2,$3,$4,NOW())`, [userEmail, title, explanation, topic])
    } catch (err) {
        console.log(err)
    }
}

async function getMostRecentPostId() {
    try {
        let data = await db.query(`SELECT postid FROM posts WHERE date = (Select MAX(date) FROM posts)`)
        return data.rows;
    } catch (err) {
        console.log(err)
    }
}



async function getBottomPostId() {
    try {
        let data = await db.query(`SELECT postid FROM posts WHERE date = (Select MIN(date)  FROM posts)`)
        return data.rows;
    } catch (err) {
        console.log(err)
    }
}


async function searchPosts(searchParam) {
    try {
        let data = await db.query(`SELECT u.userprofileid, p.postid, p.authorid, p.title, p.topic, p.explanation, 
        to_char (p.date, 'yyyy-MM-DD')as date, p.c, u.imageurl
        FROM (SELECT COUNT(replies.postid) as c, posts.topic as topic,posts.postid as postid, posts.authorid as authorid, title, explanation, 
        posts.date as date FROM posts left join replies on posts.postid = replies.postid GROUP BY posts.postid) as p
        inner join userprofile as u on u.userprofileid = p.authorid WHERE lower(p.title) LIKE lower($1) ORDER BY p.date DESC`,['%'+searchParam+'%'])

        return data.rows;
    } catch (err) {
        console.log(err)
    }
}




async function getFilteredPosts(searchParam) {
    try {
        let data = await db.query(`SELECT u.userprofileid, p.postid, p.authorid, p.title, p.topic, p.explanation, 
        to_char (p.date, 'yyyy-MM-DD')as date, p.c, u.imageurl
        FROM (SELECT COUNT(replies.postid) as c, posts.topic as topic,posts.postid as postid, posts.authorid as authorid, title, explanation, 
        posts.date as date FROM posts left join replies on posts.postid = replies.postid GROUP BY posts.postid) as p
        inner join userprofile as u on u.userprofileid = p.authorid WHERE lower(p.topic) = lower($1) ORDER BY p.date DESC`,[searchParam])
        return data.rows;
    } catch (err) {
        console.log(err)
    }
}



async function getProfile(id) {
    try {
        let data = await db.query(`SELECT COUNT(p.postid),userprofileid, email, firstname, lastname, imageurl, likes, 
        ROUND(likes)as likes, ROUND(messages) as messages, about
        FROM userprofile as u left join posts as p on u.userprofileid = p.authorid
        WHERE u.userprofileid = $1 GROUP BY u.userprofileid`, [id])
        return data.rows
    } catch (err) {
        console.log(err);
    }
}



async function getUserPosts(userid) {
    try {
        var data = await db.query(`Select u.userprofileid, p.postid, p.authorid, p.title, 
        p.explanation, p.topic, to_char (p.date, 'yyyy-MM-DD')as date,
        u.imageurl FROM (SELECT COUNT(replies.postid) as c, posts.topic as topic,posts.postid as postid, posts.authorid as authorid, title, explanation, 
        posts.date as date FROM posts left join replies on posts.postid = replies.postid GROUP BY posts.postid) as p inner join userProfile as u on p.authorid = u.userprofileid
        WHERE u.userprofileid = $1 ORDER BY p.date DESC`, [userid])
        return data.rows;
    } catch (err) {
        console.log(err.stack)
    }
}












module.exports = {
    getLatestPosts: getLatestPosts,
    getLatestPostsNext: getLatestPostsNext,
    getLatestPostsPrevious: getLatestPostsPrevious,
    insertPost: insertPost,
    getProfile: getProfile,
    getMostRecentPostId, getMostRecentPostId,
    getBottomPostId: getBottomPostId,
    searchPosts: searchPosts,
    getFilteredPosts:getFilteredPosts,
    getUserPosts, getUserPosts,
    getProfile: getProfile,
    loadProfile:loadProfile
    
}