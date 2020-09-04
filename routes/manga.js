var fs = require('fs');
var express = require('express');
var router = express.Router();

var { Path } = require('../config.json');
var { URLlist } = require(Path);
var addZero = require('../modules/addzero.js');

let files = [], html;

URLlist.forEach(function(path){
    if (typeof path !== 'string'){
        files.push(path);
    }
});

let page = '<img src="[nani]" class = "center-fit" /><br>\n'

fs.readFile('./html/manga.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

function getHTML(value){
    let images = [], Data = '';

    value.forEach(function(manga_page){
        Data += page.replace(/\[nani\]/g, manga_page);
    });

    return html.replace(/\[Data\]/g, Data);
}

router.get('/', function(req, res){
    if (files.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * files.length);

    console.log();

    res.send(getHTML(files[index]));

    console.log('/manga (' + addZero(index + 1, files.length) + '/' + files.length + ') ' + files[index]);
});

module.exports = router;
