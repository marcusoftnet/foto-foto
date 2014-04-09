var should = require('should');
var co = require('co');
var app = require('../app');
var request = require('supertest').agent(app.listen());
var motivesCollection = require('../routes/motive.js').motivesCollection;

describe('Creating new motives', function () {
	var NEW_MOTIVE_URL = '/motive/new';
	var TESTPIC_PATH = __dirname + '/fixtures/testpic.gif';

	var removeAll = function(done){
		co(function *(){
			yield motivesCollection.remove({});
		})(done);
	};

	beforeEach(function (done) {
		//removeAll();
		done();
	});

	it('works fine for correct indata', function (done) {
		request
			.post(NEW_MOTIVE_URL)
			.field('motiveName', 'anUniqueName')
			.attach('motiveFile', TESTPIC_PATH)
			.expect(302)
			.end(function (err, res) {
				res.header["location"].should.eql('/motive/anUniqueName');
				done();
			});
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