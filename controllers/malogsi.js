const connection = require('db-connection');

/* Sample usage

const log = require('malogsi');
(req, res) => {
	.......
	log(1, 'P was absent').then((successValue) => {
	
	}. (errData) => {
	
	});
}

*/

module.exports = (userId, msg) => {
	return new Promise((resolve, reject) => {
		let query = 'INSERT INTO log SET ?';
		params = {
			user_id: userId,
			log_msg: msg
		};

		connection.userType('A').query(query, params, (err, rows) => {
			if (!err) resolve(rows);
			else reject(err);
		});
	});
}