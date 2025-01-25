//Javascript for when the page is initially loaded up.
window.onload = () => {
    const strButton = document.getElementById('strButton') //Declares a variable for the start button. 
    document
        .querySelectorAll('input[name ="range"]') //Selects all the radio buttons.
        
        //If one of the radio buttons is selected then it enables the start button to be clicked.
        .forEach((radio) => {
            radio.addEventListener('click', () => {
                strButton.disabled = false; 

                //Allows the enter button to act the same as pressing the start button.
                addEventListener('keypress', function(event){
                    if (event.key === "Enter") {
                        strButton.click(); 
                    }
                })
            }
            )
        })

    
    strButton
        .addEventListener('click', () => { //When the start button is clicked.
            const range = parseInt(document.querySelector('input[name = "range"]:checked').value); //Declares a variable for the range from getting the value of the radio button clicked.
            const guessNum = Math.floor(Math.random() * (range + 1)); //Declares a variable which creates a random number which is within the range selected.
            
            //If the guess number is 0 then it adds 1 so the guess number is never 0.
            if (guessNum == 0){
                guessNum = guessNum + 1;
            }

            mainGame(range, guessNum); //Calls the main game function with the range and guess number as parameters.
        })

}

function mainGame(range, guessNum){ //Main game function.
    const mainGame = document.createElement('div'); //Creates a division html element.
    
    //Declares an array with each range and the accompying max guesses each range has.
    const maxGuess = {
        10: 3,
        100: 7,
        1000: 10
    }

    let guessesLeft = maxGuess[range]; //Initialises the guesses left to the max guess.

    //Creates the inner HTML for the main game.
    mainGame.innerHTML = `
    <h1 class="header">Guessing The Number Game</h1> <!--Main header at the top of the page.-->

    <!--The Dialog button for when the game is over.-->
    <dialog id = endScreen class="endScreen">
        <h2 id = "endStatus" class="labelheader"></h2>
        <p id = "endingstatus"></p>
        <button id = "endButton" class="button gameButton">Play Again</button>
    </dialog>


    <section class = "container-game"> <!--Body header containing the main game container class which contains the background colour-->
        <div class = "instructionbox"> <!--Division for the instruction box.-->
            <h2 class="labelheader">Guess a number between 1 and ${range}.</h2> <!--Main header at the top of the instruction box.-->
            <input type="number" id="guessInput" min="1" max="${range}"> <!--Input for the user to input their guess.-->
            <button id="checkButton" class="button gameButton" >Check</button> <!--Button for when the user wants to check their answer.-->
            <br>
            <h3 id = "check" ></h3> <!--Message for when the user either gets it right or wrong.-->
            <h2 class="labelheader">Guesses left: <span id="guessesLeft">${guessesLeft}</span></h2> <!--Message which tells the user how many guesses they have left.-->
        </div>
        <div class ="guessbox"> <!--Division for the guess box-->
            <h2 class="labelheader">Guessing records</h2> <!--Main header at the top of the guess box.-->
            <ul id = "guesses"> <!--List for the guesses made by the user - initialy is empty.-->
            </ul>
        </div>
    </section>
    `;

    document.body.innerHTML = ''; //Deletes the HTML for the starting portion before the button is clicked.
    document.body.appendChild(mainGame); //Appends the HTML to add the main game HTML instead.

    const checkButton = document.getElementById('checkButton'); //Declares a variable for the check button.
    const playAgain = document.getElementById('endButton'); //Declares a variable for the play again button.
    const input = document.getElementById('guessInput'); //Declares a variable for the user's guess input.

    
    //Allows the enter button to act the same as pressing the check button.
    input.addEventListener('keypress', function(event){
        if (event.key === "Enter") {
            checkButton.click();
        }
    })

    checkButton.addEventListener('click', () => { //When the check button is clicked.
        const guess = parseInt(input.value); //Declares a variable for to get the users guess.
        const guesses = document.getElementById('guesses'); //Declares a variable for the guesses unordered list.
        const check = document.getElementById('check'); //Declares a variable for the text that displays telling the user whether the number is too high or too low.
        const endScreen = document.querySelector('#endScreen'); //Declares a variable for the end screen dialog box.
        const endStatus = document.querySelector('#endStatus'); //Declares a variable for the text that displayed if they won or lost the game.
        guessesLeft --; //Takes one from the guesses that the user has left.

        //If the guess is nothing, not within the range or below 1 than it displays a message for the user to type in a number within the range.
        if (isNaN(guess) || guess < 1 || guess > range){
            check.innerText = "Type in a number within the range";
            check.style.color = "red";
            guessesLeft ++;
            return;
        }

        //If the guesses left is 0 then it tells the user there's no guesses left and the end screen dialog box pops up.
        if (guessesLeft <= 0){
            endStatus.innerText = 'No more Guesses Left!';
            endingstatus.innerText = "Answer = " +guessNum;
            endScreen.showModal(); //The end screen dialog box pops up.
        }

        if (!isNaN(guess) || guess > 1 || guess < range || guessesLeft > 0){ //If the guess is within the range and not blank.
            let li = document.createElement('li'); //Creates a single list element.
            li.innerText = guess; //Changes the list's inner text to the user's guess.
            guesses.appendChild(li); //Adds the guess to the guesses list.
            document.getElementById('guessesLeft').textContent = guessesLeft; //Updates the guesses left to be one less.
            
            //If the guess is higher than the guess number then it displays a message telling the user to try again.
            if (guess > guessNum){
                check.innerText = "Too high! Try Again.";
                check.style.color = "red";
            }

            //If the guess is lower than the guess number then it displays a message telling the user to try again.
            if (guess < guessNum){
                check.innerText = "Too low! Try Again";
                check.style.color = "red";
            }

            //If the guess is equal than the guess number then it displays a message telling the user that its correct and displays the ending screen dialog box.
            if (guess == guessNum){
                check.innerText = "Correct. Well done!"
                check.style.color = "green";
                endStatus.innerHTML = 'Congratulations!';
                var amountOfGuesses = maxGuess[range] - guessesLeft; //Declares a variable that has the amount of guesses that the user took to guess the number.
                endingstatus.innerText = "Took " +amountOfGuesses+ " Guesses";
                
                endScreen.showModal();
            }
        }
    })

    //When the user presses the play again button then it reloads the page back to the beginning.
    playAgain.addEventListener('click', () => {
        location.reload();
    })

}



