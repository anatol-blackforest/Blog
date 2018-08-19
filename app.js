const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('cookie-session');

const {homeRouter, postsRouter, categoryRouter, pageRouter, registerRouter, loginRouter, logoutRouter} = require('./routes/');
const {getAccount} = require('./controllers');
const {connection} = require('./models');
const {key} = require('./config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({keys: [key]}));
app.use(passport.initialize());
app.use(passport.session());

//коннекты к базе
app.use(async(req, res, next) => await connection(req, next))

//проверяем админский хэш в сессии
passport.use(new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => getAccount(req, username, password, done).catch(() => done(null, false))));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use('/', homeRouter);
app.use('/posts', postsRouter);
app.use('/page', pageRouter);
app.use('/category', categoryRouter);
app.use('/register', registerRouter);
app.use('/login/', loginRouter);
app.use('/logout/', logoutRouter);

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
