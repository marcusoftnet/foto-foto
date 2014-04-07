var app = require('../app');
var should = require('should');
var request = require('supertest').agent(app.listen());

describe('Creating new motives', function () {
	var NEW_MOTIVE_URL = '/api/motive/new';
	var TESTPIC_PATH = __dirname + '/fixtures/testpic.gif';

	it('works fine for correct indata', function (done) {
		request
			.post(NEW_MOTIVE_URL)
			.field('motiveName', 'anUniqueName')
			.attach('motiveFile', TESTPIC_PATH)
			.expect(201)
			.end(done);
	});
	it('requires a motive name', function (done) {
		request
			.post(NEW_MOTIVE_URL)
			.attach('motiveFile', TESTPIC_PATH)
			.expect(400)
			.expect({ message: 'Motive name is required' })
			.end(done);
	});
	it('requires a motive file', function (done) {
		request
			.post(NEW_MOTIVE_URL)
			.field('motiveName', 'anUniqueName')
			.expect(400)
			.expect({ message: 'Motive file is required' })
			.end(done);
	});
	it('the motive name needs to be unique in the database');
});