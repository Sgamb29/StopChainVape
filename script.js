
let timerTime = 1000 * 30;
let output = document.getElementById("output");
let firstPress = true;

let disabledButton = false;

let draws = 1;

let audioEnabled = true;
const audioFile = "assets/timer-simple4.mp3"
let audioToggle = document.getElementById("audioToggle");

audioToggle.addEventListener("click", (e) => {
    audioEnabled = audioToggle.checked ? true : false;
})

let timerId = null;

async function startTime() {
    if (disabledButton) {
        output.innerText = "Disable loop to use the button";
        return
    }
    if (firstPress) {
        firstPress = false;
        let player = new Audio(audioFile);

        document.getElementById("timeChooser").disabled = true;


        setTimerTime();
        startCountdown();
        output.innerText = `Wait and breathe. Total Draws: ${draws}`;
        timerId = setTimeout(() => {
            if (disabledButton) {
                return;
            }
            if (audioEnabled) {
                player.play();
            }
            draws += 1;
            output.innerText = "Inhale and then press the button.";
            firstPress = true;
            clearInterval(countdownId);
            document.getElementById("timeChooser").disabled = false;
        }, timerTime);
    };
      }

function refresh() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    clearInterval(countdownId);
    loopInfo.hidden = true;
    mainBtn.className = ogClass;
    disabledButton = false;
    draws = 1;
    firstPress = true;
    output.innerText = "Inhale and then press the button.";

    countdownTime = 0;
    document.getElementById("countdownOutput").innerText = "";
    document.getElementById("timeChooser").disabled = false;



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
        let player = new Audio(audioFile);
        draws = 1;
        loopInfo.hidden = false;
        disabledButton = true;
        mainBtn.className += " blue";
        output.innerText = "";
        startCountdown();

        document.getElementById("timeChooser").disabled = true;

        intervalId = setInterval(() => {
            if (audioEnabled) {
                player.play();
            }
            mainBtn.className = mainBtn.className === blueClass ? greenClass : blueClass;
            draws += 1;
            output.innerText = `Total Draws: ${draws}`;
            clearInterval(countdownId);
            startCountdown();
        }, timerTime);
    } else {
        clearInterval(intervalId);
        clearInterval(countdownId);
        loopInfo.hidden = true;
        mainBtn.className = ogClass;
        disabledButton = false;
        draws = 1;

        document.getElementById("timeChooser").disabled = false;
        document.getElementById("countdownOutput").innerText = "";

    }
})

function checkValid(txt) {
    const valid = "0123456789";
    let hit = false;
    let isValid = true;
    if (txt.length < 1 | txt.length > 3) {
        return !isValid;
    }
    for (let i = 0; i < txt.length; i++) {
        for (let x = 0; x < valid.length; x++) {
            if (txt[i] == valid[x]) {
                hit = true;
            }
        }
        if (!hit) {
            return !isValid;
        }
    }
    console.log("ran");
    return isValid;
}

function setTimerTime() {
    const value = document.getElementById("timeChooser").value;

    if (parseInt(value) !== NaN) {
        timerTime = parseInt(value) * 1000;
        if (timerTime < 4000 | !checkValid(value.toString())) {
            timerTime = 4000;
            document.getElementById("timeChooser").value = "4";
            document.getElementById("hint").innerText = "* Max 3 digit number greater than or equal to 4."
        }
        const tstr = timerTime / 1000;
        document.getElementById("titleText").innerText = tstr.toString() + " Second Timer To Help You Pace Yourself";

    }
}


let countdownTime = 0;
let countdownId = null;

function startCountdown() {
    document.getElementById("hint").innerText = "";

    countdownTime = timerTime / 1000;
    document.getElementById("countdownOutput").innerText = countdownTime;
    countdownId = setInterval(() => {
        countdownTime -= 1;
        document.getElementById("countdownOutput").innerText = countdownTime;
    }, 1000);
}