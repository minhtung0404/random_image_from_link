var fs = require('fs');
var express = require('express');
var router = express.Router();

var {pixiv, deleteFolderRecursive, getpath} = require('../modules/pixiv.js');
var { Path, download_path } = require('../config.json');
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

async function getHTML(value){
    let images = [], Data = '';

    for (let i = 0; i < value.length; i++){
        manga_page = value[i];
        await pixiv(manga_page);
        Data += page.replace(/\[nani\]/g, getpath(manga_page));
    }

    return Data;
}

router.get('/', function(req, res){
    if (files.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * files.length);

    console.log();

    getHTML(files[index]).then(function(Data){
        res.send(html.replace(/\[Data\]/g, Data));
    });

    console.log('/manga (' + addZero(index + 1, files.length) + '/' + files.length + ') ');
});

module.exports = router;
