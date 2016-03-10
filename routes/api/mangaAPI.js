var express = require('express');
var repoFns = require('../../repo/functions');
var apiFns = require('../api/functions');
var User = require('../../models/user').User;
var Manga = require('../../models/manga').Manga;
var router = express.Router();
var parser = require('../../parser')

router.post('/all', function(req, res, next) {
	auth(actions.getMangaAction, req, res);
});

router.post('/', function(req, res, next) {
	auth(actions.addMangaAction, req, res);
});

router.post('/delete', function(req, res, next) {
	auth(actions.delMangaAction, req, res);
});

var auth = function(action, req, res) {
	var authRes = apiFns.checkAuthWithToken(req);
	if(authRes.statusCode == 200) {
		return action(req, res);
	} else {
		res.status(authRes.statusCode);
		return authRes;
	}
}

var actions = {

	getMangaAction: function(req, res) {
		User.findOne({"username": req.body.username}, function(err, user) {
			if(user) {
				console.log(user);
				var mangaList = user.mangaList.map(function(element) {
					return element.url;
				});
				Manga.find({"url": {"$in": mangaList}}, function (err, result) {
					res.json(result);
				});
			}
		});
	},

	addMangaAction: function(req, res) {
		if(req.body.url) {
			Manga.findOne({"url": req.body.url}, function(err, manga) {
				if(!manga) {
					var options = {uri: req.body.url};
					parser.updateLastEpisode(options);
				}
				repoFns.addUpdateManga(req.body.username, req.body.url);
				res.json({"statusCode": 200, "msg": "All is Ok"});
			});
		}
	},

	delMangaAction: function(req, res) {
		if(req.body.url) {
			res.json(repoFns.deleteManga(req.body.username, req.body.url));
		}
		res.json({"statusCode": 404, "msg": "Not specified subject of deleting"});
	}

}

module.exports = router;