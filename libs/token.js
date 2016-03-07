var crypto = require('crypto');

var token = function(size) {
	return crypto.randomBytes(size).toString('hex');
}

modules.exports = token;