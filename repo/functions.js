var repo = require('../repo');
var User = require('../models/user').User;
var Manga = require('../models/manga').Manga;

repo.addUpdateManga = function(userName, mangaUrl, read) {
	User.findOne({"username": userName}, function(err, user){
		if(!read) {
			read = false;
		}
		var mangaObj = { "url": mangaUrl, "read": read };
		var index = user.mangaList.map(function (obj) { return obj.url}).indexOf(mangaUrl);
		if (index > -1) {
			user.mangaList.splice(index, 1);
		}
		user.mangaList.push(mangaObj);
		user.save();
	});
};

// add returning result;
repo.deleteManga = function(userName, mangaUrl) {
	var manga = Manga.findOne({"url": mangaUrl});
	var user = new User(repo.users.find({"username": userName}));
	var newMangaList = user.mangaList.filter(function(element) {
		return element != mangaUrl;
	});
	user.mangaList = newMangaList;
	if(manga.linkNumbers == 1) {
		manga.delete();
	} else {
		manga.linkNumbers--;
		manga.save();
	}
	user.save();
};

repo.addUser = function(userObj) {
	var newUser = new User(userObj);
	newUser.set('password', userObj.pass);
	newUser.save(function(err) {
		if(err) {
			console.log(err);
		}
	});
}

module.exports = repo;