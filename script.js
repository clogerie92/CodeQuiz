var highScores = JSON.parse(localStorage.getItem("score")) || [];
var startBtn = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var choicesListEl = document.getElementById("choices-list");
var questionResultEl = document.getElementById("question-result");
var questionsDiv = document.getElementById("questions-div");
var userScoreDiv = document.getElementById("user-score");
var submitBtn = document.getElementById("submit-btn");
var userScoreEl = document.getElementById("score-div");
var userInitialsEl = document.getElementById("user-initials");
var scoresList = document.getElementById("scores-list");
var highScoresPage = document.getElementById("high-scores-page");
var highScoreDiv = document.getElementById("high-scores");
var time = 90;
var timeInterval;
// var intervalID;
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
    clearInterval(timeInterval);
    timerEl.textContent = "";
    // highScoreEl.textContent = "Quiz finished! You scored: " + userScore + "points!";
    console.log(userScore);
    // renderHighScores();
    questionsDiv.classList.add("hide");
    userScoreDiv.classList.remove("hide");
    
}
   
function renderQuestion() {
    if (time === 0) {
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

function finishQuiz() {
    if (time === 0) {
        endQuiz();
    }
}

function renderHighScores() {
    // var highScores = [];
    var initials = userInitialsEl.value.trim();
    var user = {
        initials: initials,
        score: userScore
    }
    // var userInitials = user.initials;
    // var userScore = user.score;

    userScoreEl.textContent = user.initials + " you scored " + user.score + " points.";

    
   console.log(highScores);

       highScores.push(user);
       highScores.sort(function(a, b) {
           return b.score - a.score;
       });

  localStorage.setItem("score", JSON.stringify(highScores));
}
submitBtn.addEventListener("click", renderHighScores);

function renderNextQuestion() {
    questionsIndex++;
    console.log(questionsIndex);
    if (questionsIndex >= questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function checkAnswer(event) {
    // clearInterval(timeInterval);

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

function showHighScores () {
    highScoreDiv.classList.remove("hide");
    for (var i = 0; i < highScores.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent= JSON.stringify(highScores[i]);
        scoresList.append(liEl);
    }
}
highScoresPage.addEventListener("click", showHighScores);

function startQuiz() {
    time = 90;
    questionsIndex = 0;
    userScore = 0;
    timeInterval = setInterval(function() {
        timerEl.textContent = "Time remaining: " + time;
        time--;
        if (time === 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
    questionsDiv.classList.remove("hide");

    console.log("Start button clicked!");
    userScoreDiv.classList.add("hide");
    highScoreDiv.classList.add("hide");
    renderQuestion();    
}
startBtn.addEventListener("click", startQuiz);



