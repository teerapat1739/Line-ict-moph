require('dotenv').config();

const express = require('express');
// const line = require('@line/bot-sdk');
const app = express();
const config = require('./config.js')
// const client = new line.Client(config);
const webhook = require('./webhook')

app.use(express.static('images'))
app.post('/webhook', config.line.middleware(config.init), (req, res) => {
    Promise
        .all(req.body.events.map(webhook.handleEvent))
        .then((result) => res.json(result))
        .catch((error) => console.log(error))
});

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});