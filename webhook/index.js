
const { client, init } = require('../config')
const richApi = require('../rich-menu-api')
const qrcode = require('../lib/genQrcode')
const axios = require('axios');
// const database = require('../firebase')
// richApi.createRichMenu()
const firebase = require('firebase')
 // Initialize Firebase
const config = {
apiKey: "AIzaSyALsgpDOM0qm8UeLBwHbXNCuSzPuZ_tl9A",
authDomain: "reminderapp-51318.firebaseapp.com",
databaseURL: "https://reminderapp-51318.firebaseio.com",
projectId: "reminderapp-51318",
storageBucket: "reminderapp-51318.appspot.com",
messagingSenderId: "570569057226"
};
firebase.initializeApp(config);

const database = firebase.database()

//////////////////////Simsimi////////////////////////////
const Simsimi = require('simsimi');

var simsimi = new Simsimi({
  key: 'a46baa43-18db-4012-a157-bfb7fd33f887'
});
//////////////////////Simsimi////////////////////////////

if(!init.richMenuId) {
    richApi.createRichMenu()
}else{
    console.log("Rich-menu has been created");
}

var remindData

database.ref('remind').on('value', (snapshot) => {
    const reminds = [];
    snapshot.forEach((childSnapshot) => {
        reminds.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });
    console.log(reminds)
    remindData = getRemindData(reminds)
})


const handleEvent = async (event) => {
    qrcode.genQrcode(event.source.userId)
    console.log("gen qrcode for:  "+ event.source.userId + "  success");
    console.log("User ID is : " + event.source.userId);
    //put rich menu to individual user
    richApi.changeToRichMenuId(event.source.userId, init.richMenuId)
    console.log("event"+init.richMenuId + " user>>" + event.source.userId);
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log(event);
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------");

    // interval Data
    // const remindData = await getRemindData()

    // const remindData = await getRemindData()

    // console.log(reminds);
    //////////////////////////////////////
    let i = 0
    const intervalData = setInterval(async () => {
        const { id ,time, drug, userId } = await remindData[i]
        let message
        let thumbnailImageUrl
        // if (time === '01:53' && userId === event.source.userId) {
        if (userId && userId === event.source.userId) {
            console.log(id+ ' >> '+ drug.charAt(0).toUpperCase()+drug.slice(1))
            if (drug === 'benzac') {
                thumbnailImageUrl = 'benzac'
            } else if (drug === 'valtrex') {
                thumbnailImageUrl = 'Valtrex'
            } else {
                thumbnailImageUrl = 'CalamineLotion'
            }
            message = {
                "type": "template",
                "altText": "this is a carousel template",
                "template": {
                    "type": "carousel",
                    "columns": [
                        {
                            "thumbnailImageUrl": `https://teerapat-reminder.herokuapp.com/drug/${thumbnailImageUrl}.jpg`,
                            "title": drug.charAt(0).toUpperCase()+drug.slice(1),
                            "text": "ทาหลังอาบน้า",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "เช้า-เย็น",
                                    "data": "action=buy&itemid=111"
                                },
                            ]
                        },
                    ]
                }
            }
            const comfirmMsg = {
                "type": "template",
                "altText": "this is a confirm template",
                "template": {
                    "type": "confirm",
                    "text": "กินยาหรือยัง?",
                    "actions": [
                        {
                          "type": "message",
                          "label": "Yes",
                          "text": "yes"
                        },
                        {
                          "type": "message",
                          "label": "No",
                          "text": "no"
                        }
                    ]
                }
              }
            client.pushMessage(event.source.userId, message)
            .then((res) => {
                console.log(res);
                if (id) {
                    database.ref(`remind/${id}`)
                    .remove()
                    .then(() => {
                        console.log('Data was removed')
                    }).catch((e) => {
                        console.log('Did not remove data', e)
                    })
                    client.pushMessage(event.source.userId, comfirmMsg)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        i++
        console.log(i);
        console.log(remindData.length)
        if (i >= remindData.length) {
            clearIntervalData(intervalData)
            console.log( i + ' < > '+ remindData.length + ' clearIntervalData ' + i > remindData.length);
        }
    },1000)
    /////////////////////////////////////


    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event)
        // remindMessage(event)
    } else {
        return Promise.resolve(null);
    }
}


function clearIntervalData (intervalData) {
    clearInterval(intervalData)
}
function getRemindData(data) {
        return data
}
async function handleMessageEvent(event) {
    var msg
    var eventText = event.message.text.toLowerCase()

    simsimi.listen('tell about Thailand', function(err, masg) {
        if(err) return console.error(err);
        msg = {
            type : 'text',
            text: masg
        }
        client.pushMessage(event.source.userId, msg)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log('Hackathon bot say:', masg);
      });

    if (eventText === 'qrcode') {
        console.log(`https://1ad0a7a5.ngrok.io/${event.source.userId}`);
        
        msg = {
            'type': 'image',
            'originalContentUrl': `https://teerapat-reminder.herokuapp.com/${event.source.userId}.png`,
            'previewImageUrl': `https://teerapat-reminder.herokuapp.com/${event.source.userId}.png`
        }
    }
    else if(eventText.includes('http')){
        console.log("yes");

        await axios({
             method: 'post',
             url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/16cbf68f-90b1-4c75-a5b4-de0ac749c8fa/url',
             headers: {
                 "Prediction-key": "6731b30f969b4e51b30cd07e899d2cdb",
                 'content-type': 'application/json'
             },
             data: {
                 "Url": event.message.text
             }
           }).then(res => {
               console.log(res.data);
               var body = res.data
               var max = body.predictions[0];
               for (let index = 0; index < body.predictions.length; index++) {
                 if( max.probability < body.predictions[index].probability) {
                     max = body.predictions[index];
                 }
                 console.log(max.tagName  == "acne");
                 }
                 if(max.tagName == "acne") {
                     msg = {
                         type: 'text',
                         text: 'ฉันคิดว่าคุณเป็นสิวนะ'
                     };
                 }else if(max.tagName == "chickenpox") {
                     msg = {
                         type: 'text',
                         text: 'คุณน่าจะเป็น อีสุกอีใส แล้วแหละ รีบไปหาหมอนะ'
                     };
                 }else if(max.tagName == "shingles") {
                     msg = {
                         type: 'text',
                         text: 'งูสวัด แล้วแหละ รีบไปหาหมอเลย'
                     };
                 }
           })
           .catch(err => console.log(err))
     }
  else if (eventText === 'drug') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://teerapat-reminder.herokuapp.com/drug/benzac.jpg",
                        "title": "Benzac",
                        "text": "ทาหลังอาบน้า  10 - 15 นาที แล้วล้างออก",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "เช้า-เย็น",
                                "data": "action=buy&itemid=111"
                            },
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://teerapat-reminder.herokuapp.com/drug/Valtrex.jpg",
                        "title": "Valtrex",
                        "text": "ทาหลังอาบน้า  บริเวณที่เป็นเริม",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "เช้า-เย็น",
                                "data": "action=buy&itemid=111"
                            },
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://teerapat-reminder.herokuapp.com/drug/CalamineLotion.jpg",
                        "title": "CalamineLotion",
                        "text": "ทาหลังอาบน้า  บริเวณที่คัน",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "เช้า-เย็น",
                                "data": "action=buy&itemid=111"
                            },
                        ]
                    },
                ]
            }
        }
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = {
    handleEvent
  }