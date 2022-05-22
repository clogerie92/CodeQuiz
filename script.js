var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var choicesListEl = document.getElementById("choices-list");
var questionResultEl = document.getElementById("question-result");
var submitBtn = document.getElementById("submit-btn");
var highScoreEl = document.getElementById("high-score-div");
var userInitials = document.getElementById("user-initials");
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

   function endQuiz() {
    clearInterval(intervalID);
    timerEl.textContent = "";
    // highScoreEl.textContent = "Quiz finished! You scored: " + userScore + "points!";
    console.log(userScore);
}
   
function renderQuestion() {
    if (time === 0 || questionsIndex === questions.length) {
        endQuiz();
    }
    questionsEl.textContent = questions[questionsIndex].question;
    choicesListEl.textContent = "";
    questionResultEl.textContent = "";

    var choices = questions[questionsIndex].choices;

    for (var i = 0; i < choices.length; i++) {
        var choicesList = document.createElement("li");
        choicesList.textContent = choices[i];
        choicesListEl.append(choicesList);
    }
}

// function finishQuiz() {
//     if (time === 0) {
//         endQuiz();
//     }
// }

function renderHighScores() {
    var highScores = [];
    var initials = userInitials.value.trim();
    var user = {
        initials: initials,
        score: userScore
    }

    highScores.push(user);
    highScores.sort(function(a, b) {
        return b.highScores - a.highScores;
    });
    localStorage.setItem("score", JSON.stringify(highScores));
    var usersHighScore = JSON.parse(localStorage.getItem("score"));
    console.log(usersHighScore);

    highScoreEl.textContent = initials + " you scored " + usersHighScore + "points.";
}
submitBtn.addEventListener("click", renderHighScores);

function renderNextQuestion() {
    questionsIndex++;
    if (questionsIndex === questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function checkAnswer(event) {
    clearInterval(intervalID);

    var target = event.target;
    if (target.matches("li")) {
        var usersAnswer = target.textContent;
        if (usersAnswer === questions[questionsIndex].answer) {
            questionResultEl.textContent = "Correct!";
            userScore++;
        } else {
            questionResultEl.textContent = "Wrong!";
            time-=2;
        }
    }
    setTimeout(renderNextQuestion, 500);
}
choicesListEl.addEventListener("click", checkAnswer);

function startQuiz() {
    timeInterval = setInterval(function() {
        timerEl.textContent = "Time remaining: " + time;
        time--;
        if (time === 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
    console.log("Start button clicked!");
    renderQuestion();    
}
startBtn.addEventListener("click", startQuiz);



