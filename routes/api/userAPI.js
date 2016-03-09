var express = require('express');
var router = express.Router();
var repoFns = require('../../repo/functions');

router.post('/addUser', function(req, res, next) {
	var user = {};
	user.username = req.body.username,
	user.email = req.body.email,
	user.pass = req.body.password;
	repoFns.addUser(user)

	User.find({'username': userName},function (err, user) {
		res.json(user);
	});
});