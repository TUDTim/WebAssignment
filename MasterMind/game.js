var game = (function(gameID, playerA, playerB) {
    let playerA = null;
    let playerB = null;
    let id = gameID;
    var codeA = null;
    var codeB = null;
    var gameResult = null;
    

    return {
        getPlayerA : function() {
            return this.playerA;
        },
        getPlayerB : function() {
            return this.playerB;
        },
        getGameID : function() {
            return this.gameID;
        },
        compareToCodeA : function(guess) {
            return codeA;
        },
        compareToCodeB : function(guess) {
            return codeB;
        },
        setCodeA : function(color1, color2, color3, color4) {
            codeA = {c1: color1, c2: color2, c3: color3, c4: color4};
        },
        setCodeB : function(color1, color2, color3, color4) {
            codeB = {c1: color1, c2: color2, c3: color3, c4: color4};
        }
     }



    
})();