var crypto = require('crypto');

var mongoose = require('../repo'),
	Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hashedPass: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	mangaList: []
});

schema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function(password) {
		this.plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPass = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword; });

schema.methods.checkPassword = function(password) {
	return this.hashedPass === this.encryptPassword(password);
}

exports.User = mongoose.model('User', schema);