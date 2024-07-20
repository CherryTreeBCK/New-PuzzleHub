var totalScore = sessionStorage.getItem('totalScore') ? parseInt(sessionStorage.getItem('totalScore')) : 0;

var puzzles = JSON.parse(sessionStorage.getItem('puzzles')) || ["bounce", "maze", "memoryclicker", "sudoku", "imagepuzzle", "wordle", "raindrop", "hoop"];

var puzzleScores = JSON.parse(sessionStorage.getItem("puzzleScores")) || {
  "bounce": 0,
  "maze": 0,
  "memoryclicker": 0,
  "sudoku": 0,
  "imagepuzzle": 0,
  "wordle": 0,
  "raindrop": 0,
  "hoop": 0
};

var oldPuzzleScores = null;

var coordination = ['bounce', 'maze', 'hoop']
var memory = ['memoryclicker', 'imagepuzzle']
var problemSolving = ['wordle', 'maze', 'sudoku', 'imagepuzzle']
var reactionTime = ['bounce', 'raindrop', 'hoop', 'memoryclicker']

var coordinationScore = 0;
var memoryScore = 0;
var problemSolvingScore = 0;
var reactionTimeScore = 5;

function calculateStats(){
  coordinationScore = (puzzleScores[coordination[0]] + puzzleScores[coordination[1]] + puzzleScores[coordination[2]]) / coordination.length;
  memoryScore = (puzzleScores[memory[0]] + puzzleScores[memory[1]]) / memory.length;
  problemSolvingScore = (puzzleScores[problemSolving[0]] + puzzleScores[problemSolving[1]] + puzzleScores[problemSolving[2]] + puzzleScores[problemSolving[3]]) / problemSolving.length;
  reactionTimeScore = (puzzleScores[reactionTime[0]] + puzzleScores[reactionTime[1]] + puzzleScores[reactionTime[2]] + puzzleScores[reactionTime[3]]) / reactionTime.length;
}

calculateStats();

function nextPuzzle() {
  if (puzzles.length === 0) {
    
    window.location.href = "../stats.html";
    return;
  }

  var randomNumber = Math.floor(Math.random() * puzzles.length);
  var randomPuzzle = puzzles[randomNumber];

  // Remove the chosen puzzle from the list
  puzzles = puzzles.filter(puzzle => puzzle !== randomPuzzle);

  var currentURL = window.location.href;
  var newURL = currentURL.substring(0, currentURL.lastIndexOf('/') + 1);
  var finalURL = newURL + randomPuzzle + ".html";

  window.location.href = finalURL;

  sessionStorage.setItem('puzzles', JSON.stringify(puzzles));
}

function puzzleOver(result, newScore) {
  sessionStorage.setItem("puzzleScores", JSON.stringify(puzzleScores));

  if(result == false){
    newScore = newScore / 2;
  }

  console.log(puzzleScores);

  totalScore = totalScore + newScore;
  sessionStorage.setItem('totalScore', totalScore);

  var puzzleResult = document.getElementsByClassName("puzzle-result")[0];
  if (result === true) {
    puzzleResult.innerHTML = "Puzzle Completed";
  } else if (result === false) {
    puzzleResult.innerHTML = "Puzzle Failed";
  } else {
    console.log("Game result not provided");
    puzzleResult.innerHTML = "Puzzle Failed";
  }

  var scoreDescription = document.getElementsByClassName("score-description");
  for (var i = 0; i < scoreDescription.length; i++) {
    scoreDescription[i].innerHTML = "Total Score: " + totalScore;
  }

  var puzzleScoreDescription = document.getElementsByClassName("puzzle-score-description");
  for (var i = 0; i < puzzleScoreDescription.length; i++) {
    puzzleScoreDescription[i].innerHTML = "Puzzle Score: " + newScore;
  }

  document.getElementById("popup2").style.zIndex = 9999;

  document.getElementsByClassName("popup2")[0].classList.add("active");


  var currentURL = window.location.href;
  var puzzleName = currentURL.replace(currentURL.substring(0, currentURL.lastIndexOf('/') + 1), '').replace('.html', '');
  puzzleScores[puzzleName] = newScore;
  sessionStorage.setItem("puzzleScores", JSON.stringify(puzzleScores));

}


// TESTING, MAKE SURE TO REMOVE THIS
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 78) {
      puzzleOver(true, 100)
  }
});  

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 38) {
    console.log("Puzzle Scores: (FROM PUZZLES) " + JSON.stringify(puzzleScores));
    console.log("Skills Scores FROM PUZZLES: " + coordinationScore + " " + memoryScore + " " + problemSolvingScore + " " + reactionTimeScore);
  }
}); 

