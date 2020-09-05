const download = require('pixiv-img');
const fs = require('fs');
const Path = require('path');
const {download_path} = require('../config.json');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

function getpath(url){
    return download_path + Path.basename(url);
}

async function pixiv(url){
    return new Promise(function (resolve, reject){
        if (url.startsWith("https://i.pximg.net/")) {
            if (!fs.existsSync(download_path)){
                fs.mkdirSync(download_path, function(err){
                    if (err) throw err;
                });
            }
            if (fs.existsSync(getpath(url))){
                resolve(getpath(url));
            }
            else{
                download(url, getpath(url)).then(output => {
                    resolve(output);
                });
            }
        }
        else{
            resolve(url);
        }
    })
}

module.exports = {pixiv, deleteFolderRecursive, getpath};
