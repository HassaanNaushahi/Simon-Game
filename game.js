var userClickedPattern = [];
var gameRandomPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(".btn").click(handler);
$(document).keypress(keyPressed);

function keyPressed(){
  if(gameStarted == false){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
}

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber*3+1);

  var randomChosenColour = buttonColours[randomNumber];
  gameRandomPattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(50).fadeIn();
  addSound(randomChosenColour);
}

function addSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function handler(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  addSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function animatePress(currentColour){
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function(){
    activeButton.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gameRandomPattern[currentLevel]){
    if(userClickedPattern.length === gameRandomPattern.length){
    setTimeout(nextSequence, 1000);
  }
}
else{
  addSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over")}, 200);
  $("h1").text("Game Over. Press Any Key To Restart!");

  userClickedPattern = [];
  gameRandomPattern = [];
  level = 0;
  gameStarted = false;
  setTimeout(function () {
    $(".btn").click(handler);
    $(document).keypress(keyPressed);
  }, 2000);
}
}
