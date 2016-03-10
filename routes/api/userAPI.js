var express = require('express');
var router = express.Router();
var repoFns = require('../../repo/functions');
var apiFns = require('../api/functions');
var User = require('../../models/user').User;
var extend = require('util')._extend;

router.post('/getToken', function(req, res, next) {
	User.findOne({"username": req.body.username}, function(err, user) {
		if(user && user.checkPassword(req.body.password)) {
			res.json(apiFns.generateToken(req));
		} else {
			res.status(403);
			res.json({"statusCode": 403, "msg": "Invalid credentials"});
		}
	});
});

router.post('/addUser', function(req, res, next) {
	var user = compileUser(req);
	repoFns.addUser(user);

	User.find({'username': user.username},function (err, user) {
		if(!err) {
			res.json(clearUser(user));
		} else {
			res.json({"statusCode": 500, "msg": "Something was wrong"});
		}
	});
});

var clearUser = function(user) {
	var newUser = extend(user)[0];
	newUser._id = undefined;
	newUser.hashedPass = undefined;
	newUser.salt = undefined;
	newUser.__v = undefined;
	return newUser;
}

var compileUser = function(req) {
	var user = {};
	user.username = req.body.username,
	user.email = req.body.email,
	user.pass = req.body.password;
	return user;
}

module.exports = router;