const mod = require("../models/userData");

exports.login = (req, res, next) => {
    let email = req.body.email;
    let pwd = req.body.pwd;
    //TODO: authenticate user
}

exports.signup = (req, res, next) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let pwd = req.body.pwd;

}