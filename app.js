const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

const index = require('./routes/index');
const movie = require('./routes/movie');

const app = express();

mongoose.connect('mongodb://localhost/movieapi')
mongoose.connection.on("open",()=>{
  console.log("MongoDB : Connected.")
})
mongoose.connection.on("error",(err)=>{
  console.log("MongoDB : Connected.",err)
})
mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/movie', movie);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
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
