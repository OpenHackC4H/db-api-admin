const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/getProcess', (req, res) => {
    // const image = fs.readFile('./contents/laddaned.png', (err, data) => {
    //     if (err) throw err;
    //     return new Buffer(data, "binary").toString("base64");
    // });
    // console.log('image', image);

    // const audio = fs.readFile('./contents/attvantapasvar.m4a', (err, data) => {
    //     if (err) throw err;
    //     return new Buffer(data, "binary").toString("base64");
    // });

    // console.log('audio', audio);

    // const image = fs.readFileSync('./sample_data/Rattigheter.PNG');
    // const audio = fs.readFileSync('./sample_data/rattigheter.m4a');

    // var testJson = {
    //     id: 1,
    //     steps: [{
    //         audio: new Buffer(audio, "binary").toString("base64"),
    //         image: new Buffer(image, "binary").toString("base64")
    //     },
    //     {
    //         audio: new Buffer(audio, "binary").toString("base64"),
    //         image: new Buffer(image, "binary").toString("base64")
    //     }],
    //     version: 1
    // };

    // var stream = fs.createReadStream(testJson, { bufferSize: 64 * 1024 });
    // stream.pipe(res);

    var testJson = {
        id: 1,
        name: 'firstProcess',
        steps: [2, 1, 3],
        version: 1
    };

    res.send(testJson);
});

app.get('/login', (req, res) => {
    res.redirect("admin.html");
});



app.listen(8080, () => {
    console.log('start server');
});

var db = require('./dbscript.js');
db.init_db();