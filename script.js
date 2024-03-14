
let thirtysec = 1000 * 30;
let output = document.getElementById("output");
let firstPress = true;

let draws = 0;


async function startTime() {
    if (firstPress) {
        firstPress = false;
        draws += 1;
        output.innerText = `Wait and breathe. Total Draws: ${draws}`;
        setTimeout(() => {
            output.innerText = "Inhale and then press the button.";
            firstPress = true;
            console.log("ran");
        }, thirtysec);
    };
      }

function refresh() {
    window.location.reload();
}
