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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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

const wws = new websocket.Server({ server });

var websockets = {};


var game = new Game(stats.gamesStarted);
var connectionID = 0;


wws.on('connection', function (ws) {


  let con = ws;
  con.id = connectionID++


  let playerType = game.addPlayer(con);

  websockets[con.id] = game;

  if (playerType == "A") {
    ws.send("playerTypA");
  } else if (playerType == "B") {
    ws.send("playerTypB");
  } 
  console.log(game.isGameFull());

  if (game.isGameFull()) {
    otherGame = new Game(stats.gamesStarted++);
  }


 
  ws.on('message', function (message) {

    var messageType = message.slice(0, 9);
    var content = message.slice(9);

    let gameObj = websockets[con.id];

    console.log(gameObj);

    let isPlayerA = (gameObj.getPlayerA() == con) ? true: false;

    if (isPlayerA) {
      if (message == "waitingforplayerB") {
        console.log(gameObj.isGameFull());
        if (gameObj.isGameFull()) {
          ws.send("start")
        }
      }

      if (messageType == "colorCode") {
        console.log(message);
        game.setCodeA(JSON.parse(content));
        console.log(game.codeA);
        ws.send("colorCodeSet");
      }
      if (message == "getdata") {
          ws.send("guesses"+JSON.stringify(gameObj.guesses));
          ws.send("indicat"+JSON.stringify(gameObj.indications));
      }


    } else {
      if (messageType == "codeGuess") {
        if (gameObj.isColorCodeSet()) {
          var guess = JSON.parse(content);
          gameObj.guesses[gameObj.guessAmount] = guess;
          var indicationOut = game.getIndication(guess, game.codeA);
          gameObj.indications[gameObj.guessAmount] = indicationOut;
          gameObj.guessAmount++;
          gameObj.playerA.send("guesses"+JSON.stringify(gameObj.guesses));
          gameObj.playerA.send("indicat"+JSON.stringify(gameObj.indications));
          if (indicationOut.black == 4) {
            ws.send("playerBWins");
            gameObj.playerA.send("playerBWins");
          }
          ws.send("indication" + JSON.stringify(indicationOut));
        }
      }
      if (message == "playerBjoined") {
        ws.send("start");
      }
    }


  })

  ws.on('close', function (code) {
    if (code == "1001") {
      let gameObj = websockets[con.id];

      gameObj.setGameState("aborted");
      stats.gamesAborted++;

      try {
        gameObj.getPlayerA().close();
        gameObj.setPlayerA(null);
      } catch(e) {
        console.log("PlayerA closing: "+e);
      }
  
      try {
        gameObj.getPlayerB().close();
        gameObj.setPlayerB(null);
      } catch(e) {
        console.log("PlayerB closing: "+e);
      }
    }

    

  })
})


server.listen(port);