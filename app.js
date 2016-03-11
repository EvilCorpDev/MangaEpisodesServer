var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var repo = require('./repo');
var config = require('./config');

var routes = require('./routes/index');
var users = require('./routes/users');
var mangalist = require('./routes/mangalist');
var details = require('./routes/details');
var mangaApi = require('./routes/api/mangaAPI');
var userApi = require('./routes/api/userAPI');

var parser = require('./parser');

var app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// view engine setup
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use(express.static('covers'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.get('sessionSecret'),
    store: new MongoStore({ mongooseConnection: repo.connection })
}));

app.use('/', routes);
app.use('/users', users);
app.use('/details', details);
app.use('/mangalist', mangalist);
app.use('/api/manga', mangaApi);
app.use('/api/users', userApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render(path.join(__dirname, './public/404.ejs'));
  //next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
