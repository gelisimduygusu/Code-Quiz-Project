import { quizQuestions } from "./questions.js";

// DOM elements
var buttonEl = document.querySelector("#start");
var timerEl = document.querySelector("#time");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var startScreenEl = document.querySelector("#start-screen");
var endScreenEl = document.querySelector("#end-screen");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var finalScoreEl = document.querySelector("#final-score");
var feedbackEl = document.querySelector("#feedback");

// Global
var questionObject = quizQuestions;
var currentQuestion = 0;
var correctAnswer = 0;
var timeLeft = 60;

// Audio 
var correctAudio = new Audio("./assets/sfx/correct.wav");
var incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

//Display Questions
function displayQuestions() {
    choicesEl.innerHTML = "";
    for (var i = 0; i < questionObject[currentQuestion].options.length; i++) {

        var choice = document.createElement("button");
            choice.setAttribute("data-answer", i);
            choice.innerHTML = `${i + 1}. ${questionObject[currentQuestion].options[i]}`;
            choicesEl.appendChild(choice);
    }
    // Question title
    questionTitleEl.textContent = questionObject[currentQuestion].question;
}

// Check if answer is correct
function answers(event) {
    if (!event.target.matches("button")){
        return;
    }
    if (event.target.getAttribute("data-answer") == questionObject[currentQuestion].answer) {
        correctAnswer++;
        correctAudio.play(); 
        feedbackEl.removeAttribute("class", "hide");
        feedbackEl.setAttribute("class", "feedback");
        feedbackEl.textContent = "Correct!";
        // Hide the message
        setInterval(() => {
            feedbackEl.setAttribute("class", "hide");
        }, 2000);
    } else {
        // reduce the time
        timeLeft -= 10;
        incorrectAudio.play();
        feedbackEl.removeAttribute("class", "hide");
        feedbackEl.setAttribute("class", "feedback");
        feedbackEl.textContent = "Wrong!";
        setInterval(() => {
            feedbackEl.setAttribute("class", "hide");
        }, 2000);
    }
    // Next question
    currentQuestion++;
    if (currentQuestion === questionObject.length) {
        endGame();
    } else {
        displayQuestions();
    }
}

// Timer
function startTimer(){
    // Start timer
    var timeInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.textContent = 0;
            endGame();
        }
    }, 1000);
}

// End the quiz
function endGame(){
    questionsEl.setAttribute("class", "hide");
    endScreenEl.setAttribute("class", "show");
    finalScoreEl.textContent = `${correctAnswer} out of ${questionObject.length}`;
}

function saveScore(){
    var score = {
        initials: initialsEl.value.trim().toUpperCase(),
        score: correctAnswer
    };
    if (score.initials === "" || score.initials.length > 5) {
        alert("Please enter your initials. (Max 5 characters)");
        return;
    }

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    // Add the new array
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
}

// event listener s
submitBtn.addEventListener("click", saveScore);

choicesEl.addEventListener("click", answers);

buttonEl.addEventListener("click", function () {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "show");
    timerEl.textContent = timeLeft;
    startTimer();
    displayQuestions();
});


