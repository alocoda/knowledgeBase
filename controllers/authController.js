const mod = require("../models/userData");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res) => {
    let email = req.body.email;
    let pwd = req.body.pwd;
    let hash = await mod.login(email);
    let authenticated = await bcrypt.compare(pwd, hash);
    if (authenticated) {
        req.session.userEmail = email;
        res.redirect("/home")
    } else {
        res.render("index", { loginfailed: true });
    }
}

exports.signup = async (req, res) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPwd = await bcrypt.hash(req.body.pwd, salt);
    let userObj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pwd: hashedPwd
    }
    req.session.userEmail = req.body.email
    req.session.user = userObj;
    let inUse = await mod.email(req.body.email);
    if (inUse) {
        res.render("index", { signupfailed: true })
    } else {
        res.render("signup");
    }
}

exports.signupdetails = async (req, res) => {
    let userObj = req.session.user;
    userObj.image = req.body.image;
    userObj.details = req.body.details;
    userObj.country = req.body.country;
    userObj.birthdate = req.body.birthdate;
    try {
        await mod.signup(userObj);
    } catch (err) {
        console.log(err);
    }
    res.redirect("/home");
}