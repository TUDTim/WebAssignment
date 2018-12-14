var uiactions = function() {


    var playButton = document.getElementById("playbutton");

    playButton.addEventListener("click", function() {
        location.href="game.html";
    });
};

$(document).ready(uiactions);