var request = require('request');
var fns = require('./functions');
var Manga = require('../models/manga').Manga;

var parser = {
	updateLastEpisode: function (options) {
		request(options, function (err, res, page) {
			var mangaObj  = fns.callParser(options.uri, page);
			mangaObj.url = options.uri;
			var manga = new Manga(mangaObj);
			manga.save();
    	});
	},
}

module.exports = parser;