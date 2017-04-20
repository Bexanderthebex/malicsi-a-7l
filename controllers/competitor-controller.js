const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchCompetitor = (req, res) => {
	query = "CALL search_competitor(?)";
	connection.userType('A').query(query,
		[
			"%" + req.query.keyword + "%"
		], (err, rows) => {
		    if(!err) {
		    	if(rows[0].length == 1) {
					return res.status(200).send(rows[0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getCompetitor = (req, res) => {
	query = "CALL get_competitor(?)";

	connection.userType('A').query(query,
		[
			req.query.search
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0][0]);

			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getCompetitorTeams = (req, res) => {
	query = 'CALL get_competitor_teams(?)';

	console.log(req.session.user.id);
	connection.userType('A').query(query,
		[
			req.session.user.id
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0]);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
}

exports.editCompetitor = (req,res) => {
	currentUser = req.session.user;
	query = "CALL edit_competitor(?,?,?,?,?,?)";
	query1 = "CALL get_competitor(?)";

	connection.userType('A').query(query,
		[
			req.body.birthdate,
			req.body.first-name,
			req.body.last-name,
			req.body.nickname,
			req.body.sex,
			currentUser.id
		], (err, rows) => {
			if(!err) {
				connection.userType('A').query(query1,
					[
						currentUser.id
					], (err, rows) => {
						if(!err) {
							return res.status(200).send(rows[0][0]);
						}
					}
				);
			} else {
				return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}

exports.editCompetitorBio = (req,res) => {
	currentUser = req.session.user;
	query = "CALL edit_competitor_bio(?,?)";
	query1 = "CALL get_competitor(?)";

	connection.userType('A').query(query,
		[
			req.body.bio,
			currentUser.id
		], (err, rows) => {
			if(!err) {
				connection.userType('A').query(query1,
					[
						currentUserid
					], (err, rows) => {
						if(!err) {
							return res.status(200).send(rows[0][0]);
						}
						else{
							console.log(err);
							return res.status(500).send({'message' : 'Internal Server Error'});
						}
					}
				);
			} else {
				return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}



exports.getCompetitorRanking = (req, res) => {
	query = "CALL get_competitor_ranking(?)";

	connection.userType('A').query(query,
		[
			req.query.id
		], (err, rows) => {
		    if(!err) {
				return res.status(200).send(rows[0][0]);

			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}
