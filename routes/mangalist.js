var express = require('express');
var router = express.Router();
var Manga = require('../models/manga').Manga;
var sites = require('../parser/functions').sites;

/* GET users listing. */
router.get('/', function(req, res, next) {
	Manga.find({}, function(err, mangas) {
		if(!err && mangas) {
			res.render('../public/portfoliofour', {'mangas' : mangas, 'sites': sites});
		}
	});
});

module.exports = router;
