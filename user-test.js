var request = require('supertest');
var should = require('should-http');
var url = 'http://localhost:3000';


describe('MalICSi', function() {	//Describes the module
	describe.only('/register', function() {	//Describes the specific feature
		it('not respond to POST', function(done) {	//describes kung anung case yung tinetest
			request(url)
				.post('/register')
				.end(function(err, res) {	//catches the http response
					res.should.status(404);	//translated as "response should (have) status 404"
					done();
				});
		});
		it('respond to POST (Successfully registered)', function(done){
			request(url)
				.post('/register')
				.send({ 	
						'username':'John Louis Gosgolan', 
						'password':'walakapagasa',
						'email': 'jagosgolan@up.edu.ph',
						'contact': '09167724643',
						'type': 'user',
						'is_active': true
					}) 
				.end(function(err,res){
					res.should.status(200);
					done();
				});
		});
	});
});