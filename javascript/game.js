// VARIABLES
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor = "";
var userClickedPattern = [];
var started = false;
var level = 0;


// KEYBOARD PRESS KEY LISTENER
 $(document).keypress(function(event) {
   if (!started) {
     $("#level-title").text("Level " + level);
     nextSequence();
     started = true;
   }
  });


// BUTTON CLICK LISTENER
$(".btn").click(function() {
    var userChosenColour = ($(this).attr('id'));
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    selectedButton(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


/* FUNCTION FOR CHOOSING THE RANDOM COLOR AND THEN APPLYING
   THE color TO THE selectedButton AND playSound FUNCTIONS */
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level = " + level);

  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  selectedButton(randomChosenColor);
}

// CALLBACK FUNCTION FOR FLICKERING THE COLOR SELECTED
function selectedButton(chosenColor) {
  $("#" + chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

// CALLBACK ADDS AND REMOVES PRESSED CLASS AS ANIMATION
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


// CALLBACK FUNCTION FOR PLAYING SOUNDS FOR LISTENERS
function playSound(name) {
  switch (name) {
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;

    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;

    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;

    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;

    case "wrong":
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      break;
    default:
      console.log(name);
  }
}

// CHECKS IF THE LAST ANSWER WAS CORRECT TO THE PATTERN GIVEN
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      startOver();
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    }
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}
