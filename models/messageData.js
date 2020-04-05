const db = require("../db/db");


//db.query("CREATE TABLE messages (messageid SERIAL PRIMARY KEY, senderid integer NOT NULL, sendername text, receivername text, receiverid integer NOT NULL, subject text, body text NOT NULL, ts TIMESTAMP not null)");
//db.query("DROP TABLE messages");
//console.log("added!");

getUserProfile = async (id) => {
    console.log("This is id" + id);
    const query = `SELECT * FROM UserProfile WHERE userprofileid = $1`;
    const values = [ id ];
    try {
        const res = await db.query(query, values);
       // return res.rows.length > 0 ? res.rows[0].password : '';
       console.log("nani"+res.rows[0]);
       return  res.rows;
    } catch (err) {
        console.log(err.stack);
    }
    return '';

}

getAllMessages = async(id) =>{
    
    const query = `SELECT * FROM messages WHERE senderid = $1 OR receiverid = $2 ORDER BY ts `;
    //const query = 'SELECT * FROM messages'
    
    const values = [
        id, id
    ]
    try {
        console.log("before getting all messages is a success!");

        const res = await db.query(query, values);
        //const res = await db.query(query);

        console.log(" all messages sent succses!");
        console.log("messages");
        console.log("nani222222sleepy"+res.rows.length);

        return res.rows;
    } catch (err) {
        console.log(err.stack);
        return null;
    }
};



createConversation = async(convoObj)=>{
    let sender = await getUserProfile( convoObj.sender);
    let receiver = await getUserProfile(convoObj.receiver);
    const query = `INSERT INTO Messages 
        (senderid, sendername, receiverid, receivername, subject, body, ts)
        VALUES
        ($1, $2, $3, $4, $5, $6, to_timestamp(${Date.now()} / 1000.0)) RETURNING *`;
    const values = [
        convoObj.sender,
        sender[0].firstname + " " + sender[0].lastname, 
        convoObj.receiver,
        receiver[0].firstname + " " + receiver[0].lastname, 
        convoObj.subject,
        convoObj.details
        
    ];
    try {
        console.log("before message sent succses!");

        const res = await db.query(query, values);
        console.log("message sent succses!");
        console.log("nani2"+res.rows[0].subject);
        console.log("nani2"+res.rows[0].messageid);

        return res.rows;
        console.log(res.rows);
    } catch (err) {
        console.log(err.stack);
        return null;
    }
};






/** 


getUserProfile = async (id) => {
    const query ="SELECT * FROM UserProfile WHERE userprofileid = $1" + id;
    const values = [ id ];
    try {
        const res = await db.query(query, values);
        console.log(res.rows[0].name);
        return res;
    } catch (err) {
        console.log(err.stack);
    }
    return '';
};


 getUserProfile = async (id) =>{
   let asdf =  await db.query('Select * from userProfile where userprofileid = ' + id)
   console.log("beep" + asdf.rows[0]); 
   return db.query('Select * from userProfile where userprofileid = ' + id);
}
*/

module.exports = {
    getUserProfile: getUserProfile,
    createConversation:createConversation,
    getAllMessages:getAllMessages
};