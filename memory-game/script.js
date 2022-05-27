// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDivsForColors(colorArray) {
  const gameContainer = document.getElementById("game");
  for (let color of colorArray) {
    //Creates new divs and assigns them a class correspondent of to their color 
    //each get event listeners and appended to the game board
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  //Catches if player accidentally picks a card that is either already matched or revealed
  //Assigns cardOne and cardTwo value of target's class for later comparison
  if (localStorage.getItem("cardOne") === null){
    if (e.target.style.backgroundColor === ""){
      e.target.style.backgroundColor = e.target.classList;
      localStorage.setItem("cardOne", e.target.classList);
    }
  } else if (localStorage.getItem("cardTwo") === null) {
    if (e.target.style.backgroundColor === ""){
      e.target.style.backgroundColor = e.target.classList;
      localStorage.setItem("cardTwo", e.target.classList);
    }
  }

  let cardsToBeCompared = [localStorage.getItem("cardOne"), localStorage.getItem("cardTwo")];

  if (cardsToBeCompared[0] !== null && cardsToBeCompared[1]!== null) {
    //Current Attempts
    let currentNumOfAttempts = parseInt(localStorage.getItem("totalNumOfAttempts"));
    currentNumOfAttempts += 1;
    localStorage.setItem("totalNumOfAttempts",`${currentNumOfAttempts}`);
    const attemptLabel = document.querySelector("#currentTries");
    attemptLabel.textContent = `Number of attempts: ${currentNumOfAttempts}`;

    //If the two cards are not equal all cards of their classes will be reset
    if (cardsToBeCompared[0] !== cardsToBeCompared[1]) {
      let colorToResetOne = document.querySelectorAll(`.${cardsToBeCompared[0]}`);
      let colorToResetTwo = document.querySelectorAll(`.${cardsToBeCompared[1]}`);
      //Allows player to see the second card before it gets cleared (set to 1/4 second) because 1 seconds is too long
      setTimeout(() => {
        colorToResetOne[0].style.backgroundColor = "";
        colorToResetOne[1].style.backgroundColor = "";
        colorToResetTwo[0].style.backgroundColor = "";
        colorToResetTwo[1].style.backgroundColor = "";
      },250);
    }
    localStorage.removeItem("cardOne");
    localStorage.removeItem("cardTwo");
    
    //If isTheGameDone returns true it'll save the lowest amount of attempts to complete the game
    if (isTheGameDone()) {
      const prevRecord = parseInt(localStorage.getItem("bestGame"));
      console.log(prevRecord);
      if (currentNumOfAttempts < prevRecord || prevRecord !== NaN) {
      const bestGameLabel = document.querySelector("#bestGame");
      bestGameLabel.textContent = `Record: ${currentNumOfAttempts} attempts`;
  
      const bestGameParentDiv = document.querySelector("#other");
      bestGameParentDiv.append(bestGameLabel);

      localStorage.setItem("bestGame", `${currentNumOfAttempts}`);

      }
    }
  }
}

function isTheGameDone() {
  const allCardDivs = document.querySelectorAll("#game > div");
  let numOfCardsMatched = allCardDivs.length; 
  for (checkDiv of allCardDivs) {
    if (checkDiv.style.backgroundColor !== "") {
      numOfCardsMatched--;
    }    
  }
  if (numOfCardsMatched === 0) {
    return true;
  }
}

function main() {

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  let shuffledColors = shuffle(COLORS);
  localStorage.removeItem("cardOne");
  localStorage.removeItem("cardTwo");
  localStorage.setItem("totalNumOfAttempts", "0");

  // when the DOM loads
  createDivsForColors(shuffledColors);
  
  const prevRecord = localStorage.getItem("bestGame");
  const prevRecordLabel = document.querySelector("#bestGame");
  if (prevRecord !== null) {
    prevRecordLabel.textContent = `Record: ${prevRecord} attempts`;
    //prevRecordLabel.parentElement.append(prevRecordLabel);
  }

  //Resets the game
  document.querySelector(".reset").addEventListener("click", (e) => {
    for (divToBeDeleted of document.querySelectorAll("#game > div")){
      divToBeDeleted.parentElement.removeChild(divToBeDeleted);
    }
    localStorage.removeItem("cardOne");
    localStorage.removeItem("cardTwo");
    localStorage.setItem("totalNumOfAttempts", "0");
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    const attemptLabel = document.querySelector("#currentTries");
    attemptLabel.textContent = "";
  })
}

main();