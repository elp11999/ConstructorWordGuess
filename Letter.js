//
//  Word Guess command-line game using constructor functions.
//
//  Letter.js -- Object to hold each letter of the word
//

// Constructor function to create a letter object
var letterObj = function(value) {
    this.letter = value,
    this.isGuessed = false,
    this.getLetter = function() {
        if (this.isGuessed)
            return this.letter;
        else
            return "_";
    },
    this.guessLetter = function(value) {
        if (value === this.letter) {
            this.isGuessed = true;
            return true;
        } else
            return false;
    };
};

// Export Letter Object
module.exports = letterObj;