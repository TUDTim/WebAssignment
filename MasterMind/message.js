(function(exports){

    /* 
     * Client to server: game is complete, determine winner
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";             
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    /*
     * Server to client: abort game (if second player exited the game) 
     */
    exports.O_GAME_ABORTED = {                          
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /*
     * Server to client: choose target pin
     */
    exports.O_CHOOSE = { type: "CHOOSE-WORD" };
    exports.S_CHOOSE = JSON.stringify(exports.O_CHOOSE);

    /*
     * Server to client: set as player A 
     */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {                            
        type: exports.T_PLAYER_TYPE,
        data: "A"
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);

    /* 
     * Server to client: set as player B 
     */
    exports.O_PLAYER_B = {                            
        type: exports.T_PLAYER_TYPE,
        data: "B"
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

    /* 
     * Player A to server OR server to Player B: this is the target pin 
     */
    exports.T_TARGET_PIN = "SET-TARGET-PIN";
    exports.O_TARGET_PIN = {                         
        type: exports.T_TARGET_PIN,
        data: null
    };

    /* 
     * Player B to server OR server to Player A: guessed pin 
     */
    exports.T_MAKE_A_GUESS = "MAKE-A-GUESS";         
    exports.O_MAKE_A_GUESS = {
        type: exports.T_MAKE_A_GUESS,
        data: null
    };

    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_OVER = "GAME-OVER";              
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };


}(typeof exports === "undefined" ? this.Messages = {} : exports));
