var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");
var websocket = require("ws");
var fs = require("fs");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var port = process.argv[2];
var app = express();

////////////////////////////////////////////////



////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

////////////////////////////////////////////////
var stats = require('./statistics');
var Game = require('./game');

app.get("/play", indexRouter);



var server = http.createServer(app);

const wws = new websocket.Server({server});

var websockets = {};

var connectionID = 0;
var gameID = 0;
var playerAWaiting;

wws.on('connection', function(ws){


  let con = ws;

  con.id = connectionID++

  var game = new Game(gameID++);

  ws.on('message', function(message) {

    var messageType = message.slice(0,9);
    var content = message.slice(9);
   

    if (message == "waitingforotherplayer") {
      if (playerAWaiting) {
        console.log(game);
        playerAWaiting = false;
        window.location.assign("game.html");
        ws.send("waitingforcodes");
        console.log(playerAWaiting);

      } else {
        playerAWaiting = true;
        console.log(playerAWaiting);
      }
    }

    if (messageType == "colorCode") {
      game.setCodeA(JSON.parse(content));
      console.log(game.codeA);
    }

    if (messageType == "codeGuess") {
      var guess = JSON.parse(content);
      var indicationOut = game.getIndication(guess, game.codeA);
      ws.send("indication"+JSON.stringify(indicationOut));
    }

  
  
  })
})


server.listen(port);