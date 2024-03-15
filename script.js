
let thirtysec = 1000 * 30;
let output = document.getElementById("output");
let firstPress = true;

let disabledButton = false;

let draws = 0;

let audioEnabled = true;
const audioFile = "assets/duck-sound.mp3"
let audioToggle = document.getElementById("audioToggle");

audioToggle.addEventListener("click", (e) => {
    audioEnabled = audioToggle.checked ? true : false;
})

async function startTime() {
    if (disabledButton) {
        output.innerText = "Disable loop to use the button";
        return
    }
    if (firstPress) {
        firstPress = false;
        draws += 1;
        output.innerText = `Wait and breathe. Total Draws: ${draws}`;
        setTimeout(() => {
            if (disabledButton) {
                return;
            }
            if (audioEnabled) {
                let player = new Audio(audioFile);
                player.play();
            }
            output.innerText = "Inhale and then press the button.";
            firstPress = true;
            console.log("ran");
        }, thirtysec);
    };
      }

function refresh() {
    window.location.reload();
}

let loopToggle = document.getElementById("loopToggle");
let loopInfo = document.getElementById("loopInfo");
let mainBtn = document.getElementById("mainBtn");
let ogClass = mainBtn.className;
let blueClass = ogClass + " blue";
let greenClass = ogClass + " green";   
let intervalId;

loopToggle.addEventListener("click", (e) => {

    if (loopToggle.checked) {
        draws = 0;
        loopInfo.hidden = false;
        disabledButton = true;
        mainBtn.className += " blue";
        output.innerText = "";
        intervalId = setInterval(() => {
            if (audioEnabled) {
                let player = new Audio(audioFile);
                player.play();
            }
            mainBtn.className = mainBtn.className === blueClass ? greenClass : blueClass;
            draws += 1;
            output.innerText = `Total Draws: ${draws}`;
        }, thirtysec + 3000);
    } else {
        clearInterval(intervalId);
        loopInfo.hidden = true;
        mainBtn.className = ogClass;
        disabledButton = false;
        draws = 0;
    }
})

async function loop() {

}
