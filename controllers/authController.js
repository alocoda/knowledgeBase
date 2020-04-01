const mod = require("../models/userData");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = (req, res, next) => {
    let email = req.body.email;
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPwd = await bcrypt.hash(req.body.pwd, salt);
    //TODO: authenticate user
}

exports.signup = async (req, res, next) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPwd = await bcrypt.hash(req.body.pwd, salt);
    let userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pwd: hashedPwd
    }
    req.session.user = userObj;
    res.render("signup");
}

exports.signupdetails = async (req, res, next) => {
    let userObj = req.session.user;
    userObj.image = req.body.image;
    userObj.details = req.body.details;
    userObj.country = req.body.country;
    userObj.birthdate = req.body.birthdate;
    await mod.signup(userObj);
    res.redirect("/home");
}