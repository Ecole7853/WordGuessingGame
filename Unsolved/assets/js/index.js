//these variables are used by javascript to apply changes to the html
let wordBlank = document.querySelector(".word-blanks");
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");

//these varaibles are initiated so that they have a default value
//let is used because they are changed/adjusted later on in the code
let chosenWord = "";
let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;

// Arrays used to create blanks and letters on screen
var ltrOfChoosen = [];
var blanksLetters = [];


//array of words the user will guess
const words = ["variable", "array", "modulus", "object", "function", "string", "boolean"];

//init function that initiats when the page is loaded.
function init() {
    getWins();
    getLosses();
}

//the start game function is called when the start button is clicked
function startGame() {
    //set isWin to false, this way if the game was recently won, it will be changed
    isWin = false;
    //adjustable timer, this was declared earlier as null, so that we could set it here
    //rather than when the page loads.
    timerCount = 10;
    //prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    //calls functions to 1. start timer and 2. set us up with however many blanks 
    //their are for the corsipoding word
    renderBlanks()
    startTimer()
}

// the win game function is called when the win condition is met
function winGame() {
    //below we use one of our predeclared variables, wordblank, to find the proper line in our html
    //then we use the textContent property to add "You Win!" to the selected <div> in html
    wordBlank.textContent = "You win!";
    //here we increment win, because if th is function has been called
    //we want 1 addittional win counted.
    winCounter++
    //here we reenable the start button so that the game can be restarted
    startButton.disabled = false;
    //call function for local storage
    setWins();
}

// the lose game function is called when the win condition is met
function loseGame() {
    //below we use one of our predeclared variables, wordblank, to find the proper line in our html
    //then we use the textContent property to add "You Lose!" to the selected <div> in html
    wordBlank.textContent = "You lose!";
    //here we increment loss, because if th is function has been called
    //we want 1 addittional loss counted.
    loseCounter++
     //here we reenable the start button so that the game can be restarted
    startButton.disabled = false;
    //call function for local storage
    setLosses();
}

//The setTimer Function starts and stops thte timer and triggers a winGame() and loseGame()
function startTimer() {
    //sets timer setInterval is a preset method within javascript
    // here we've set it to 1000 milliseconds on line 95 
    timer = setInterval(function () {
        //this allows the function startTimer to DEcrement our predeclared timer by 1
        timerCount--;
        //this will allow the html to reflect that decrement by using timerElement, which is 
        //one of our predeclared variables above, allowing the JS to adjust html <div>
        timerElement.textContent = timerCount;
        //locked block of code behind a timer conditional that allows it to 
        //work only if the timer is actively above 0
        if (timerCount >= 0) {
            //tests if win condition is met and timer is still greater than 0
            if (isWin && timerCount > 0) {
                //clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        //Tests if time has run out
        if (timerCount === 0) {
            //clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

//creates blanks on screen
function renderBlanks() {
    //randomly picks word from words array using math floor, and random, math floor
    //is only added so that our number doesn't end up 1.119387, floor rounds properly
    //words.length means that our random number can only be between 1-our array length
    chosenWord = words[Math.floor(Math.random() * words.length)];
    //here we use our predeclared array, ltrofchosen and we redeclare it to 
    //our chosen randomized word // why is split used, if it's commented out, no change
    ltrOfChoosen = chosenWord//.split("");
    //here we declare that our variable of numblanks is to be the same amount of chars as 
    //our chosen word
    numBlanks = ltrOfChoosen.length;
    //reclearing the array, not sure why?
    blanksLetters = []
    //uses loop to push blanks to blanksletters array
    for (let i = 0; i < numBlanks; i++) {
        //this will continuously add an underscore until i, has incremnented to be as long
        //as our chosen word is
        blanksLetters.push("_");
    }
    //converts blankletters array into string and renders it on the screen using our
    //redeclared wordBLank variable, which accesses our html div 
    wordBlank.textContent = blanksLetters.join(" ");
}

//updates win count on screen and sets win count to client storage
function setWins() {
    //here we pull our win count from local storage to update the user on their previous score
    win.textContent = winCounter;
    //setItem takes our keyname, then keyvalue, here were using winCounter, as our value
    //this allows local storage to seamlessly update using a varible that we adjust live 
    localStorage.setItem("winCount", winCounter);
}

//updates lose count on screen and sets lose count to client storage
function setLosses() {
    //here we pull our lose count from local storage to update the user on their previous score
    lose.textContent = loseCounter;
    //setItem takes our keyname, then keyvalue, here were using loseCounter, as our value
    //this allows local storage to seamlessly update using a varible that we adjust live 
    localStorage.setItem("loseCount", loseCounter)
}

//these functions are used by init
function getWins() {
    //get stored value from client storage, if it exists
    const storedWins = localStorage.getItem("winCount");
    //if stored value does not exist, set counter to 0
    if (storedWins === null) {
        winCounter = 0;
    } else {
        //if a value is retrieved from client storage set the winCounter to that value\
        winCounter = storedWins;
    }
    //render win count to page
    win.textContent = winCounter;
}

function getLosses() {
    //get stored value from client storage, if it exists
    let storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
        //if stored value does not exist, set counter to 0
        loseCounter = 0;
    } else {
        //if a value is retrieved from client storage set the loseCounter to that value
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
}

function checkWin() {
    //if the word equals the blankLetters array when converted to string, set isWin to true
    if (chosenWord === blanksLetters.join("")) {
        isWin = true;
        //this value is used in the timer function to test if win condition is met
    }
}

//tests if guessed letter is in the word and renders it to the screen
function checkLetters(letter) {
    let letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var x = 0; x < numBlanks; x++) {
            if (chosenWord[x] === letter) {
                blanksLetters[x] = letter;
            }
        }
        wordBlank.textContent = blanksLetters.join(" ");
    }
}
//attach event listener to document to listen for key event
document.addEventListener("keydown", function (event) {
    //if the count is zero, exit function
    if (timerCount === 0) {
        return;
    }
    //convert all keys to lower case
    let key = event.key.toLowerCase();
    let alphabetNumbericCharacters = "abcdefghijklmnopqrstuvwxyz012345679 ".split("");
    // test if key is pushed letter
    if (alphabetNumbericCharacters.includes(key)) {
        let letterGuessed = event.key;
        checkLetters(letterGuessed)
        checkWin();
    }
});

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        startGame()
    }
  })


//attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

//calls init() so that it fires when page is opened
init();

//bonus:add reset button
const resetButton = document.querySelector(".reset-button");

function resetGame() {
    //resets win and loss counts
    winCounter = 0;
    loseCounter = 0;
    //renders win and loss counts and sets them into client storage
    setWins()
    setLosses()
}

//attachs event listener to button
resetButton.addEventListener('click', resetGame);