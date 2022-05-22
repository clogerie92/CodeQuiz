var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices-list");
var questionResult = document.getElementById("question-result");
var submitBtn = document.getElementById("submit-btn");
var time = 90;
var timeInterval;
var intervalID;
var questionsIndex = 0;
var userScore = 0;
var questions = [
    {
        question: "Inside which HTML tag do you put the JavaScript?",
        choices: ["<html>", "<js>", "<header>", "<script>"],
        answer: "<script>"
    },
    {
        question: "Which of the following is an ID selector?",
        choices: [".", "*", "#", "$"],
        answer: "#"
    },
    {
        question: "The condidition of an if/else statement is enclosed within____.",
        choices: ["parentheses", "curlybrace", "square brackets", "quotation marks"],
        answer: "parentheses"
    },
    {
        question: "Which of the following is a class selector?",
        choices: [".", "$", "<class>", "#"],
        answer: "."
    },
    {
        question: "What is used to store key/value pairs?",
        choices: ["arrays", "objects", "functions", "for loops"],
        answer: "objects"
    },
   ];

   function renderQuestion() {
    questionsEl.textContent = questions[questionsIndex].question;
   }

function startGame() {
    timeInterval = setInterval(function() {
        timerEl.textContent = "Time remaining: " + time;
        time--;
        if (time === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
    console.log("Start button clicked!");
    renderQuestion();    
}
startBtn.addEventListener("click", startGame);



