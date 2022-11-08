// Assignment code here
// Claim a constant of each charater type, I use string to save my keyboard.
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numerals = "0123456789"
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
// This is the life saver. This randomly selects an element in an array if it was selected by the user if the password length is less than desired length.
var rdmCharacter = function (finalPassword, passwordLength, checking, string, range) {
  if (checking === true && finalPassword.length < passwordLength) {
    var selectRandom = Math.floor(Math.random() * range);
    // Both of the two ways of claming password pool work for this. If using an array then use "array[selectRandom]""
    finalPassword += string.charAt(selectRandom);
  }
  return finalPassword;
}
// The function to generate password
var generatePassword = function () {
  var passwordPool = ""
  var passwordLength = window.prompt("How long is your password? \n<Minimum 8 charactors>\n<Maximun 128 charactors>");
  // Check for invalid input 
  while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    window.alert("Invalid input value. \nPlease enter a number between 8 and 128 (both included).")
    passwordLength = window.prompt("Please re-enter your desired length of your password. \n<Minimum 8 charactors>\n<Maximun 128 charactors>")
    // console.log(passwordLength)
    // console.log(typeof passwordLength)    
  }
  // Collect user wanted criterias
  var intitialCounter = 0
  var lcConfirm = window.confirm("Got it. Do you want <lowercase letters> in your password?");
  var ucConfirm = window.confirm("Not a problem. Do you want <UPPERCASE LETTERS> in your password?");
  var nbrConfirm = window.confirm("<Numbers> are always good in a password, do you want some?");
  var symbolConfirm = window.confirm("Sure. What about some <Spec!al ch@racters>?");
  // Generate password pool and set a counter for the number of must-add charater types
  if (lcConfirm) {
    passwordPool += lowerCase;
    intitialCounter = intitialCounter + 1
  }
  if (ucConfirm) {
    passwordPool += upperCase;
    intitialCounter = intitialCounter + 1
  }
  if (nbrConfirm) {
    passwordPool += numerals;
    intitialCounter = intitialCounter + 1
  }
  if (symbolConfirm) {
    passwordPool += specialCharacters;
    intitialCounter = intitialCounter + 1
  }
  // Check for invalid selection
  if (passwordPool.length == 0) {
    window.alert("Please choose at least one of the criterias.");
    return null;
  }
  console.log(passwordPool)
  console.log(intitialCounter)
  // Define and start to generate password
  var finalPassword = "";
  //  Another life saver. It will fill the password with user wanted criterias first so that at least 1 element of the selected criteria will be added to the password
  //  First fill in 1 of each chosen charactor type
  finalPassword = rdmCharacter(finalPassword, passwordLength, lcConfirm, lowerCase, 26)
  finalPassword = rdmCharacter(finalPassword, passwordLength, ucConfirm, upperCase, 26)
  finalPassword = rdmCharacter(finalPassword, passwordLength, nbrConfirm, numerals, 10)
  finalPassword = rdmCharacter(finalPassword, passwordLength, symbolConfirm, specialCharacters, specialCharacters.length)
  console.log(finalPassword)
  // Then fill the rest of the password with random charaters from password pool
  for (let i = intitialCounter; i < passwordLength; i++) {
    finalPassword += passwordPool.charAt(Math.floor(Math.random() * passwordPool.length))
  }
  console.log(finalPassword)
  // shuffle the password to make it more random
  var shuffled = finalPassword.split('').sort(function () { return 0.5 - Math.random() }).join('');
  console.log(shuffled)
  return shuffled
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