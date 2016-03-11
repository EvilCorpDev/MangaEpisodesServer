var Manga = require('../models/manga').Manga;
var parser = require('../parser');

var options = {};

var updateManga = function() {
	Manga.find({}, function(err, mangas) {
		if(!err && mangas) {
			mangas.forEach(function(manga) {
				options.uri = manga.url;
				parser.updateLastEpisode(options);
			});
		}
	});
}

module.exports = updateManga;