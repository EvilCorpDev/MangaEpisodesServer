var express = require('express');
var repoFns = require('../../repo/functions');
var apiFns = require('../api/functions');
var User = require('../../models/user').User;
var Manga = require('../../models/manga').Manga;
var router = express.Router();

router.get('/', function(req, res, next) {
	res.json(auth(actions.getMangaAction, req));
});

router.post('/', function(req, res, next) {
	res.json(auth(actions.addMangaAction, req));
});

router.post('/delete', function(req, res, next) {
	res.json(auth(actions.delMangaAction, req));
});

var auth = function(action, req) {
	var authRes = apiFns.checkAuthWithToken(req);
	if(authRes.statusCode == 200) {
		return action(req);
	} else {
		return authRes;
	}
}

var actions = {

	getMangaAction: function(req) {
		var user = User.find({"username": req.body.username});
		if(user) {
			var mangaList = user.mangaList.map(function(element) {
				return element.url;
			});
			return Manga.find({"url": {"$in": mangaList}});
		}
	},

	addMangaAction: function(req) {
		if(req.body.url) {
			var manga = Manga.findOne({"url": req.body.url})
			if(!manga) {
				var options = {uri: req.body.url};
				parser.updateLastEpisode(options);
			}
			repoFns.addUpdateManga(req.body.username, manga.url);
		}
		return {"statusCode": 200, "msg": "All is Ok"};
	},

	delMangaAction: function(req) {
		if(req.body.url) {
			return repoFns.deleteManga(req.body.username, req.body.url);
		}
		return {"statusCode": 404, "msg": "Not specified subject of deleting"};
	}

}

module.exports = router;