var runStart = 0;
var runSound = new Audio("narutoo.mp3");
function keyCheck(event) {

    //enter key
    if (event.which == 13) {
        if (runWorkerId == 0) {
            createBlockId = setInterval(createBlock, 80);
            moveBlockId = setInterval(moveBlocks, 80);
            runWorkerId = setInterval(run, 100);
            createFlameId = setInterval(createFlame,100);
            moveFlameId = setInterval(moveFlame,100);
            runStart = 1;
            runSound.play();
            backgroundSound.play();
            clearInterval(idleAnimationNumber);
            backgroundWorkerId = setInterval(moveBackground,80);
            scoreWorkerId = setInterval(updateScore,100);
        }
    }

    //space key
    if (event.which == 32) {
        if(runStart == 1){
        if (jumpWorkerId == 0) {
            clearInterval(runWorkerId);
            runSound.pause();

            jumpWorkerId = setInterval(jump, 100);
            jumSound.play();
        }
    }
}
//esc key
    if (event.which == 27){

        clearInterval(runWorkerId);
        runSound.pause();
        clearInterval(jumpWorkerId);
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(moveBlockId);
        clearInterval(createBlockId);
        clearInterval(flameWorkerId)

    }
    // e key
    if (event.which == 69){

        if(attackWorkerId == 0){
            attackWorkerId = setInterval(attack,100);
            clearInterval(runWorkerId);
        }

    }
}



//Create Block

var blockMarginLeft = 500;
var blockId = 1;
var createBlockId = 0;
function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 300) + 900;
    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";
    document.getElementById("background").appendChild(block);

}

//Move blocks
var moveBlockId = 0;
function moveBlocks() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 50;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft<=127){
            if(newMarginLeft>=50){
                if(ninjaMarginTop<=560){
                    if(ninjaMarginTop>400){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1; // to stop reapet jump full stop
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(moveBlockId);
                        clearInterval(createBlockId);
                        clearInterval(moveFlameId);

                        deadWorkerId= setInterval(dead,100)
                        deadSound.play();// deadsound
                }
            }
        }
    }
}
}

//Create Flame

var flameMarginLeft = 500;
var flameId = 1;
var createFlameWorkerId = 0;
var createFlameId = 0;
function createFlame() {
    var flame = document.createElement("div");
    flame.className = "flame";
    flame.id = "flame" + flameId;
    flameId++;

    var gap = Math.random() * (1000 - 100) + 2500;
    flameMarginLeft = flameMarginLeft + gap;

    flame.style.marginLeft = flameMarginLeft + "px";
    document.getElementById("background").appendChild(flame);

}

//Move Flame
var moveFlameId = 0;
var flameWorkerId = 0;
function moveFlame() {
    for (var i = 1; i <= flameId; i++) {
        var currentFlame = document.getElementById("flame" + i);
        var currentMarginLeft = currentFlame.style.marginLeft;
        var newJumpMarginLeft = parseInt(currentMarginLeft) - 30;
        currentFlame.style.marginLeft = newJumpMarginLeft + "px";

        if(newJumpMarginLeft <= 230){
            if(newJumpMarginLeft >= 200){
                coincollet.play();
                currentFlame.style.visibility ="hidden";
            }
        }
    }
}


var runSound = new Audio("run.mp3");
var backgroundSound = new Audio("backe.MP3");
runSound.loop= true;;
//Run
var ninja = document.getElementById("ninja")
var runImageNumber = 0;
var runWorkerId = 0;

function run() {
    runImageNumber++;

    if (runImageNumber == 11) {
        runImageNumber = 1;
    }

    ninja.src = "Run (" + runImageNumber + ").png";

}


var jumSound = new Audio("jump.mp3");
//Jump Function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var ninjaMarginTop = 480;
function jump() {

    jumpImageNumber++;

    if (jumpImageNumber<=5 ){
        ninjaMarginTop = ninjaMarginTop - 80;
        ninja.style.marginTop = ninjaMarginTop + "px";
    }

    if (jumpImageNumber >= 6){
        ninjaMarginTop = ninjaMarginTop + 80 ;
        ninja.style.marginTop = ninjaMarginTop + "px";
    }

    if (jumpImageNumber == 10) {

        jumpImageNumber = 0;

        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();


    }
    ninja.src = "Jump (" + jumpImageNumber + ").png";

}

var attackImageNumber = 0;
var attackWorkerId = 0

function attack() {

    attackImageNumber++;

    if (attackImageNumber == 10) {

        attackImageNumber = 0;

        clearInterval(attackWorkerId);
        attackWorkerId = 0;

        runWorkerId = setInterval(run, 100);

    }
        ninja.src = "Attack (" + attackImageNumber + ").png";
} 

//Move Background
var backgroundWorkerId = 0;
var Background = document.getElementById("background");
var backgrounX = 0;
function moveBackground (){
    backgrounX = backgrounX -20;
    Background.style.backgroundPositionX = backgrounX +"px";

}



//Update score
var wonSound = new Audio("winsong.mp3");
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){
    newScore++;
    score.innerHTML = newScore;

    if (newScore >= 100) {
    clearInterval(backgroundWorkerId);
    backgroundWorkerId = setInterval(moveBackground,40);
    document.getElementById("high").style.visibility = "visible"
    high.innerHTML = newScore;


    if (newScore >= 150) {
        document.getElementById("high").style.visibility = "hidden";

        if (newScore >= 220) {
            document.getElementById("won").style.visibility = "visible"
            backgroundSound.pause();
            wonSound.play();
            clearInterval(runWorkerId);
            runSound.pause();
            clearInterval(jumpWorkerId);
            jumpWorkerId = -1; // to stop reapet jump full stop
            clearInterval(backgroundWorkerId);
            clearInterval(scoreWorkerId);
            clearInterval(moveBlockId);
            clearInterval(createBlockId);
            clearInterval(moveFlameId);

        }
    }
    }


}

//Idle animation
idleImageNumber = 0;
idleAnimationNumber = 0;

function idleAnimation (){

idleImageNumber ++;

if (idleImageNumber == 10){
    idleImageNumber = 1 ;
}

ninja.src = "idle (" + idleImageNumber + ").png";

}

function idleAnimationStart(){
    idleAnimationNumber = setInterval(idleAnimation,90);
}


//Dead Function

var coincollet = new Audio("Coinsfallingsound effect.mp3");
var deadSound = new Audio("dead.mp3");
var deadImageNumber = 0;
var deadWorkerId = 0;

function dead(){
    deadImageNumber++;

    if(deadImageNumber == 10){
        deadImageNumber = 9;

    ninja.style.marginTop= "550px"
    document.getElementById("gameover").style.visibility = "visible"
    document.getElementById("endscore").innerHTML = newScore;
    document.getElementById("scorer").style.visibility = "visible"

}

    ninja.src ="Dead ("+deadImageNumber+").png";

}

//Try aging

function re(){
    location.reload();
}