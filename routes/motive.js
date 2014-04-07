// Module dependencies
var parse = require('co-busboy');
var fs = require('fs');

// Handlers
function *addMotive(){
	this.body = "addMotive";
};

module.exports.addMotive = addMotive;