var request = require('supertest');
var should = require('should-http');
var url = 'http://localhost:3000';


describe('MalICSi', function() {	//Describes the module
	describe('/changeActivity', function() {	//Describes the specific feature
		it('Successfuly changed is_active', function(done){
			request(url)
				.post('/changeActivity')
				.end(function(err,res){
					res.should.status(200);
					done();
				});
		});
		it('is_active not changed, user does not exit', function(done){
			request(url)
				.post('/changeActivity')
				.end(function(err,res){
					res.should.status(404);
					res.body.should.have.property('message').eql('User does not exist.');

					done();
				});
		});
		it('is_active not changed, database error', function(done){
			request(url)
				.post('/changeActivity')
				.end(function(err,res){
					res.should.status(404);
					res.body.should.have.property('message').eql('Database error.');
					done();
				});
		});
	});
});
