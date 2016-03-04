var express = require('express');
var repo = require('../../repo');
var fns = require('../../repo/functions');
var router = express.Router();

router.post('/', function(req, res, next) {
	var userName = req.params.username,
		token = req.params.token;

	res.json(repo.users.find({'username': userName}).mangaList);
});

router.post('/aaddUser', function(req, res, next) {
	var user = {},
		user.userName = req.params.username,
		user.email = req.params.token,
		user.pass = req.params.password;

	var newUser = new User(user);
	newUser.save(function(err) {
		console.log(err);
		console.log(newUser);
	});

	res.json(repo.users.find({'username': userName}));
});

module.exports = router;