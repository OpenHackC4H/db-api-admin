const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser')
const monk = require('monk')
const url = 'mongodb://127.0.0.1:27017/teddyBear'
const db = monk(url);
var ObjectID = require('bson').ObjectID;

const app = express();

var bodyParserOptions = {
    inflate: true,
    limit: '100kb',
    type: 'application/json'
  };

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Init data

var steps = db.get('steps');
var init_version = 0;
steps.remove();

//Create Step1 document 	
var img1 = "./sample_data/Rattigheter.PNG";
var base64_img1 = base64_encode(img1);
var base64_snd1 = base64_encode('./sample_data/rattigheter.m4a');
var id1 = new ObjectID();
steps.insert({
	_id:  id1,
	description: "Rattigheter",			
	version: init_version,
	image: base64_img1,
	sound: base64_snd1
});


//Create Step2 document
var base64_img2 = base64_encode("./sample_data/Att_vanta_pa_svar_red.png");
var base64_snd2 = base64_encode('./sample_data/Att_vanta_pa_svar.m4a');
var id2 = new ObjectID();
steps.insert({
	_id: id2,
	description: "Att vänta på svar red",			
	version: init_version,
	image: base64_img2,
	sound: base64_snd2
});

//Create Step4 document
var base64_img4 = base64_encode("./sample_data/att_vara_asylsokande_red.png");
var base64_snd4 = base64_encode('./sample_data/Att_vara_asylsokande.m4a');
var id4 = new ObjectID();
steps.insert({
	_id: id3,
	description: "Att vara asylsokande",			
	version: init_version,
	image: base64_img4,
	sound: base64_snd4
});


//Create Step3 document
var base64_img3 = base64_encode("./sample_data/fingeravtryck_red.png");
var base64_snd3 = base64_encode('./sample_data/Fingeravtryck.m4a');
var id3 = new ObjectID();
steps.insert({
	_id:  id3,
	description: "fingeravtryck",			
	version: init_version,
	image: base64_img3,
	sound: base64_snd3
});

//db.createCollection('processes');

var processCollection = db.get('processes');
processCollection.remove();
processCollection.insert({
	name: "Default",
	steps: [
		{
			objid: id1,
			prev: null,
			next: id2
		},
		{
			objid: id2,
			prev: id1,
			next: id3
		},
		{
			objid: id3,
			prev: id2,
			next: id4
		},
		{
			objid: id4,
			prev: id3,
			next: null
		}
		],
	version: init_version
})


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


// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}