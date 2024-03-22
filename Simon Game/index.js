var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = []

function playSound(name)
{
    var sound = "sounds/" + name + ".mp3";
    var audio = new Audio(sound);
    audio.play();
}

function nextSequence()
{
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level " + level);
    
}




// 1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", handler);
function handler()
{   
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

var gameTrue = false;
$(document).on("keypress", function(){
    if(!gameTrue)
    {
        $("#level-title").text("level " + level);
        nextSequence();
        gameTrue = true;
    }
});
var level = 0;





function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        console.log("yes");
        if(userClickedPattern.length == gamePattern.length)
        {   
            
            setTimeout(function(){
            nextSequence();
            }, 1000);

        }
    }
    else{
        console.log("no");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
    
}

function startOver()
{
    gameTrue = false;
    level = 0;
    gamePattern = [];
}





