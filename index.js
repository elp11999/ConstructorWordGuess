//
//  Word Guess command-line game using constructor functions.
//
//  index.js -- Main entry point for the Constructor Word Guess Game
//

// Load prompt library
var prompt = require('prompt');

// Load random-words library
var randomWords = require('random-words');

// Load Word object
var WordObj = require('./Word.js');

// Reset prompt configuration
prompt.message = "";
prompt.delimiter = "";

// Word object
var Word = null;

// Random word
var randomWord = "";

// Number of unique letters in the random word
var numberOfLettersInWord = 0;

// Number of correctly guessed letters in the random word
var numberOfGuessedLetters = 0;

// Number of guesses remaining
var guessesRemaining = 0;

// Function to start game
var startUpGame = () => {

    // Set guesses remaining
    guessesRemaining = 10;

    // Set number of guessed letters
    numberOfGuessedLetters = 0;

    // Create word to guess
    createWordToGuess();
    
    // Display word
    console.log(Word.getWord() + "\n");
}

// Function to create the random word to guess
var createWordToGuess = () => {
    var randomWordArray = [];
    var uniqueValues = [];

    // Create word object
    Word = new WordObj();

    // Create random word
    randomWordArray = randomWords({exactly:1, maxLength: 64, wordsPerString:1});

    // Create array of unique letters from the random word
    uniqueValues = [...new Set(randomWordArray.join(","))];

    // Get number of unique letters in the random word
    numberOfLettersInWord = uniqueValues.length;

    // Set random word
    randomWord = randomWordArray[0];
       
    //console.log("Random word is " + randomWord);

    // Add letters of the random word to the word object
    for (var i = 0; i < randomWord.length; i++) {
        Word.addLetter(randomWord[i]);
    }
};

// Function to play game
var playGame = (letter) => {
    var isCorrectGuess = false;

    // Check if letter exists in word
    isCorrectGuess = Word.guessLetter(letter);
    console.log("\r");

    // Display result
    if (isCorrectGuess) {
        console.log("CORRECT!!!\n");
        numberOfGuessedLetters++;
    } else {
        console.log("INCORRECT!!!\n");
        console.log(--guessesRemaining + " Guesses remaining\n");
    }

    // Display word
    console.log(Word.getWord() + "\n");

    // Check for No guesses remaining
    if (guessesRemaining == 0) {
        console.log("No guessing remaining. You lose!!\n");
        console.log("The word was: " + randomWord + "\n");

        // Restart game
        console.log("Next word!\n");
        startUpGame();
    }
    
    // Check for end of the game
    if (numberOfGuessedLetters == numberOfLettersInWord) {
        console.log("You got it Right!!. Next word!\n");
        startUpGame();
    }
}

// Function to get letter from user
var getLetter = () => {

    prompt.get({
    properties: {
        letter: {
        description: "? Guess a Letter!",
        }
    }
    }, function (err, result) {
        // Check for error
        if (err) {
            console.log("\n\nGame ended. Play again soon!!!.");
            return;
        }

        // Sanity checking on the input
        if (result.letter.length == 1 && validateInput(result.letter)) {
            playGame(result.letter);
        }
        
        // Get next letter
        getLetter();
    });
};

// Function to check if input is a letter
var validateInput = (letter) => {
    var regx = /^[a-z\u00C0-\u00ff]+$/;
    return regx.test(letter);
};

// Say hello
console.log("Word Guess Game!!!\n");

// Start up Game
startUpGame();

// Prompt user for a letter
getLetter();