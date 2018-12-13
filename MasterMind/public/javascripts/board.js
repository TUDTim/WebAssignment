var gameSetup = function () {

    var space = 1;
    var colorClicked;
    var pinClicked;

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

    showGuesses();
    showIndications();


    var colorTable = document.getElementById("colortable");

    colorTable.addEventListener("click", function () {
        colorClicked = event.target.id;
    });

    var pinTable = document.getElementById("pintable");

    pinTable.addEventListener("click", function () {
        pinClicked = event.target.id;
        var rowClicked = event.target.parentElement.id;

        if (colorClicked != null && rowClicked == "row" + String(7 - gameState.getguessAmount())) {
            var pin = document.getElementById(pinClicked);
            if (pin != null) {
                setColor(pin, colorClicked);
                showPin(pin);
            }
        }
        
        if (isRowFull(8 - gameState.getguessAmount())) {
            document.getElementById("submitbutton").style.display = "inline-block";
        }
    });

    var submitButton = document.getElementById("submitbutton");

    submitButton.addEventListener("click", function () {
        var activeRow = 8 - gameState.getguessAmount();
        var guess = getRowColorCodeAndAddGuess(activeRow);
        submitButton.style.display = "none";
        showGuesses();
        showIndications();
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

    menuel1.addEventListener("click", function() {
        if (menuel1.src.slice(-10) == "Resign.png") {
            
        }
        menuel1.src = "images/Resign.png";
        menuel2.src = "images/FullScreenMode.png";
        resignButton.style.display = "inline-block";

        setTimeout(function(){
            menuel1.src ="images/MenuSymbol.png";
            menuel2.removeAttribute("src");
            resignButton.style.display = "none";
        }, 5000);
    });

    menuel2.addEventListener("click", function() {
        openFullscreen();
    });

    resignButton.addEventListener("click", function() {
        //return to home with game information popup#
        location.href="splash.html";
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

    while (gameState.getIndication(index) != null) {
        var numBlack = gameState.getIndication(index).black;
        var numWhite = gameState.getIndication(index).white;

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

    gameState.addGuess(getColor(pin1), getColor(pin2), getColor(pin3), getColor(pin4));
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