// app.js

// set up ======================================================================
// get all the tools we need
const createError    = require('http-errors');
const express        = require('express');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const session        = require('express-session');
const passport       = require('passport');
const flash          = require('connect-flash');
const morgan         = require('morgan');

const indexRouter    = require('./routes');
const usersRouter    = require('./routes/users');
const productsRouter = require('./routes/products');
const bidsRouter     = require('./routes/bids');
const cartsRouter    = require('./routes/carts');

require('dotenv').config();
require('./config/db')();
require('./config/passport')(passport); // pass passport for configuration

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/bids', bidsRouter);
app.use('/cart', cartsRouter)

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
  res.render('error.jade');
});

module.exports = app;
