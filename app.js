const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser')

const app = express();

var bodyParserOptions = {
    inflate: true,
    limit: '100kb',
    type: 'application/json'
  };

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mobile and Admin
app.get('/getProcesses', (req, res) => {
    var testJson = [
        {
            id: 1,
            name: 'firstProcess',
            steps: [2, 1, 3],
            version: 1
        }
    ];

    res.send(testJson);
});

//Mobile and admin
// app.get('/getStep', (req, res) => {
//     const image = fs.readFileSync('./sample_data/Rattigheter.PNG');
//     const audio = fs.readFileSync('./sample_data/rattigheter.m4a');

//     const fakeStep = {
//         description: 'testDesc',
//         image: new Buffer(image, "binary").toString("base64"),
//         sound: new Buffer(audio, "binary").toString("base64"),
//         version: 1,
//         prev: 1,
//         next: [2, 3]
//     };

//     res.send(fakeStep);
// });

//Admin endpoint
app.get('/login', (req, res) => {
    //Authentication
    res.redirect("admin.html");
});

//Admin endpoint
app.post('/updateProcess', (req, res) => {
    console.log('updateProcess', req);
    //Update process in database
    res.sendStatus(200);
})

//Admin endpoint
app.post('/updateStep', (req, res) => {
    console.log('Update step', req.body);
    //Update step
    res.sendStatus(200);
});

app.post('/deleteStep', (req, res) => {

});

app.listen(8080, () => {
    console.log('start server');
});

var db = require('./dbscript.js');
db.init_db();