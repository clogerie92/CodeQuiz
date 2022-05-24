// global variables
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
var questionsIndex = 0;
var userScore = 0;
var questions = [
    {
        question: "1: Inside which HTML tag do you put the JavaScript?",
        choices: ["<html>", "<js>", "<header>", "<script>"],
        answer: "<script>"
    },
    {
        question: "2: Which of the following is an ID selector?",
        choices: [".", "*", "#", "$"],
        answer: "#"
    },
    {
        question: "3: The condidition of an if/else statement is enclosed within____.",
        choices: ["parentheses", "curlybrace", "square brackets", "quotation marks"],
        answer: "parentheses"
    },
    {
        question: "4: Which of the following is a class selector?",
        choices: [".", "$", "<class>", "#"],
        answer: "."
    },
    {
        question: "5: What is used to store key/value pairs?",
        choices: ["arrays", "objects", "functions", "for loops"],
        answer: "objects"
    },
   ];

// function to start the quiz and timer
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

// function to render questions
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

// function to check the answer
function checkAnswer(event) {
    // stores where the user clicked in target varibale
    var target = event.target;
    // checks if the user clicked on the right answer
    if (target.matches("li")) {
        var usersAnswer = target.textContent;
        if (usersAnswer === questions[questionsIndex].answer) {
            questionResultEl.textContent = "Correct!";
            userScore++; 
        }
        // subtract 2s from time if answer is wrong 
        else {
            questionResultEl.textContent = "Wrong!";
            time-=2;
        }
    }
    setTimeout(renderNextQuestion, 500);
}

// function to render the next question
function renderNextQuestion() {
    questionsIndex++;
    console.log(questionsIndex);
    // stops the quiz if there are no more questions, otherwise render the next question
    if (questionsIndex >= questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

// function to render the user's score
function showUserScore() {
    var initials = userInitialsEl.value.trim();
    // user object
    var user = {
        initials: initials,
        score: userScore
    }
    userScoreEl.textContent = user.initials + " you scored " + user.score + " points.";
    
   console.log(highScores);
       // sorts scores 
       highScores.push(user);
       highScores.sort(function(a, b) {
           return b.score - a.score;
       });
  localStorage.setItem("score", JSON.stringify(highScores));
}

// function to render all the users and their scores
function showHighScores () {
    highScoreDiv.classList.remove("hide");
    // loops through highscores and renders a list with the user's initials and scores
    for (var i = 0; i < highScores.length; i++) {
        var liEl = document.createElement("li");
        console.log(typeof highScores);
        console.log(highScores);

        liEl.textContent= "User: " + highScores[i].initials + " " + "Score: " +  highScores[i].score;
        scoresList.append(liEl);
        console.log(scoresList);
    }
}

// function to stop the quiz
function endQuiz() {
    clearInterval(timeInterval);
    timerEl.textContent = "";
    console.log(userScore);

    questionsDiv.classList.add("hide");
    userScoreDiv.classList.remove("hide");    
}

// event listeners to execute functions
startBtn.addEventListener("click", startQuiz);
choicesListEl.addEventListener("click", checkAnswer);
submitBtn.addEventListener("click", showUserScore);
highScoresPage.addEventListener("click", showHighScores);




