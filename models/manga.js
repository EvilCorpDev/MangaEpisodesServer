var mongoose = require('../repo'),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	lastEpisode: {
		type: Number,
		required: true
	},
	coverImg: {
		type: String,
		required: true
	},
	updateTime: {
		type: Date,
		default: Date.now
	},
	alreadyReaded: {
		type: Boolean,
		default: false
	}
});

exports.Manga = mongoose.model('Manga', schema);