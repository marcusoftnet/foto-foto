// Module dependencies
var parse = require('co-busboy');
var fs = require('fs');

// Handlers
function *addMotive(){
	var parts = parse(this);

	var part;
	var motive = {};
	while (part = yield parts) {
		// Busboy parts are arrays or streams
		// field values are in arrays
		if(part.length){
			if(part[0] === "motiveName"){
				motive.name = part[1];
			}
		}
		else {
			var stream = fs.createWriteStream('/tmp/' + Math.random() + part.filename);
			part.pipe(stream);
			console.log('uploading %s -> %s', part.filename, stream.path);
		}
	}

	console.log("Just uploaded a motive for " + motive.name);

	this.status = 201;
};

module.exports.addMotive = addMotive;