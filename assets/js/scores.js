// DOM element variables
var clearEl = document.querySelector("#clear");
var highScoresEl = document.querySelector("#highscores");

// Function to display high scores
function displayScores() {
    // Retrieve high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    // If there are no high scores, display message
    if (!highScores) {
        highScoresEl.textContent = "No high scores to display.";
        return;
    }
    // Loop through high scores and display them 
    for (var i = 0; i < highScores.length; i++) {
        // Create list item for each high score
        var score = document.createElement("li");
        score.textContent = `${highScores[i].initials} - ${highScores[i].score}`;
        highScoresEl.appendChild(score);
    }
}

// When page is loaded display high scores
displayScores();

// Event listener for clearing high scores
clearEl.addEventListener("click", function () {
    // Clear high scores from local storage
    localStorage.removeItem("highScores");
    // Reload the page
    window.location.reload();
});

