var gameState = (function() {
    var guessAmount = 0;
    var guesses = [];
    var colorCode = {c1:null,c2:null,c3:null,c4:null};

    return {
        getColorCode : function(){
            return colorCode;
        },
        setColorCode : function(color1, color2, color3, color4){
            colorCode.c1 = color1;
            colorCode.c2 = color2;
            colorCode.c3 = color3;
            colorCode.c4 = color4;
        },
        getguessAmount : function(){
            return guessAmount;
        },
        addGuess : function(color1, color2, color3, color4){
            guesses[guessAmount] = {c1:color1,c2:color2,c3:color3,c4:color4};
            guessAmount++;
        },
        getGuess : function(guessNumber){
            return guesses[guessNumber];
        }
        
    }
})();



