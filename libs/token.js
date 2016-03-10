var crypto = require('crypto');

var token = function(size) {
	return crypto.randomBytes(size).toString('hex');
}

module.exports = token;