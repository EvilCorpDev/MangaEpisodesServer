var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect('mongodb://manga-reader:zpk30101994@ds011168.mlab.com:11168/manga-episodes');

module.exports = mongoose;