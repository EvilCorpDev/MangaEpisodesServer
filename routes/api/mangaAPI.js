var express = require('express');
var fns = require('../../repo/functions');
var User = require('../../models/user').User;
var router = express.Router();

router.post('/', function(req, res, next) {
	var userName = req.body.username,
		token = req.body.token;
	User.find({'username': userName}, function (err, user) {
		res.json(user);
	});
});

router.post('/addUser', function(req, res, next) {
	var user = {};
	user.username = req.body.username,
	user.email = req.body.email,
	user.pass = req.body.password;
	console.log(user);
	var newUser = new User(user);
	newUser.set('password', user.pass);
	newUser.save(function(err) {
		console.log(newUser);
	});

	User.find({'username': userName},function (err, user) {
		res.json(user);
	});
});

module.exports = router;