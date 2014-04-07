var app = require('../app');
var should = require('should');
var request = require('supertest').agent(app.listen());

describe('Creating new motives', function () {
	it('works fine for correct indata', function (done) {
		request
			.post()
.post('/')
.attach('avatar', 'test/fixtures/homeboy.jpg')
	});
	it('requires a motive name and a file');
	it('the motive name needs to be unique in the database');
});