var Token = require('../../lib/token');
var User = require('../../models/user').User;
var config = require('../../config');

var apiFns = {

	authenticate: function(req) {
		if(req.body.username && req.body.password) {
			var user = User.findOne({"username": req.body.username});
			if(user && user.checkPassword(req.body.password)) {
				return generateToken(req);
			}
		} else {
			return 403;
		}
	},

	checkAuthWithToken: function(req) {
		var body = req.body;
		var session = req.session;
		if(!(body.username && body.token)) {
			return {"statusCode": 401,
					"msg": "You are unauthorized"};
		} else {
			return checkToken(session, body);
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
		return dates.compare(token.expires, Date.now());
	},

	checkTokenAuthority: function(token, username, secret) {
		return token.secret === secret 
				&& token.username === username;
	},

	generateToken: function(req) {
		var token = {};
		token.secret = Token(48);
		token.expires = Date.now() + config.get('tokenExpires');
		token.username = req.body.username;
		if(!req.session.tokens) {
			req.session.tokens = [];
		}
		req.session.tokens.push(token);
		return token.secret;
	}
}

module.exports = apiFns;