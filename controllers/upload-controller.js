"use strict"

const express = require('express');
'use strict'

const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
 /*
// default options 
app.use(fileUpload());*/
 
exports.imageUpload = (req, res) => {
    let extArray = req.files[0].mimetype.split("/");
    let extension = extArray[extArray.length - 1];
 
    fs.rename(req.files[0].path+"",__dirname+'/../public/uploads/'+req.body.name[0]+"."+extension, function(err) {
        if(err){
            console.log('ERROR: ' + err);
            return res.status(500).send({ 'message' : 'Internal Server Error'});
        }
    });
    
    res.status(200).send('File uploaded!');
};
