var Token = require('../../libs/token');
var User = require('../../models/user').User;
var config = require('../../config');
var moment = require('moment');

var apiFns = {

	checkAuthWithToken: function(req) {
		var body = req.body;
		var session = req.session;
		if(!(body.username && body.token)) {
			return {"statusCode": 401,
					"msg": "You are unauthorized"};
		} else {
			return this.checkToken(session, body);
		}
	},

	checkToken: function(session, body) {
		if(session.tokens[body.username]) {
			var token = session.tokens[body.username];
			if(this.checkTokenExpires(token) 
				&& this.checkTokenAuthority(token, body.username, body.token)) {
				return {"statusCode": 200,
						"msg": "Token is Ok"};
			}
		}
		return {"statusCode": 403,
				"msg": "Something wrong with token"};
	},

	checkTokenExpires: function(token) {
		return moment(token.expires).isAfter(Date.now());
	},

	checkTokenAuthority: function(token, username, secret) {
		return token.secret === secret 
				&& token.username === username;
	},

	generateToken: function(req) {
		var token = {};
		token.secret = Token(48);
		token.expires = new Date (Date.now() + config.get('tokenExpires'));
		token.username = req.body.username;
		if(!req.session.tokens) {
			req.session.tokens = {};
		}
		req.session.tokens[req.body.username] = token;
		return token.secret;
	}
}

module.exports = apiFns;