let db = require("../models/Home");
const uProfile = require("../models/userProfile");



async function latestPosts(req, res) {
    var data = await db.getLatestPosts();
    var pdata = await db.loadProfile(req.session.userEmail);
    //checks to make sure we have posts
    if (req.session.SID === undefined) {
        res.redirect('/');
    }
    else if (data.length == 0) {
        res.render('home');
    }
    //renders posts with next button if their are more than 5 posts
    else if (data.length > 5) {
        data.pop();
        res.render('home', {
            'post': data,
            "prev": data[data.length - 1].postid,
            "next": data[data.length - 1].postid,
            "pdata": pdata[0],
            "prevhidden": "none",
            "nexthidden": "block"
        });
    }
    //renders data without next button if there are 5 or less posts
    else {
        res.render('home', {
            'post': data,
            "prev": data[data.length - 1].postid,
            "next": data[data.length - 1].postid,
            "pdata": pdata[0],
            "prevhidden": "none",
            "nexthidden": "none"
        });
    }
}


async function latestPostsNext(req, res) {
    var data = await db.getLatestPostsNext(req.query.next);
    var pdata = await db.loadProfile(req.session.userEmail);
    var bottomid = await db.getBottomPostId();

    if (data[data.length - 1].postid == bottomid[0].postid) {
        res.render('home', {
            'post': data,
            "next": data[data.length - 1].postid,
            "prev": req.query.next,
            "pdata": pdata[0],
            "nexthidden": "none"
        });
    }
    else {
        res.render('home', {
            'post': data,
            "next": data[data.length - 1].postid,
            "prev": req.query.next,
            "pdata": pdata[0],
            "nexthidden": "block"
        });
    }

}

async function latestPostsPrev(req, res) {

    var data = await db.getLatestPostsPrevious(req.query.prev);
    var pdata = await db.loadProfile(req.session.userEmail);
    var topid = await db.getMostRecentPostId();
    var previd = data[data.length - 1].postid

    if (previd == topid[0].postid) {
        res.redirect("/home")
    }
    else {
        data.pop();
        data = data.reverse()
        res.render('home', {
            'post': data,
            "next": data[data.length - 1].postid,
            "prev": previd,
            "pdata": pdata[0],
            "prevhidden": "block",
            "nexthidden": "block"
        });
    }

}

async function newPost(req, res) {
    await db.insertPost(req.session.userEmail, req.body.title, req.body.explanation, req.body.topic);

    res.redirect("/home");
}



async function search(req, res) {
    var data = await db.searchPosts(req.query.search);
    res.render("posts", { "post": data });
}



async function filterPosts(req, res) {
    var data = await db.getFilteredPosts(req.query.topic)
    res.render("posts", { "post": data })
}


function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

async function getProfile(req, res) {
    var profiledata = await db.getProfile(req.query.profileid);
    var postdata = await db.getUserPosts(profiledata[0].userprofileid);
    if (profiledata[0].email == req.session.userEmail) {
        res.render("homeProfile", { "post": postdata, "pdata": profiledata[0] })
    }
    else {
        res.send("other profile")
    }


}

editProfile = async (req, res) => {
    if(req.session.SID !== undefined) {
        var profiledata = await db.getProfile(req.session.SID);
        res.render("editProfile", { "pdata": profiledata[0] });
    } else {
        res.redirect('/');
    }
}

updateProfile = async (req, res) => {
    let userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
        image: req.body.image,
        details: req.body.details,
        country: req.body.country,
        birthdate: req.body.birthdate,
        id: req.session.SID
    }
    try {
        await uProfile.updateUser(userObj);
        //req.session.SID = userObj.id;
    } catch (err) {
        console.log(err);
    }
    res.redirect("/home");
}






module.exports = {
    latestPosts: latestPosts,
    latestPostsNext: latestPostsNext,
    latestPostsPrev: latestPostsPrev,
    newPost: newPost,
    search: search,
    filterPosts: filterPosts,
    logout: logout,
    getProfile: getProfile,
    editProfile: editProfile,
    updateProfile: updateProfile
}