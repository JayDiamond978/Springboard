// Start of countdown exercise
function countDown(seconds){
    let time = setInterval(function(){
        seconds --;
        if (seconds > 0){
            console.log(seconds);
        } else {
            clearInterval(time);
            console.log("Done!");
        }
    }, 1000)
}

countDown(10);
// End of countdown exercise

// Start of randomGame exercise
function randomGame(){
    let numberOfAttempts = 0;
    let theGame = setInterval(function(){
        let randomNumber = Math.random();
        if (randomNumber > .75){
            numberOfAttempts++;
            clearInterval(theGame);
            console.log(numberOfAttempts);
        }else{
            numberOfAttempts++;
        }
    }, 1000)
}

randomGame();
//End of randomGame exercise