var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');

var app = express();
var mongoose = require('mongoose');
var Chatkit = require('@pusher/chatkit-server');

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const config = require('./server/config/default');

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build/')));

const mongoURI = config.MONGODB_URL;

mongoose.connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
