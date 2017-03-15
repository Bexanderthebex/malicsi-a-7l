'use strict'

const request = require('request');

var text = {
	"search" : "l"
}

request({
	url: 'http://localhost:3000/searchOrganizer',
	json: text
    }, function(err, res, body) {
     if (err) {
        console.log(err);
	 } else {
		console.log(body);
    }
});
