var headings = ["Press Any Key to Start", "Level ", "Game Over, Press Any Key to Restart"];
var colours = ["green", "red", "yellow", "blue"];
var playKeys = ["u", "i", "j", "k"];
var annimationEffect = {backgroundColor : 'grey', boxShadow: '0 0 20px white'};

var myAudio = document.getElementById('myAudio');
var buttons = document.getElementsByTagName('button');
var stopTime = 0;

var levelCount = 0;
var start = 0;
var position = 0;
var currentIndex = 0;
var playingPattern = 0;

var currentColor;
var correct = "correct";

var pattern = [];


function addRandom () {
  pattern.push(Math.floor(Math.random()*4));
}


// for (var i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', function() {
//     myAudio.currentTime = this.getAttribute("data-start");
//     stopTime = this.getAttribute("data-stop");
//     myAudio.play();
//   }, false);
// }

myAudio.addEventListener('timeupdate', function() {
  if (this.currentTime > stopTime) {
    this.pause();
  }
}, false);

function buttonPressed(index, color) {
  $('#'+color)[0].animate(annimationEffect,200);
  myAudio.currentTime = index;
  stopTime = index + 0.25;
  myAudio.play();
}


function playPattern () {
  playingPattern=1;
  let i = 0;
  let pat = setInterval(pressButton,750);
  function pressButton () {
  if (i == pattern.length) {
    playingPattern = 0;
    clearInterval(pat);
  }else {
      currentIndex = pattern[i];
      currentColor = colours[currentIndex];

      buttonPressed(currentIndex, currentColor);

      i++;
    }
  }
}

function wrong () {
  $("h1").text(headings[2]);
  myAudio.currentTime = 4;
  stopTime = 5;
  myAudio.play();
  start = 0;
  levelCount = 0;
  position = 0;
  pattern = [];
}

function checkPattern (key) {

  if (key == playKeys[pattern[position]]){
    buttonPressed(pattern[position],colours[pattern[position]]);

    position++;
    if (position === pattern.length){
      setTimeout(nextLevel,300);
    }
  } else {
    wrong();
  }
}

function nextLevel() {

  addRandom();
  levelCount++;
  $("h1").text(headings[1]+levelCount);
  position=0;
  setTimeout(playPattern,300);
}



$(document).keydown(function(e){
  if (playingPattern == 0){
    if (start == 0){
      myAudio.currentTime = 4.75;
      stopTime = 5.1;
      myAudio.play();
      start = 1;
      nextLevel();
    } else {

      checkPattern(e.key);
    }
  }
  else {

  }

});
