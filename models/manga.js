var mongoose = require('../repo'),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	episode: {
		type: Number,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	updateTime: {
		type: Date,
		default: Date.now
	},
	url: {
		type: String,
		required: true
	},
	linkNumbers: {
		type: Number,
		default: 1
	}
});

exports.Manga = mongoose.model('Manga', schema);