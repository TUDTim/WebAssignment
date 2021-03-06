var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.codeA = null;
    this.codeB = null;
    this.guesses = [];
    this.indications = [];
    this.guessAmount = 0;
    this.gameState = "0";

}
game.prototype.getIndication = function (guess, colorCode) {
    var g = JSON.parse(JSON.stringify(guess));
    var cc = JSON.parse(JSON.stringify(colorCode));
    
    var numblack = 0;
    var numwhite = 0;

    // Count for black
    for (var i = 0; i < 4; i++) {
        if (Object.entries(g)[i][1] == Object.entries(cc)[i][1]) {
            numblack++;
            Object.values(g)[i][1] = "";
            Object.values(cc)[i][1] = "";
            g['c'+ (i+1)] = null; 
            cc['c'+ (i+1)] = null;
        }
    }
    // Count for white
    for (var gi = 0; gi < 4; gi++) {
        var guessColor = Object.entries(g)[gi][1];
        if (guessColor != null) {
            for (var cci = 0; cci < 4; cci++) {
                var ccColor = Object.entries(cc)[cci][1];
                if (gi != cci) {
                    if (guessColor == ccColor) {
                        numwhite++;
                        g['c'+ (gi+1)] = null; 
                        cc['c'+ (cci+1)] = null;                      }
                }
            }
        }
    }
    return { black: numblack, white: numwhite };
};
game.prototype.getPlayerA = function() {
    return this.playerA;
};
game.prototype.addPlayer = function(name) {
    if (this.gameState == "0") {
        this.playerA = name;
        this.setGameState("1");
        return "A";
    } else if (this.gameState = "1") {
        this.playerB = name;
        this.setGameState("full");
        return "B";
    } 
};
game.prototype.setGameState = function(state) {
    this.gameState = state;
};
game.prototype.isGameFull = function() {
    return (this.gameState == "full")
};

game.prototype.getPlayerB = function() {
    return this.playerB;
};



game.prototype.getGameID = function() {
    return this.gameID;
};
game.prototype.setCodeA = function(codeSent) {
    this.codeA = codeSent;
};
game.prototype.getPlayerACode = function() {
    this.codeA;
}
game.prototype.setCodeB = function(color1, color2, color3, color4) {
    this.codeB = {c1: color1, c2: color2, c3: color3, c4: color4};
};
game.prototype.getGlobalGameState = function() {
    return this.globalGameState;
};
game.prototype.setPlayerA = function(name) {
    this.playerA = name;
};
game.prototype.setPlayerB = function(name) {
    this.playerB = name;
};
game.prototype.isColorCodeSet = function() {
    return (this.codeA != null);
}


module.exports = game;