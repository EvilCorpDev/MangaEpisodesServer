var request = require('request'),
	fns = require('./functions');

var parser = {

	updateLastEpisode: function (options) {
		request(options, function (err, res, page) {
			var mangaObj  = fns.callParser(options.uri, page);
    	});
	},
}

module.exports = parser;