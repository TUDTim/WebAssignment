var gameState = (function () {
    var guessAmount = 0;
    var guesses = [];
    var colorCode = { c1: "navy", c2: "green", c3: "yellow", c4: "orange" };
    var indications = []


    var addIndication = function (guess) {
        var g = guess;
        var cc = colorCode;

        var numblack = 0;
        var numwhite = 0;

// Count for black

        for (var i = 0; i < 4; i++) {
            console.log(Object.entries(g)[i][1] + " " + Object.entries(cc)[i][1]);
            if (Object.entries(g)[i][1] == Object.entries(cc)[i][1]) {
                console.log("point reached");
                numblack++;
                Object.entries(g)[i][1] = null;
                Object.entries(cc)[i][1] = null;
            }
        }
        console.log(numblack);
// Count for white
        for (var gi = 0; gi < 4; gi++) {
            var guessColor = Object.entries(g)[gi][1];
            if (guessColor != null) {
                for (var cci = 0; cci < 4; cci++) {
                    var ccColor = Object.entries(cc)[cci][1];
                    if (gi != cci) {
                        if (guessColor == ccColor){
                            numwhite++;
                        }
                    }
                    Object.entries(g)[gi][1] = null;
                    Object.entries(cc)[cci][1] = null;
                }
            }
        }
        return {black: numblack, white: numwhite};
    }


    return {
        getColorCode: function () {
            return colorCode;
        },
        setColorCode: function (color1, color2, color3, color4) {
            colorCode.c1 = color1;
            colorCode.c2 = color2;
            colorCode.c3 = color3;
            colorCode.c4 = color4;
        },
        getguessAmount: function () {
            return guessAmount;
        },
        addGuess: function (color1, color2, color3, color4) {
            guess = { c1: color1, c2: color2, c3: color3, c4: color4 }
            guesses[guessAmount] = guess;
            indications[guessAmount] = addIndication(guess);
            guessAmount++;
        },
        getGuess: function (guessNumber) {
            return guesses[guessNumber];
        },
        getIndication: function (indicationNumber) {
            return indications[indicationNumber];
        }
    };
})();



