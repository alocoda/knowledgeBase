let mod = require('../models/userProfile');

exports.getProfile = async (req, res, next) => {
    let id = req.params.id;
    let sessionEmail = req.session.userEmail;
    let profile = await mod.getProfile(id);
    if (profilenumPost.rows[0].email != sessionEmail) {
        let posts = await mod.getUserPost(id);
        let numPost = await mod.getNumPost(id);
        res.render('profile' , {profileInfo: profile.rows[0], numPost: numPost.rows[0], posts: posts.rows});
    } else {
        res.redirect("/home");
    }
   
}

exports.addLike = async (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    //let sessionEmail = req.session.userEmail;
    await mod.addLike(id);
    res.redirect("/profile/" + id);
}