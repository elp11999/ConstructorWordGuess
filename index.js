//
//  Word Guess command-line game using constructor functions.
//
//  index.js -- Main entry point for the Constructor Word Guess Game
//

// Load prompt library
var prompt = require('prompt');

// Reset prompt configuration
prompt.message = "";
prompt.delimiter = ""; 

// Start the prompt
prompt.start();

// Function to check if input is a letter
function validateInput(letter) {
    var objRegExp  = /^[a-z\u00C0-\u00ff]+$/;
    return objRegExp.test(letter);
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
            console.log("\nProgram ended: " + err);
            return;
        }

        // Sanity checking on the input
        if (result.letter.length == 1 && validateInput(result.letter))
            console.log("You said: " + result.letter);
        
        // Get next letter
        getLetter();
    });
};

// Start game
getLetter();