var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var questionsDiv = document.getElementById("question");
var submitBtn = document.getElementById("submit-btn");
var time = 90;
var timeInterval;

function startGame() {
    timeInterval = setInterval(function() {
        timerEl.textContent = "Time remaining: " + time;
        time--;
        if (time === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
    console.log("Start button clicked!");
}

startBtn.addEventListener("click", startGame);

