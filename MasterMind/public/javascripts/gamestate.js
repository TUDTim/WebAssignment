var gameState = (function () {
    var guessAmount = 0;
    var guesses = [];
    var colorCode = { c1: "navy", c2: "green", c3: "yellow", c4: "orange" };
    var indications = []


    // var setIndications = function () {
    //     var numblack;
    //     var numwhite;
    //     for (var i = 0; i < guesses.length; i++) {
    //         var ccg = guesses[i];
    //         var cc = colorCode
    //         console.log(Object.entries(ccg));
    //         for (var i = 0; i < 4; i++) {
    //             if (Object.entries(ccg)[i][1] == Object.entries(cc)[i][1]) {
    //                 Object.entries(ccg)[i][1] = "";
    //                 numblack++
    //             }
    //         }
    //         for (var iccg = 0; iccg < 4; iccg++) {
    //             for (var icc = 0; icc < 4; icc++) {
    //                 if (iccg != icc) {
    //                     if (Object.entries(ccg)[iccg][1] == Object.entries(cc)[icc][1]) {
    //                         Object.entries(ccg)[iccg][1] = "";
    //                         numwhite++
    //                     }
    //                 }
    //             }
    //         }
    //         indications[i] = {black: numblack,white: numwhite};

    //     };
    // };



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
            guesses[guessAmount] = { c1: color1, c2: color2, c3: color3, c4: color4 };
            guessAmount++;
        },
        getGuess: function (guessNumber) {
            return guesses[guessNumber];
        },
        addIndication: function (numblack, numwhite) {
            indications[guessAmount - 1] = {black: numblack, white: numwhite };
        },
        getIndication: function (indicationNumber) {
            return indications[indicationNumber];
        }
    };
})();



