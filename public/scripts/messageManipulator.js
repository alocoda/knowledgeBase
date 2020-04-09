var currentPersonBeingMessaged = null;
let msgArray = [];
let sessionID = document.getElementById("sessionid").textContent;

//step 1: get all messages, messages are stored in JSON object, each item in msgArray is a JSON message object.
document.getElementById("sendbtn").disabled = true;

msgArray = getJSONArray(msgArray);

var check3 = getMessagesThatInvolveID(2,msgArray );

function createSubjectSideBar(){

}
subjectLoader();
function subjectLoader(){
    let hashmap = {};

    for(let i = 0; i < msgArray.length; i++){
        if(msgArray[i].subject != "" && msgArray[i].subject!= null){
            if(msgArray[i].receiverid == sessionID){
                hashmap[msgArray[i].senderid] ={
                    profilename:msgArray[i].sendername,
                    profileurl:msgArray[i].senderurl,
                    profilesubject:msgArray[i].subject,
                    profiledate:msgArray[i].timestamp,
                    profileid:msgArray[i].senderid
                };

            } else{
                hashmap[msgArray[i].receiverid] = {
                    profilename:msgArray[i].receivername,
                    profileurl:msgArray[i].receiverurl,
                    profilesubject:msgArray[i].subject,
                    profiledate:msgArray[i].timestamp,
                    profileid:msgArray[i].receiverid
                };

            }
        }
    }
    //To fetch all:
    for(var key in hashmap){
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        addSubjectDOM(hashmap[key].profilename,hashmap[key].profileurl, hashmap[key].profilesubject, monthNames[hashmap[key].profiledate.getMonth()] + " " + hashmap[key].profiledate.getDate() , hashmap[key].profileid);
    }
}
function addSubjectDOM(profilename, profileurl, profilesubject, profiledate, profileid){
    //create nameheading
    let pname = document.createElement("H5");
    let pnametext = document.createTextNode(profilename);
    pname.appendChild(pnametext);

    //create time
    let ptime = document.createElement("H5");
    let ptimetext = document.createTextNode(profiledate);
    ptime.appendChild(ptimetext);

    //appending nameheadingtime and time to a div
    let nameheadingtime = document.createElement("div");
    nameheadingtime.appendChild(pname);
    nameheadingtime.appendChild(ptime);

    //adding class to nameheadingtime 
    nameheadingtime.classList.add("nameheadingtime");

    //create subject
    let psubject = document.createElement("p");
    let psubjecttext = document.createTextNode(profilesubject);
    psubject.appendChild(psubjecttext);

    //appending subject and nameheadingtime to a div
    let rightPartOfSubject = document.createElement("div");
    rightPartOfSubject.appendChild(nameheadingtime);
    rightPartOfSubject.appendChild(psubject);
    //adding class to nameheadingtime 
    rightPartOfSubject.classList.add("rightPartOfSubject");


    let  ppicture = document.createElement("IMG");
    ppicture.setAttribute("src", profileurl);
    


    //creating single profile div
    let profileDiv = document.createElement("div");
    profileDiv.classList.add("subjectdiv");
    profileDiv.appendChild(ppicture);
    profileDiv.appendChild(rightPartOfSubject);

    document.getElementById("SubjectProfileSide").prepend(profileDiv);

    profileDiv.addEventListener("click", function(){
        loadMessages(profileid);
        currentPersonBeingMessaged = profileid;
        document.getElementById("sendbtn").disabled =  false;
    });
    
}
function loadMessages(userid){
    document.getElementById("previousMessages").innerHTML='';

    messagesArray =getMessagesThatInvolveID(userid,msgArray );
    let date = messagesArray[0].timestamp;
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    addTime( monthArray[date.getMonth()  ]+ " "+ date.getDate());


    for(let i = 0; i < messagesArray.length; i++){
        let curProfile= messagesArray[i];
        if(date.getYear() !=curProfile.timestamp.getYear() || date.getMonth() != curProfile.timestamp.getMonth() || date.getDate() != curProfile.timestamp.getDate()){
            date=curProfile.timestamp;
            let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            addTime( monthArray[date.getMonth()  ]+ " "+ date.getDate());
        }
        let timeinstring = "";
        let hour = curProfile.timestamp.getUTCHours();
        if(hour > 12){
            if(hour ==12){
                timeinstring = hour + ":" + curProfile.timestamp.getUTCMinutes() + "pm";
            } else{
                timeinstring = hour-12 + ":" +  curProfile.timestamp.getUTCMinutes() + "pm"

            }
        } else{
            timeinstring = hour + ":" +  curProfile.timestamp.getUTCMinutes() + "am"
        }
        addSingleMessage(curProfile.sendername, curProfile.senderurl, curProfile.message, timeinstring, curProfile.senderid);
    }
}
function addTime(time){
    //create head
    let diver = document.createElement("div");
    let h2span = document.createElement("span");
    let h2spantext = document.createTextNode(time);
    h2span.classList.add("linebehindword");

    h2span.appendChild(h2spantext);
    diver.appendChild(h2span);
    diver.classList.add("timediv");
    document.getElementById("previousMessages").append(diver);
}

//addSingleMessage("bow","https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg","chicka wow oww", "setp2",3);
function addSingleMessage(profilename, profileurl, profiletext, profiledate, profileid, ){
    //create nameheading
    let pname = document.createElement("H5");
    let pnametext = document.createTextNode(profilename);
    pname.appendChild(pnametext);

    //create time
    let ptime = document.createElement("H6");
    let ptimetext = document.createTextNode(profiledate);
    ptime.appendChild(ptimetext);

    //appending nameheadingtime and time to a div
    let nameheadingtime = document.createElement("div");
    nameheadingtime.appendChild(pname);
    nameheadingtime.appendChild(ptime);

    //adding class to nameheadingtime 
    nameheadingtime.classList.add("nameheadingtimetext");
    let nameheadingtimecontainer = document.createElement("div");
    nameheadingtimecontainer.classList.add("nameheadingtimetextcontainer");
    nameheadingtimecontainer.appendChild(nameheadingtime);
    //create text
    let ptext = document.createElement("p");
    let pttext = document.createTextNode(profiletext);
    ptext.appendChild(pttext);

    //appending subject and nameheadingtime to a div
    let rightPartOfSubject = document.createElement("div");
    rightPartOfSubject.appendChild(nameheadingtime);
    rightPartOfSubject.appendChild(ptext);
    //adding class to nameheadingtime 
    rightPartOfSubject.classList.add("rightPartOfSubjecttext2");


    let  ppicture = document.createElement("IMG");
    ppicture.setAttribute("src", profileurl);
    


    //creating single message div
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("messagediv");
    messageDiv.appendChild(ppicture);
    messageDiv.appendChild(rightPartOfSubject);

    document.getElementById("previousMessages").append(messageDiv);


}

/**
 * 
 * @param {} array
 * returns KEY [SenderID], Value: [ARRAY OF ALL MESSAGES involving the SENDERID (sender ID can be in receiverid too)] 
 */
function getMessagesThatInvolveID(id, array){
    var newIDArray = []
    for(let i = 0; i < array.length; i++){
        
        if(array[i].senderid ==id || array[i].receiverid == id){
            newIDArray.push(array[i]);
            array[i];
        }
    }
    return newIDArray;
}
function getJSONArray(arrayIncoming){
    var array = arrayIncoming;
    let pchildren = document.getElementById("convoList").childNodes;
    
    for (let i = 0; i < pchildren.length; i++) {
        array[i] = JSON.parse("{" + pchildren[i].textContent + "}");
        array[i].timestamp = convertTStoDate(array[i].timestamp);
    }
    return array;
    
}

function convertTStoDate(dateString){
  //  timestamp: "Sun Apr 05 2020 16:18:16 GMT-0700 (Pacific Daylight Time)"
    dateArray = dateString.split(" ");
    timeArray = dateArray[4].split(":");
    let month = 0;

   //month to number function
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for(let i = 0; i < monthArray.length; i++){

        if(dateArray[1] == monthArray[i]){
            month = i ;
            break;
        }
    }
    //new Date(year, month, day, hours, minutes, seconds)
    return new Date(parseInt(dateArray[3]), month, parseInt(dateArray[2]), parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));
}





//triggered when person hits send button to SEND!
function send()  {
    let text = document.getElementById("ta").value;
    
    if(currentPersonBeingMessaged != null && text != null && text.trim().length > 0 ){
        let form = document.createElement("form");

        
        let senderid = document.createElement("input"); 
        senderid.name = "senderid";
        senderid.value = sessionID;


        let receiverid = document.createElement("input"); 
        receiverid.name = "receiverid";
        receiverid.value = currentPersonBeingMessaged;

        let message = document.createElement("input"); 
        message.name="details";
        message.value=text;

        form.method = "POST";
        form.action= "sendMessageToUser";
        
        
        form.appendChild(receiverid);  
        form.appendChild(senderid);  
        form.appendChild(message);  
        form.classList.add("hide")
        document.body.appendChild(form);


        form.submit();
    }
}  

