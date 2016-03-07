var apiFns = {

	checkAuth: function(req) {
		var body = req.body;
		var session = req.session;
		if(!(body.username && body.token)) {

		} else if(session.tokens[body.token].secret === body.username 
			&& session.tokens[body.token].){

		}
	},

	checkTokenExpires: function(token) {
		return dates.compare(token.expires, Date.now());
	},

	checkTokenAuthority: function(token, username) {
		return token.secret === username;
	}
}