const messageModel = require("../models/messageData");


//LOADS THE PAGE.
exports.sendMessage = async (req, res, next) => {
    req.session.userId = 8;

    let messageReceiverid =  req.query.id;
    console.log("???????????????" + messageReceiverid);
    //TODO make it so ID is from the req body or something idk lol
    
    let  userBeingMessaged = await messageModel.getUserProfile(messageReceiverid);
    console.log("req.session.userID" + req.session.userId);
    res.render('sendMessage', {
        header: true,
        imageurl: userBeingMessaged[0].imageurl,
        receiverid: userBeingMessaged[0].userprofileid,
        sender_id: req.session.userId
    });

   console.log("sendMessage : userBeingMessaged" + userBeingMessaged[0].imageurl);
  // console.log("sendMessage : userBeingMessaged" + userBeingMessaged[0].id);

}


exports.messages = async(req,res,next) =>{
    req.session.userId = 7;
    let allMessages = await messageModel.getAllMessages(req.session.userId);
    
    //db.query("CREATE TABLE messages (messageid SERIAL PRIMARY KEY, senderid integer NOT NULL, receiverid integer NOT NULL, subject text, body text NOT NULL, ts TIMESTAMP not null)");

  
    console.log("Allmessages length!!!" + allMessages.length );
    res.render('message',{
        header:true,
        'conversation':allMessages

    });
}


exports.sendFirstMessageToUser = async(req, res, next)=>{
    req.session.userId = 7;
    let subjectString = req.body.subject;
    let receiverid = req.body.receiverid;
    let detailsString = req.body.details;
    const messageObject = {
        subject:subjectString,
        receiver:receiverid,
        details:detailsString,
        sender:req.session.userId,

    }
    let userBeingMessaged = await messageModel.createConversation(messageObject);
    /**
    //console.log("message information://SEND FIRST MESSAGE TO USER: message id" + userBeingMessaged[0].messageid );
    console.log("sender id"+ userBeingMessaged[0].senderid );
    console.log("receiver id"+ userBeingMessaged[0].receiverid );
    console.log("subject id"+ userBeingMessaged[0].subject );
    console.log("body id"+ userBeingMessaged[0].body );
    console.log("ts id"+ userBeingMessaged[0].ts );

    console.log("message information://SEND FIRST MESSAGE TO USER: message id" + userBeingMessaged[0].senderid );
 */
//db.query("CREATE TABLE messages (messageid SERIAL PRIMARY KEY, senderid integer NOT NULL, receiverid integer NOT NULL,
// subject text NOT NULL, body text NOT NULL, ts TIMESTAMP not null)");

    /**todo need to add email.

    const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Design Your Model S | Tesla', // Subject line
        text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
    */


   //todo redirect to user profile that received the message.
 // res.redirect( 301, 'userprofile/' + receiverid);
   res.redirect(301, "/" ) 
}




