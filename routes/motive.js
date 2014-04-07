// Module dependencies
var parse = require('co-busboy');
var fs = require('fs');

// Handlers
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
		this.status = 201;
	}
};

module.exports.addMotive = addMotive;