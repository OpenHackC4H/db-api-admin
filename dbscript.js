function init_db(){
	var MongoClient = require('mongodb').MongoClient

	MongoClient.connect('mongodb://localhost:27017/teddyBear', function (err, db) {
		if (err) throw err
		
		var steps = db.collection('steps')
		var init_version = 0;

		//Create Step1 document 		
		
		var temp = steps.find({description: "Rattigheter"})
		var img1 = "./sample_data/Rattigheter.PNG";
		var base64_img1 = base64_encode(img1);
		var base64_snd1 = base64_encode('./sample_data/rattigheter.m4a');
		steps.insert({
			description: "Att vänta på svar red",			
			version: init_version,
			image: base64_img1,
			sound: base64_snd1
		});
		
})

}

var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

init_db();
//console.log("Done");

