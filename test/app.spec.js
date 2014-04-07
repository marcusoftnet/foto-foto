var app = require('../app');
var should = require('should');

var request = require('supertest').agent(app.listen());

describe("The foto-foto", function () {
	it("exists", function (done) {
		should.exists("app");
		done();
	});
	it("serves static files", function (done) {
		request
			.get("/")
			.expect('Content-Type', /html/)
			.end(done);
	});
});