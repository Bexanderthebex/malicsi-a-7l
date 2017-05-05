const express = require('express');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public/uploads')
  },
  filename: function (req, file, cb) {
    var extArray = file.mimetype.split("/");
    var extension = extArray[extArray.length - 1];
    console.log("\n\n\nFile: ");
    console.log(file);
    console.log("\n\n\nReq: ");
    console.log(req.body);
    if (!(extension == 'jpeg' || extension == 'jpg' || extension == 'png'))
    	return;
    cb(null, file.originalname);
  }
})

app.set('port', (process.env.PORT || 3000))
app.use(multer({storage:storage}).any());

var routes = require('./routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// place session
//sha256 of the string 'malicsi' (minus quotes)
app.use(cookieSession({secret: '65508d52c495cc86e75eed713f253d9777c27fb2bda2701a50581334b95f4ac2'}));

// public files
app.use('/', express.static(path.join(__dirname, 'public')));

// place other routing stuff
app.use(routes);

app.get('*', function(req, res) {
  res.redirect('/')
})

app.listen(app.get('port'), function(){
	console.log('Server running at localhost:3000');
});
