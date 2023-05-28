var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

const dotenv = require("dotenv");

dotenv.config();

let {userRouter, 
  dealerRouter,
  speciesRouter} = require('./routes');
const { oemSpecsModel } = require('./models');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({
  limit: '5mb',
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('strictQuery', false);
// let password = encodeURIComponent("arborhawk")

const db = process.env.MONGODB_URL

mongoose.connect(db,{
   useNewUrlParser: true 
}).then(()=>{
  console.log("connection successful")
}).catch((err)=> console.log(err.message))



app.use("/user", userRouter);
app.use("/dealer", dealerRouter);
app.use("/species", speciesRouter);


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
