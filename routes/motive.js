// Module dependencies
var parse = require('co-busboy');
var fs = require('fs');

// Set up monk stuff, via co-monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/foto-foto');
var motives = wrap(db.get('motives'));
module.exports.motivesCollection = motives;

// Handlers ... maybe one per logical function?
function *addMotive(){
	var parts = parse(this);
	var part;
	var motive = {name: null, stream : null};

	// Parse the multipart form with busboy
	while (part = yield parts) {
		// Busboy parts are arrays or streams
		// field values are in arrays
		if(part.length){
			if(part[0] === 'motiveName'){
				motive.name = part[1];
			}
		}
		else {
			var stream = fs.createWriteStream('/tmp/' + Math.random() + part.filename);
			motive.stream = stream;
			part.pipe(stream);
		}
	}

	// Validation
	if(motive.name === null){
		this.body = { message : 'Motive name is required'};
		this.status = 400;
	}
	else if(motive.stream === null){
		this.body = { message : 'Motive file is required'};
		this.status = 400;
	}
	else{
		// Storage
		motive.created_on = new Date;
		motive.version = 1;
		yield motives.insert(motive);

		// Respond
		this.redirect("/motive/" + motive.name)
	}
};
module.exports.addMotive = addMotive;

function *getMotive(name) {
	this.body = "The name is: " + name;
	this.status = 200;
};
module.exports.getMotive = getMotive;