let db = require("../db/db");

emailInUse = async (email) => {
    const query = `SELECT * FROM UserProfile WHERE email = $1`;
    const values = [ email ];
    try {
        const res = await db.query(query, values);
        return (res.rows.length > 0) ? true : false;
    } catch (err) {
        console.log(err.stack);
    }
    return true;
}

userLogin = async (email) => {
    const query = `SELECT password FROM UserProfile WHERE email = $1`;
    const values = [ email ];
    try {
        const res = await db.query(query, values);
        return res.rows.length > 0 ? res.rows[0].password : '';
    } catch (err) {
        console.log(err.stack);
    }
    return '';
};

userSignUp = async (user) => {
    const query = `INSERT INTO UserProfile 
        (firstname, lastname, email, password, imageurl, about, country, dob)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [
        user.fname,
        user.lname,
        user.email,
        user.pwd,
        user.image,
        user.details,
        user.country,
        user.birthdate
    ];
    try {
        await db.query(query, values);
    } catch (err) {
        console.log(err.stack);
    }
};

module.exports = {
    signup: userSignUp,
    login: userLogin,
    email: emailInUse
};