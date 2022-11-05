// Assignment code here

// const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// const numerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];

// --------------------------Tried different ways to present the password pool and generate ramdom characters--------------------------------------------------------------------
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numerals = "0123456789"
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
// var rdmLowercase = Math.floor(Math.random() * lowerCase.length);
// var rdmUppercase = Math.floor(Math.random() * upperCase.length);
// var rdmNumerals = Math.floor(Math.random() * numerals.length);
// var rdmSpecialCharacters = Math.floor(Math.random() * specialCharacters.length);

// var lowerCaseLetters = /[a-z]/g;
// var upperCaseLetters = /[A-Z]/g;
// var numbers = /[0-9]/g;
// var symbols = /[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;


// console.log(rdmGenerator)
// console.log(lowerCase)
// console.log(upperCase)
// -----------------------------------------------------------------------------------------------------------------------------------
// This is the life saver. This randomly selects an element in an array if it was selected by the user if the password length is less than desired length.
var rdmCharacter = function (finalPassword, passwordLength, checking, array, range) {
  if (checking === true && finalPassword.length < passwordLength) {
    var selectRandom = Math.floor(Math.random() * range);
    // Both of the two ways of claming password pool work for this. If using an array then use "array[selectRandom]""
    finalPassword = finalPassword + array.charAt(selectRandom);
  }
  return finalPassword;
}

// The function to generate password
var generatePassword = function () {
  var passwordLength = window.prompt("How long is your password? \n<Minimum 8 charactors>\n<Maximun 128 charactors>");

  // ---------------------Some random things, I used very bad syntax to check if the input if valid.----------------------
  // var lengthNumber = Number.isNaN(passwordLength);
  // console.log(lengthNumber)
  // console.log(passwordLength)
  // console.log(typeof passwordLength)    
  // --------------------------------------------------------------------------------------------------------------

  // Check for invalid input 
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    window.alert("Invalid input value. \nPlease enter a number between 8 and 128 (both included).")
    passwordLength = window.prompt("Please re-enter your desired length of your password. \n<Minimum 8 charactors>\n<Maximun 128 charactors>")
    // console.log(passwordLength)
    // console.log(typeof passwordLength)    
  }
  // Collect user wanted criterias
  var lcConfirm = window.confirm("Got it. Do you want <lowercase letters> in your password?");
  var ucConfirm = window.confirm("Not a problem. Do you want <UPPERCASE LETTERS> in your password?");
  var nbrConfirm = window.confirm("<Numbers> are always good in a password, do you want some?");
  var symbolConfirm = window.confirm("Sure. What about some <Spec!al ch@racters>?");

  // Check for invalid selection
  if (
    lcConfirm === false &&
    ucConfirm === false &&
    nbrConfirm === false &&
    symbolConfirm === false
  ) {
    window.alert("Please choose at least one of the criterias.");
    return null;
  }

  // Define and start to generate password
  var finalPassword = "";
  //  Another life saver. It will fill the password with user wanted criterias first so that at least 1 element of the selected criteria will be added to the password
  for (let i = 0; i <= passwordLength; i++) {

    finalPassword = rdmCharacter(finalPassword, passwordLength, lcConfirm, lowerCase, 26)
    finalPassword = rdmCharacter(finalPassword, passwordLength, ucConfirm, upperCase, 26)
    finalPassword = rdmCharacter(finalPassword, passwordLength, nbrConfirm, numerals, 10)
    finalPassword = rdmCharacter(finalPassword, passwordLength, symbolConfirm, specialCharacters, specialCharacters.length)

    console.log(finalPassword)
    // -------------------------------------------Random things. I tried to check for invalid passwords and use while loop to re-generate a password and it turns out to be very stupid.
    // var numberValid = password.match(numbers)
    // console.log(numberValid)
    // if (numberValid == null) {
    //   console.log("invalid")
    // }
    // if (lcConfirm) {
    //   var lcValid = password.match(lowerCaseLetters)
    //   console.log(lcValid)
    //   if (lcValid == null) {
    //     console.log("invalid")
    //   }
    // }
    // if (ucConfirm) {
    //   var ucValid = password.match(upperCaseLetters)
    //   console.log(ucValid)
    //   if (ucValid == null) {
    //     console.log("invalid")
    //   }
    // }
    // if (symbolConfirm) {
    //   var symbolValid = password.match(symbols)
    //   console.log(symbolValid)
    //   if (symbolValid == null) {
    //     console.log("invalid")
    //   }
    // }
    // ----------------------------------------------------------------------------------------------------
  }
  return finalPassword
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  
// A little add-on: copy the password to your clipboard.------------------------------------------------
  var copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
