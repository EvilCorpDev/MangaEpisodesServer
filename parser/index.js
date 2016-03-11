var request = require('request');
var fns = require('./functions');
var Manga = require('../models/manga').Manga;
var fs = require('fs');
var path = require('path');

var parser = {
	updateLastEpisode: function (options) {
		request(options, function (err, res, page) {
			var mangaObj  = fns.callParser(options.uri, page);
			mangaObj.url = options.uri;
			var manga = new Manga(mangaObj);
			manga.save(function(err, result) {
				if(err) {
					console.log('\nmanga saving errors')
					console.log(err);
				}
				saveImg(result);
			});
		});
	},
}

var saveImg = function(manga) {
	fs.stat(path.join(__dirname, '../covers/' + manga._id), function(err, stat) { 
		if(err.code == 'ENOENT') {
			var r = request(manga.img);
			r.on('response',  function (res) {
				res.pipe(fs.createWriteStream(path.join(__dirname, '../covers/' + manga._id + getExtension(res))));
			});
		} else {
			console.log(err);
		}
	}); 
}

var getExtension = function(res) {
	return '.' + res.headers['content-type'].split('/')[1]
}

module.exports = parser;