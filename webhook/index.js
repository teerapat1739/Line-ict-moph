
const { client, init } = require('../config')
const richApi = require('../rich-menu-api')
const qrcode = require('../lib/genQrcode')
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


function handleMessageEvent(event) {
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
    } else if (eventText === 'template button') {
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
    } else if (eventText === 'food') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://github.com/teerapat1739/FoodSys/blob/master/assets/images/Cock.jpg?raw=true",
                        "title": "จระเข้แดดเดียว",
                        "text": "120 บาท",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
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
                        "thumbnailImageUrl": "https://github.com/jirawat050/exSF312/blob/master/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B9%E0%B8%81%E0%B8%AD%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B8%88%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%82%E0%B9%89.jpg?raw=true",
                        "title": "กระดูกอ่อนจระเข้",
                        "text": "100 บาท",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
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
                        "thumbnailImageUrl": "https://github.com/jirawat050/exSF312/blob/master/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3/beef_green_curry_pea_eggplants.jpg?raw=true",
                        "title": "แกงกะหรี่",
                        "text": "100 บาท",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
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
                        "thumbnailImageUrl": "https://github.com/jirawat050/exSF312/blob/master/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3/%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B9_Stir-fried%20pork%20with%20holy%20basil%20leaves.jpg?raw=true",
                        "title": "กระเพราหมู",
                        "text": "50 บาท",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
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
                    }
                ]
            }
        }
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = {
    handleEvent
  }