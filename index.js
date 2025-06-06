'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


// // sms 
// const accountSid = 'ACb7659ed584463f0a81efa95427c30fab';
// const authToken = 'a0f6864fe4923515361affcdd5280258';
// const client = require('twilio')(accountSid, authToken);
// client.messages
//     .create({
//         body: 'https://www.hermes.com/fr/fr/product/sac-hermes-in-the-loop-18-H085690CKAM/',
//         from: '+17088476985',
//         to: '+213559670962'
//     })
//     .then(message => console.log(message.sid));


app.set('port', (process.env.PORT || 8000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Home
app.get('/', function (req, res) {
	res.send('Hello world!');
});
// Start the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});

app.post('/sendWhatsapp', function (req, res) {
	// whatsapp message
        
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);    

    client.messages
    .create({
        from: 'whatsapp:+14155238886',
        contentSid: process.env.CONTENT_SID,
        contentVariables: '{"1":"'+ req.body.url +'"}',
        to: 'whatsapp:+213559670962'
    })
    .then(res.send('message sended.'));
	//'{"1":"https://www.hermes.com/fr/fr/product/sac-hermes-in-the-loop-18-H085690CKAM/"}'
    // to: 'whatsapp:+213791602498'
});

