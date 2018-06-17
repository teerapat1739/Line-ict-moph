const {init, client }  = require('./config')
const axios = require('axios')
const fs = require('fs')


const changeToRichMenuId = (userId, richMenuId) => {
    return axios({
                    method: 'POST',
                    url: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
                    headers: {
                        Authorization: `Bearer ${init.channelAccessToken}`
                    },
                    json: true
                }).then(function (response) {
                    console.log('response >>> '+ response );
                }).catch(function (error) {
                    console.log(erro);
                });

}

const createRichMenu = () =>{
    client.createRichMenu({
        size: { width: 2500, height: 1686 }, // Define size of rich menu
        selected: true, // Always display
        name: 'Remdider', // rich menu name
        chatBarText: 'Qrcode', // show to user
        areas: [
          {
            "bounds": {
              "x": 42,
              "y": 51,
              "width": 2416,
              "height": 1609
            },
            "action": {
              "type": "message",
              "text": "qrcode"
            }
          }
        ]
      }).then(richMenuId => {
          fs.readFile("./.env", 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            const result = data.replace(/RICH_MENU_ID=.*/g, `RICH_MENU_ID=${richMenuId}`);
            
            fs.writeFile("./.env", result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
         });
            console.log(richMenuId);
            client.setRichMenuImage(richMenuId, fs.createReadStream('./menu.jpg')).then(res => console.log("success>>" +  res)).catch(err => console.log(err))    
      })
}
module.exports = {
    createRichMenu,
    changeToRichMenuId,
}


