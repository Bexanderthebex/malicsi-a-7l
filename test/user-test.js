var request = require('supertest');
var should = require('should-http');
var url = 'http://localhost:3000';

describe('MalICSi', function() {	//Describes the module
	describe.only('/register', function() {	//Describes the specific feature
		it('not respond to GET', function(done) {	//describes kung anung case yung tinetest
			request(url)
				.get('/register')
				.end(function(err, res) {	//catches the http response
					res.should.status(404);	//translated as "response should (have) status 404"
					done();
				});
		});
		it('Respond to POST (Successfully registered)', function(done){ //Passing, if mag-inisert ng values na wala pa sa database. Failing, if mag-insert ng existing
			request(url)
				.post('/register')
				.send({
						'username':'jpelaez',
						'password':'hihihi',
						'email': 'example@up.edu.ph',
						'contact': '09111111111',
						'type': 'C',
						'is_active': 1
					})
				.end(function(err,res){
					res.should.status(200);
					done();
				});
		});
		it('Respond to POST (Cannot register user, existing)', function(done){ //Failing, coz nag-iinsert ng value na nasa database na
			request(url)
				.post('/register')
				.send({
						'username':'jpelaez',
						'password':'hehehe',
						'email': 'example@up.edu.ph',
						'contact': '0912345678',
						'type': 'C',
						'is_active': 1
					})
				.end(function(err,res){
					res.should.status(404);
					done();
				});
		});
		it('respond to POST (Cannot register user, insufficient credentials)', function(done){ //Failing, coz nag-iinsert ng value na kulang ang info needed.
			request(url)
				.post('/register')
				.send({
						'username':'The Betels',
						'password':'A-7L'
					})
				.end(function(err,res){
					res.should.status(404);
					done();
				});
		});
	});

	describe.only('/login', function() {	//Describes the specific feature
		it('not respond to GET', function(done) {	//describes kung anung case yung tinetest
			request(url)
				.get('/login')
				.end(function(err, res) {	//catches the http response
					res.should.status(404);	//translated as "response should (have) status 404"
					done();
				});
		});
		it('respond to POST (Successfully logged in)', function(done){
			request(url)
				.post('/login')
				.send({ 'username':'jpelaez', 'password':'hihihi'})
				.end(function(err,res){
					res.should.status(200);
					done();
				});
		});
		it('respond to POST (Incorrect password)', function(done){
			request(url)
				.post('/login')
				.send({ 'username':'jpelaez', 'password': 'kek' })
				.end(function(err,res) {
					res.should.status(404);
					res.body.should.have.property('message').eql('Incorrect credentials');
					done();
				});
		});
		it('respond to POST (User does not exist!)', function(done) {
			request(url)
				.post('/login')
				.send({ 'username':'mcdo' })
				.end(function(err,res){
					res.should.status(404);
					res.body.should.have.property('message').eql('Incorrect credentials');
					done();
				});
		});
	});


		describe('/returnInfo', function() {	//Describes the specific feature

		it('should load user info from database', function(done){
				request(url)
					.post('/returnInfo')
					.send({'id': '001', 'username': 'Pat', 'is_active': 'true'})
					.end(function(err, res) {	//catches the http response
						res.should.status(200);	//translated as "response should (have) status 200"
					
						res.should.be.json;
					      res.body.should.have.property('id');
					      res.body.should.have.property('username');
					      res.body.should.have.property('is_active');

				        res.body.username.should.equal('Pat');
						res.body.id.should.equal('001');
						res.body.is_active.should.equal('true');
						done();
					});

			  });


		it('failed to load user info from database', function(done){
				request(url)
					.post('/returnInfo')
					.send({'id': '001', 'username': 'Pat', 'is_active': 'true'})
					.end(function(err, res) {	//catches the http response
						res.should.status(404);	//translated as "response should (have) status 200"
						res.body.should.have.property('message').eql('Error getting user info!');
						
						
						done();
					});

			  });


























		});


});
