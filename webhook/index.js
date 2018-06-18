
const { client, init } = require('../config')
const richApi = require('../rich-menu-api')
const qrcode = require('../lib/genQrcode')
const axios = require('axios');
// richApi.createRichMenu()
if(!init.richMenuId) {
    richApi.createRichMenu()
}else{
    console.log("Rich-menu has been created");
}


const handleEvent = (event) => {
    qrcode.genQrcode(event.source.userId)
    console.log("gen qrcode for:  "+ event.source.userId + "  success");
    console.log("User ID is : " + event.source.userId);
    //put rich menu to individual user
    richApi.changeToRichMenuId(event.source.userId, init.richMenuId)
    console.log("event"+init.richMenuId + " user>>" + event.source.userId);
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log(event);
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------");

    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}


async function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    var eventText = event.message.text.toLowerCase();

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
    else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        }
    } else if (eventText === 'template confirm') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [{
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                }, {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }]
            }
        }
    } else if (eventText === 'drug') {
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
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "https://front-sf312.azurewebsites.net"
                            }
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
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "https://front-sf312.azurewebsites.net"
                            }
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
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "https://front-sf312.azurewebsites.net"
                            }
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