var repo = require('../repo');
var User = require('../models/user')
var Manga = require('../models/manga');

repo.addUpdateManga = function(userName, mangaObj) {
	var user = new User(repo.users.find({"username": userName}));
	var manga = new Manga(mangaObj);
	var index = user.mangaList.indexOf(manga);
	if (index > -1) {
		user.mangaList.splice(index, 1);
	}
	user.mangaList.push(manga);
	user.update();
};


repo.deleteManga = function(userName, mangaObj) {
	var user = new User(repo.users.find({"username": userName}));
	var manga = new Manga(mangaObj);
	var index = user.mangaList.indexOf(manga);
	if (index > -1) {
		user.mangaList.splice(index, 1);
	}
	user.update();

};

repo.addUser = function(userObj) {
	var user = new User(userObj);
	user.save();
}

module.exports = repo;