var gameState = (function () {
    var guessAmount = 0;
    var guesses = [];
    var indications = [];
    var playerType = null;

    return {
        getguessAmount: function () {
            return guessAmount;
        },
        addGuess: function (guess) {
            guesses[guessAmount] = guess;
            guessAmount++;
        },
        getGuess: function (guessNumber) {
            return guesses[guessNumber];
        },
        getIndications: function (indicationNumber) {
            return indications[indicationNumber];
        }, 
        addIndication: function (indication) {
            indications[guessAmount - 1] = indication;
        },
        setPlayerType: function (type) {
            playerType = type;
        },
        getPlayerType: function() {
            return playerType;
        }
    };
})();


