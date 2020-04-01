const db = require("../db/db");


userLogin = user => {
    return db.query(
        // login user
    );
};

userSignUp = async (user) => {
    const query = `INSERT INTO UserProfile 
        (firstname, lastname, email, password, imageurl, about, country, dob)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
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
        const res = await db.query(query, values);
        console.log(res.rows[0]);
    } catch (err) {
        console.log(err.stack);
    }
};

module.exports = {
    signup: userSignUp,
    login: userLogin
};