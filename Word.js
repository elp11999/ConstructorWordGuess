//
//  Word Guess command-line game using constructor functions.
//
//  Word.js -- Object to hold the word to be guessed
//

// Load Letter object
var LetterObj = require('./Letter.js');

// Constructor function to create a word object
var wordObj = function(value) {
    this.letters = [];
    this.addLetter = function(value) {
        this.letters.push(new LetterObj(value));
    },
    this.getWord = function() {
        var word = "";
        this.letters.forEach(function(LetterObj) {
            word += LetterObj.getLetter() + " ";
        });
        return word;
    },
    this.guessLetter = function(value) {
        var isCorrectGuess = false;
        this.letters.forEach(function(LetterObj) {
            if ((LetterObj.guessLetter(value)) === true)
                isCorrectGuess = true;
        });
        return isCorrectGuess;
    };
};

// Export Letter Object
module.exports = wordObj;

