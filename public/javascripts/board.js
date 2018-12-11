var gameSetup = function () {

    var space = 1;
    var colorClicked;
    var pinClicked;

    gameState.addGuess("navy", "red", "green", "purple");

    gameState.addGuess("navy", "red", "green", "teal");

    gameState.addGuess("green", "red", "green", "purple");

    gameState.addGuess("blue", "red", "green", "purple");

    for (var r = 0; r < 8; r++) {
        var boardcell = "";
        var indicatorcell = "";

        for (var c = 0; c < 4; c++) {
            boardcell += "<td id='pin" + space + "' data-pos='" + space + "'></td>";
            indicatorcell += "<td data-pos='" + space + "'></td>";
            space++;
        }

        $("#pintable").append("<tr id='row" + r + "'>" + boardcell + "</tr>");
        $("#indicatortable").append("<tr id='row" + r + "'>" + indicatorcell + "</tr>");
    }


    showGuesses();



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
    });

    var submitButton = document.getElementById("submitbutton");

    submitButton.addEventListener("click", function () {

    });

    submitButton.addEventListener("mouseover", function () {
        submitButton.style.backgroundColor = "rgba(103, 114, 122, 0.8)";
        submitButton.style.marginTop = "14px";
    });

    submitButton.addEventListener("mouseout", function () {
        submitButton.style.backgroundColor = "#67727A";
        submitButton.style.marginTop = "15px";
    })


}



$(document).ready(gameSetup);

var showGuesses = function () {
    var index = 0;
    var rowcount = 8;
    while (gameState.getGuess(index) != null) {
        var colorCode = gameState.getGuess(index);
        for (var c = 0; c < 4; c++) {

        }
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