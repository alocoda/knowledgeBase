const db = require("../db/db");

getUserProfile = async (id) => {
    const query = `SELECT * FROM UserProfile WHERE userprofileid = $1`;
    const values = [ id ];
    try {
        const res = await db.query(query, values);
       return  res.rows;
    } catch (err) {
        console.log(err.stack);
    }
    return '';

}

getAllMessages = async(id) =>{
    
    const query = `SELECT * FROM messages WHERE senderid = $1 OR receiverid = $2 ORDER BY ts `;
    
    const values = [
        id, id
    ]
    try {

        const res = await db.query(query, values);
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
        (senderid, senderURL, sendername, receiverid, receiverURL, receivername, subject, body, ts)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, to_timestamp(${Date.now()} / 1000.0)) RETURNING *`;
    const values = [
        convoObj.sender,
        sender[0].imageurl,
        sender[0].firstname + " " + sender[0].lastname, 
        convoObj.receiver,
        receiver[0].imageurl,
        receiver[0].firstname + " " + receiver[0].lastname, 
        convoObj.subject,
        convoObj.details
        
    ];
    try {

        const res = await db.query(query, values);
        
        return res.rows;
    } catch (err) {
        console.log(err.stack);
        return null;
    }
};

createMessage = async(convoObj)=>{
    let sender = await getUserProfile( convoObj.sender);
    let receiver = await getUserProfile(convoObj.receiver);
    const query = `INSERT INTO Messages 
        (senderid, senderurl, sendername, receiverid, receiverurl, receivername, body, ts)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7,  to_timestamp(${Date.now()} / 1000.0)) RETURNING *`;
    const values = [
        convoObj.sender,
        sender[0].imageurl,
        sender[0].firstname + " " + sender[0].lastname, 
        convoObj.receiver,
        receiver[0].imageurl,
        receiver[0].firstname + " " + receiver[0].lastname, 
        convoObj.details
    ];
    try {
        const res = await db.query(query, values);
        return res.rows;
    } catch (err) {
        console.log(err.stack);
        return null;
    }
};

increaseMsgCount = (r, s) => {
    db.query("Update userprofile Set messages = messages + 1 Where userprofileid = " + r +
     " OR userprofileid = " + s);
}

module.exports = {
    getUserProfile: getUserProfile,
    createConversation:createConversation,
    getAllMessages:getAllMessages,
    createMessage:createMessage,
    increaseMsgCount:increaseMsgCount
};
