var gameState = (function () {
    var guessAmount = 0;
    var guesses = [];
    var indications = [];
    var playerType = null;

    return {
        getguessAmount: function () {
            return guessAmount;
        },
        addGuess: function (color1, color2, color3, color4) {
            guess = { c1: color1, c2: color2, c3: color3, c4: color4 }
            guesses[guessAmount] = guess;
            // indications[guessAmount] = game.compareToA(guess);
            guessAmount++;
        },
        getGuess: function (guessNumber) {
            return guesses[guessNumber];
        },
        getIndication: function (indicationNumber) {
            return indications[indicationNumber];
        }, 
        setPlayerType: function (type) {
            playerType = type;
        },
        getPlayerType: function() {
            return playerType;
        }
    };
})();


