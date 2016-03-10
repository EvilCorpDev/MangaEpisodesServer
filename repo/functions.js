var repo = require('../repo');
var User = require('../models/user').User;
var Manga = require('../models/manga').Manga;

repo.addUpdateManga = function(userName, mangaUrl) {
	User.findOne({"username": userName}, function(err, user){
		var mangaObj = { "url": mangaUrl, "read": false };
		var index = user.mangaList.indexOf(mangaObj);
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
		console.log(newUser);
	});
}

module.exports = repo;