var express = require('express');
var router = express.Router();
var Manga = require('../models/manga').Manga;

router.get('/', function(req, res, next) {
	console.log("details")
	console.log(req.query);
	if(!req.query.id) {
		res.render('../public/404.ejs');
	} else {
		Manga.findOne({'_id': req.query.id}, function(err, manga) {
			if(!err && manga) {
				res.render('../public/portfolio-details', {'manga' : manga});
			}
		});
	}
});

module.exports = router;
