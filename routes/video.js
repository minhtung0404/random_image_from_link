var fs = require('fs');
var isImage = require('is-image');
var express = require('express');
var router = express.Router();

var { Path } = require('../config.json');
var { URLlist } = require(Path);
var addZero = require('../modules/addzero.js');

let videos = [], html;

URLlist.forEach(function (path){
    if (typeof path === 'string' && !isImage(path)){
        videos.push(path);
    }
});

fs.readFile('./html/video.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

router.get('/', function(req, res){
    if (videos.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * videos.length);
    console.log()
    video = html.replace(/\[nani\]/g, videos[index]);
    res.write(video);
    console.log('/video (' + addZero(index + 1, videos.length) + '/' + videos.length + ') ' + videos[index]);
    res.end();
});

module.exports = router;
