var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
 $('.btn').on("click",function(){
    
    var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playsound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length - 1);

  });
function nextsequence(){
  userClickedPattern = [];
  level++;
   $('#level-title').text("Level "+level);
  var randomNumber = Math.random();
  randomNumber = randomNumber*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
   
  
   animatePress(randomChosenColour);
   playsound(randomChosenColour);

}


function playsound(name){
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColour){
   $('#'+currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
   document.querySelector('#'+currentColour).classList.add('pressed');
   setTimeout(() => {
  document.querySelector('#'+currentColour).classList.remove('pressed');
}, 100);
}


$(document).keypress(function(event){
  
  if(!started){
    $('#level-title').text("Level "+level);
    nextsequence();
    started = true;
  }
  
})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
     if (userClickedPattern.length === gamePattern.length){
      setTimeout(()=>{
    nextsequence();
   },1000);
  }
   
   
  }  
  else{
      playsound("wrong");
     document.querySelector('h1').innerHTML ="Game Over, Press Any Key to Restart"
      document.querySelector('body').classList.add("game-over");
     setTimeout(() => {
       document.querySelector('body').classList.remove("game-over");
     }, 200);
     startOver();
     
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}