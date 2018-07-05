// Variables
var winCount = 0;
var lossCount = 0;
var guessesRemaining = 15;
var hangmanWord = "";
var wordBank = ["BARB", "MOLLY", "PLATY", "GUPPY", "BLACKMOLLY", "SWORDTAIL", "ANGELFISH"];
var underscoreWord = [];
var lettersGuessed = [];

// Functions

// increase user win
function increaseWinCount() {
    winCount = winCount + 1;
}

// increase user loss
function increaseLossCount() {
    lossCount = lossCount - 1;
}

// decrement guesses remaining
function decrementGuessesRemaining() {
    guessesRemaining--;
}

// test if the user won
function didUserWin() {
    var underscoreString = underscoreWord.join('');
    if (underscoreString === hangmanWord) {
        return true;
    } else {
        return false;
    }
}

// test if the user lost
function didUserLose() {
    if (guessesRemaining === 0) {
        return true;
    } else {
        return false;
    }
}

//choose hangmanword from the wordbank
function chooseHangmanWord() {
    var index = Math.floor(Math.random() * wordBank.length);
    hangmanWord = wordBank[index];
}

// replace underscore with correct letter
function replaceUnderscore(userGuess) {
    
    for (var i = 0; i < hangmanWord.length; i++) {
        if (userGuess === hangmanWord[i]) {
            underscoreWord[i] = userGuess;
        }
    }
}

// test if guess was a match
function isUserGuessCorrect(userGuess) {
    if (hangmanWord.indexOf(userGuess) !== -1) {
        return true;
        // call replaceUnderScore(userguess)
    } else {
        return false;
    }
}

// create underscore word (after wordBank word chosen)
function createUnderscoreWord() {
    var underscoreArray = [];
    for (var i = 0; i < hangmanWord.length; i++) {
        underscoreArray.push("_");
    }
    underscoreWord = underscoreArray;
}

function addToLettersGuessed(userGuess) { 
    lettersGuessed.push(userGuess);
}

// screens out duplicate guesses
function isGuessValid(userGuess) {
    if (underscoreWord.indexOf(userGuess) === -1 && 
        lettersGuessed.indexOf(userGuess) === -1)
    {
        return true;
    } else {
        return false;
    }
}

function updateBrowserWindow() {
    document.getElementById('js-win-count').innerHTML = winCount;
    document.getElementById('js-loss-count').innerHTML = lossCount;
    document.getElementById('js-guesses-remaining').innerHTML = guessesRemaining;
    document.getElementById('js-word').innerHTML = underscoreWord;
    document.getElementById('js-guessed').innerHTML = lettersGuessed;
}


function newRound() {
    guessesRemaining = 15;
    lettersGuessed = [];
    chooseHangmanWord();
    createUnderscoreWord();
    updateBrowserWindow();
}


function isGuessALetter(userGuess) {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (alphabet.indexOf(userGuess) !== -1) {
        return true;
    } else {
        return false;
    }
}

// manage game play logic/functions -- shots caller, baller, could be a little taller
function gamePlayEngine(userGuess) {
    
    // is user guess a letter
    if (isGuessALetter(userGuess)) {
        
        // if so, is user guess previously guessed
        if (isGuessValid(userGuess)) {
            
            // is user guess correct
            if (isUserGuessCorrect(userGuess)) {
                
                // replace underscore with user guess at proper indices
                replaceUnderscore(userGuess);
                updateBrowserWindow();
            } else { // if user guess was wrong
                
                // add letter to letters guessed array
                addToLettersGuessed(userGuess);
                decrementGuessesRemaining();
                updateBrowserWindow();
            }
        } else { /* do nothing */ }
    } else { /* do nothing */ }
    
    // Test if user won
    if (didUserWin()) {
        increaseWinCount();
        winAlert();
        newRound();
    }

    function winAlert () {
        alert("You Won!");
    }
    
    // Test if user lost
    if (didUserLose()) {
        increaseLossCount();
        loseAlert();
        newRound();
    }

    function loseAlert () {
        alert("you lost.");
    }
}

newRound();

document.addEventListener('keyup', function(event) {
    var userGuess = event.key.toUpperCase();
    
    gamePlayEngine(userGuess);
});





