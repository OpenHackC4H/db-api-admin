module.exports = {
	init_db: function(){
		var MongoClient = require('mongodb').MongoClient
		var ObjectID = require('bson').ObjectID;
		MongoClient.connect('mongodb://localhost:27017/teddyBear', function (err, db) {
			if (err) throw err
			
			//db.createCollection('steps');
			
			var steps = db.collection('steps');
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
				//image: base64_img1,
				//sound: base64_snd1
			});
			
			
			//Create Step2 document
			var base64_img2 = base64_encode("./sample_data/Att_vanta_pa_svar_red.png");
			var base64_snd2 = base64_encode('./sample_data/Att_vanta_pa_svar.m4a');
			var id2 = new ObjectID();
			steps.insert({
				_id: id2,
				description: "Att vänta på svar red",			
				version: init_version,
				//image: base64_img2,
				//sound: base64_snd2
			});
			
			//Create Step4 document
			var base64_img4 = base64_encode("./sample_data/att_vara_asylsokande_red.png");
			var base64_snd4 = base64_encode('./sample_data/Att_vara_asylsokande.m4a');
			var id4 = new ObjectID();
			steps.insert({
				_id: id3,
				description: "Att vara asylsokande",			
				version: init_version,
				//image: base64_img4,
				//sound: base64_snd4
			});
			
			//Create Step3 document
			var base64_img3 = base64_encode("./sample_data/fingeravtryck_red.png");
			var base64_snd3 = base64_encode('./sample_data/Fingeravtryck.m4a');
			var id3 = new ObjectID();
			steps.insert({
				_id:  id3,
				description: "fingeravtryck",			
				version: init_version,
				//image: base64_img3,
				//sound: base64_snd3
			});
			
			//db.createCollection('processes');
			
			var processCollection = db.collection('processes');
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
			
	})

	}
}

var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}



