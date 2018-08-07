const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const categoryRouter = require('./routes/category');
const addRouter = require('./routes/add');
const pageRouter = require('./routes/page');
const deleteRouter = require('./routes/delete');
const {connection} = require('./models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//коннекты к базе
app.use(async(req, res, next) => await connection(req, next))

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/page', pageRouter);
app.use('/category', categoryRouter);
app.use('/add', addRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
