var fs = require('fs');
var isImage = require('is-image');
var express = require('express');
var router = express.Router();
var {pixiv, deleteFolderRecursive} = require('../modules/pixiv.js');

var { Path, download_path } = require('../config.json');
var { URLlist } = require(Path);
var addZero = require('../modules/addzero.js');

let images = [], html;

URLlist.forEach(function (path){
    if (typeof path === 'string' && isImage(path)){
        images.push(path);
    }
});

fs.readFile('./html/image.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

router.get('/', function(req, res){
    if (images.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * images.length);
    console.log();
    pixiv(images[index]).then(function(name) {
        console.log(name);
        image = html.replace(/\[nani\]/g, name);
        res.write(image);
        console.log('/image (' + addZero(index + 1, images.length) + '/' + images.length + ') ' + images[index]);
        res.end();
    });
});

module.exports = router;
