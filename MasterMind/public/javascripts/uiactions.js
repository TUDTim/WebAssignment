var uiactions = function() {


    var playButton = document.getElementById("playbutton");

    playButton.addEventListener("click", function() {
        location.href="game.html";
        var userinput = document.getElementById("usernameinput");
        userinput.style.display = "none";
        playButton.style.marginTop = "120px";
        playButton.style.height = "217px";
        playButton.style.paddingLeft = "10px";
        playButton.style.paddingRight = "10px";
        playButton.style.boxShadow = "0 0 0 1600px rgba(0,0,0,0.65)";

        playButton.style.paddingTop = "70px";
        var popup = "<img src='images/WaitingSymbol.png'>";
        popup += "<div id='waiting'>Waiting for other player</div>";
        console.log(popup);
        playButton.innerHTML = popup;
        playButton.style.backgroundColor = "var(--backgroundcolor)"


        document.getElementById("howtoplay").style.display = "none";

        // var id = setInterval(frame, 10);

        // function frame() {
        //     if (pos == 120)
        //     playButton.style.marginTop = "120px";

        // }
    });


    // margin top: 82+120+125 ----> 120px


}

$(document).ready(uiactions);