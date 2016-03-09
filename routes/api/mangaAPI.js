var express = require('express');
var repoFns = require('../../repo/functions');
var apiFns = require('../api/functions');
var User = require('../../models/user').User;
var Manga = require('../../models/manga').Manga;
var router = express.Router();

router.get('/', function(req, res, next) {
	res.json(auth(getMangaAction, req));
});

router.post('/', function(req, res, next) {
	res.json(auth(addMangaAction, req));
});

var auth = function(action, req) {
	var authRes = apiFns.checkAuthWithToken(req);
	if(authRes.statusCode == 200) {
		return action(req);
	} else {
		return authRes;
	}
}

var getMangaAction = function(req) {
	return User.findOne({"username": req.body.username}).mangaList;
}

var addMangaAction = function(req) {
	if(req.body.url) {
		var manga = Manga.findOne({"url": req.body.url})
		if(!manga) {
			var options = {uri: req.body.url};
			parser.updateLastEpisode(options);
		}
		repoFns.addUpdateManga(req.body.username, manga.url);
	}
	return {"statusCode": 200, "msg": "All is Ok"};
}

module.exports = router;