var db = require(__dirname + './../config/db-connection');


exports.createGame = function(req,res,next){
	db.query("INSERT INTO game(name,description,location,start_date,end_date,orgz_id) VALUES (?, ?, ?, ?, ?, ?)"
		, [	req.body.name,
			req.body.description,
			req.body.location,
			req.body.start_date,
			req.body.end_date,
			req.body.orgz_id],
			function(err,rows){
		if(err) return next(err);
		res.send(rows);
	});
};

exports.addOrg = function(req,res,next){
	//foreach list
	db.query("")
}

exports.updateGame = function(req,res,next){
	
	db.query("UPDATE game SET name = ?,description = ,location = ?,start_date = ?,end_date = ? WHERE game_id = ?"
		, [	req.body.name,
			req.body.description,
			req.body.location,
			req.body.start_date,
			req.body.end_date,
			req.body.game_id],
			function(err,rows){
		if(err) return next(err);
		res.send(rows);
	});
};