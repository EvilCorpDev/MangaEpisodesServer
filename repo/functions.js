var repo = require('../repo');
var User = require('../models/user')
var Manga = require('../models/manga');

repo.addUpdateManga = function(userName, mangaUrl) {
	var user = new User(repo.users.find({"username": userName}));
	var mangaObj = { "url": mangaUrl, "read": false };
	var index = user.mangaList.indexOf(mangaObj);
	if (index > -1) {
		user.mangaList.splice(index, 1);
	}
	user.mangaList.push(mangaObj);
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
	var newUser = new User(user);
	newUser.set('password', user.pass);
	newUser.save(function(err) {
		console.log(newUser);
	});
}

module.exports = repo;