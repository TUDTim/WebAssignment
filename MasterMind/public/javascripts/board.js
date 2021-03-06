var gameSetup = function () {


    var colorClicked;
    var pinClicked;
    var colorCodeSet;
    var waitingForPlayerB = false;
    var bothPlayersJoined = false;
    var g

    gameState.setPlayerType("B");
    console.log(gameState.getPlayerType());

    var socket = new WebSocket("ws://localhost:3000");
    // renderGuessingBoard();




    socket.onmessage = function (event) {
        var message = event.data;
        var messageType = message.slice(0, 10);
        var content = message.slice(10);


        if (messageType == "indication") {
            console.log("indication recieved");
            var indication = JSON.parse(content);
            console.log(indication);
            gameState.addIndication(indication);
            console.log(gameState.getIndications(0)); +
                showIndications();
        }
        if (message == "playerTypA") {
            gameState.setPlayerType("A");
            renderCodeToBeGuessedBoard();
            setTimeout(function () {
                alert("Waiting for opponent");
            }, 100)
            waitingForPlayerB = true;
            socket.send("waitingforplayerB");
        }
        if (message == "playerTypB") {
            gameState.setPlayerType("B");
            renderGuessingBoard();
            socket.send("playerBjoined");
        }
        if (message == "start") {
            waitingForPlayerB = false;
            bothPlayersJoined = true;
        }
        if (message == "colorCodeSet") {
            colorCodeSet = true;
        }
        if (message == "playerBWins") {
            alert("Player B won");
            location.href = "splash.html";
        }
        if (messageType = "guessesToU") { 
           gameState.setGuesses(JSON.parse(content));
           showGuesses();
        }
        if (messageType = "indication") {
            gameState.setIndications(JSON.parse(content));
            showIndications();
        }

    }

    while (waitingForPlayerB) {
        setTimeout(function () {
            console.log("hey");
            socket.send("waitingforplayerB");
        }, 2000)
    }

    // if (gameState.getPlayerType() == "B" || colorCodeSet == true) {
    //     renderGuessingBoard();
    // } else if (gameState.getPlayerType() == "A") {
    //     renderCodeToBeGuessedBoard();
    // }

    var colorTable = document.getElementById("colortable");

    colorTable.addEventListener("click", function () {
        colorClicked = event.target.id;
    });

    var pinTable = document.getElementById("pintable");

    pinTable.addEventListener("click", function () {


        pinClicked = event.target.id;
        var rowClicked = event.target.parentElement.id;

        if (gameState.getPlayerType() == "B") {
            if (colorClicked != null && rowClicked == "row" + String(7 - gameState.getguessAmount())) {
                var pin = document.getElementById(pinClicked);
                if (pin != null) {
                    setColor(pin, colorClicked);
                    showPin(pin);
                }
                if (isRowFull(8 - gameState.getguessAmount())) {
                    document.getElementById("submitbutton").style.display = "inline-block";
                }
            }
        } else if (gameState.getPlayerType() == "A"); {
            if (!colorCodeSet) {
                if (colorClicked != null) {
                    var pin = document.getElementById(pinClicked);
                    if (pin != null) {
                        setColor(pin, colorClicked);
                        showPin(pin);
                    }
                    if (isRowFull(1)) {
                        document.getElementById("submitbutton").style.display = "inline-block";

                    }

                }
            }

        }

    });

    // Submitbutton 

    var submitButton = document.getElementById("submitbutton");

    submitButton.addEventListener("click", function () {
        if (bothPlayersJoined && gameState.getPlayerType() == "B") {
            var activeRow = 8 - gameState.getguessAmount();
            var guess = getRowColorCodeAndAddGuess(activeRow);
            socket.send("codeGuess" + JSON.stringify(guess));
            gameState.addGuess(guess);
            submitButton.style.display = "none";
            showGuesses();
            showIndications();
        } else if (gameState.getPlayerType() == "A") {
            if (bothPlayersJoined) {
                var colorCode = getCodeToBeGuessed();
                socket.send("colorCode" + JSON.stringify(colorCode));
                colorCodeSet = true;
                removeRowOne();
                renderGuessingBoard();
                document.getElementById("submitbutton").style.display = "none";
            } else {
                socket.send("waitingforplayerB");
                alert("Still waiting for opponent");
            }
        } else {
            alert("Opponent has not yet set the color code");
        }
    });

    submitButton.addEventListener("mouseover", function () {
        submitButton.style.backgroundColor = "rgba(103, 114, 122, 0.8)";
        submitButton.style.marginTop = "14px";
    });

    submitButton.addEventListener("mouseout", function () {
        submitButton.style.backgroundColor = "#67727A";
        submitButton.style.marginTop = "15px";
    });

    var menuel1 = document.getElementById("el1");
    var menuel2 = document.getElementById("el2");
    var resignButton = document.getElementById("resign");

    menuel1.addEventListener("click", function () {
        if (menuel1.src.slice(-10) == "Resign.png") {

        }
        menuel1.src = "images/Resign.png";
        menuel2.src = "images/FullScreenMode.png";
        resignButton.style.display = "inline-block";

        setTimeout(function () {
            menuel1.src = "images/MenuSymbol.png";
            menuel2.removeAttribute("src");
            resignButton.style.display = "none";
        }, 5000);
    });

    menuel2.addEventListener("click", function () {
        openFullscreen();
    });

    resignButton.addEventListener("click", function () {
        //return to home with game information popup#
        location.href = "splash.html";
    });


}



$(document).ready(gameSetup);

var showGuesses = function () {
    var index = 0;
    var rowcount = 8;
    while (gameState.getGuess(index) != null) {
        var colorCode = gameState.getGuess(index);


        var pin1 = document.getElementById("pin" + String(4 * rowcount - 3));
        var pin2 = document.getElementById("pin" + String(4 * rowcount - 2));
        var pin3 = document.getElementById("pin" + String(4 * rowcount - 1));
        var pin4 = document.getElementById("pin" + String(4 * rowcount));

        setColor(pin1, colorCode.c1);
        setColor(pin2, colorCode.c2);
        setColor(pin3, colorCode.c3);
        setColor(pin4, colorCode.c4);

        showPin(pin1);
        showPin(pin2);
        showPin(pin3);
        showPin(pin4);

        index++;
        rowcount--;
    }
};



var showPin = function (element) {
    element.style.border = "0px";
    element.style.width = "50px";
    element.style.height = "50px";
    element.style.boxShadow = "0px 2px rgba(0, 0, 0, 0.6)";
}

var setColor = function (element, color) {
    element.style.backgroundColor = "var(--" + color + ")";
}

var getColor = function (element) {
    var colorString = element.style.backgroundColor;
    return colorString.slice(6, -1);
}


var showIndications = function () {
    var index = 0;
    var rowcount = 8;

    while (gameState.getIndications(index) != null) {
        var numBlack = gameState.getIndications(index).black;
        var numWhite = gameState.getIndications(index).white;

        for (var i = 0; i < numBlack; i++) {
            var black = document.getElementById("indicator" + String(4 * rowcount - (3 - i)));
            black.style.backgroundColor = "#67727A";
            black.style.visibility = "visible";
        }

        for (var i = 0; i < numWhite; i++) {
            var white = document.getElementById("indicator" + String(4 * rowcount - (3 - (i + numBlack))));
            white.style.visibility = "visible";
        }


        index++;
        rowcount--;
    }
}

var isRowFull = function (activeRow) {
    var coloredPins = 0;
    for (var i = 0; i < 4; i++) {
        var pin = document.getElementById("pin" + String(4 * activeRow - i));
        if (pin.style.backgroundColor != "") {
            coloredPins++;
        }
    }
    return (coloredPins == 4)
}


var getRowColorCodeAndAddGuess = function (activeRow) {
    var pin1 = document.getElementById("pin" + String(4 * activeRow - 3));
    var pin2 = document.getElementById("pin" + String(4 * activeRow - 2));
    var pin3 = document.getElementById("pin" + String(4 * activeRow - 1));
    var pin4 = document.getElementById("pin" + String(4 * activeRow));

    return { c1: getColor(pin1), c2: getColor(pin2), c3: getColor(pin3), c4: getColor(pin4) };
}

var getCodeToBeGuessed = function () {
    var pin1 = document.getElementById("pin1");
    var pin2 = document.getElementById("pin2");
    var pin3 = document.getElementById("pin3");
    var pin4 = document.getElementById("pin4");

    return { c1: getColor(pin1), c2: getColor(pin2), c3: getColor(pin3), c4: getColor(pin4) };
}

function openFullscreen() {
    var screen = document.getElementById("screen");

    if (screen.requestFullscreen) {
        screen.requestFullscreen();
    } else if (screen.mozRequestFullScreen) { /* Firefox */
        screen.mozRequestFullScreen();
    } else if (screen.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        screen.webkitRequestFullscreen();
    } else if (screen.msRequestFullscreen) { /* IE/Edge */
        screen.msRequestFullscreen();
    }
}
function renderGuessingBoard() {

    var space = 1;
    for (var r = 0; r < 8; r++) {
        var boardcell = "";
        var indicatorcell = "";

        for (var c = 0; c < 4; c++) {
            boardcell += "<td id='pin" + space + "' data-pos='" + space + "'></td>";
            indicatorcell += "<td id='indicator" + space + "' data-pos='" + space + "'></td>";
            space++;
        }

        $("#pintable").append("<tr id='row" + r + "'>" + boardcell + "</tr>");
        $("#indicatortable").append("<tr id='row" + r + "'>" + indicatorcell + "</tr>");
    }
    document.getElementById("board").style.height = "640px";
}

function renderCodeToBeGuessedBoard() {
    var space = 1;

    var boardcell = "";
    var indicatorcell = "";

    for (var c = 0; c < 4; c++) {
        boardcell += "<td id='pin" + space + "' data-pos='" + space + "'></td>";
        indicatorcell += "<td id='indicator" + space + "' data-pos='" + space + "'></td>";
        space++;
    }

    $("#pintable").append("<tr id='row" + 1 + "'>" + boardcell + "</tr>");
    $("#indicatortable").append("<tr id='irow" + 1 + "'>" + indicatorcell + "</tr>");
    document.getElementById("board").style.height = "80px"
}

function removeRowOne() {
    var elem = document.getElementById("row1");
    elem.parentNode.removeChild(elem);
    var ielem = document.getElementById("irow1");
    ielem.parentNode.removeChild(ielem);
    return false;
}