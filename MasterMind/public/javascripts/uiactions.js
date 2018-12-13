var uiactions = function() {


    var playButton = document.getElementById("playbutton");

    playButton.addEventListener("click", function() {
        var userinput = document.getElementById("usernameinput");
        userinput.style.display = "none";
        playButton.style.marginTop = "120px";
        playButton.style.height = "67px";
        playButton.style.paddingLeft = "10px";
        playButton.style.paddingRight = "10px";

        playButton.style.paddingTop = "220px";
        playButton.innerHTML = "<div id='waiting'>Waiting for other player</div>";
        // playButton.style.backgroundColor = "var(--backgroundcolor)"


        var id = setInterval(frame, 10);

        // function frame() {
        //     if (pos == 120)
        //     playButton.style.marginTop = "120px";

        // }
    });


    // margin top: 82+120+125 ----> 120px


}

$(document).ready(uiactions);