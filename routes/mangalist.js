var express = require('express');
var router = express.Router();
var Manga = require('../models/manga').Manga;

/* GET users listing. */
router.get('/', function(req, res, next) {
	Manga.find({}, function(err, mangas) {
		if(!err && mangas) {
			res.render('../public/portfoliofour', {'mangas' : mangas});
		}
	});
});

module.exports = router;
