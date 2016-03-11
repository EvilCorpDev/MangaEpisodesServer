var mongoose = require('mongoose');
var config = require('../config');
var format = require('string-format');

mongoose.connect(format("mongodb://{dbuser}:{dbpass}@{dbhost}:{dbport}/{dbname}", config.get('mongoose')));

module.exports = mongoose;