const choiceButtons = document.querySelectorAll('[data-choice]');
const finalColumn = document.querySelector('[data-column]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const computerScoreSpan = document.querySelector('[data-computer-score]');

const CHOICES = [
    {
        name: 'rock',
        image: './assets/images/rock.png',
        beats: 'scissors'
    },
    {
        name: 'paper',
        image: './assets/images/paper.png',
        beats: 'rock',
    },
    {
        name: 'scissors',
        image: './assets/images/scissors.png',
        beats: 'paper',
    }
];

/**
 * adds click event to all the buttons and identifies them based of their .name value
 */
choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener('click', event => {
        const choiceName = choiceButton.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        makeChoice(choice);
    });
});

/**
 * Creates the make choice function which is called on click in the code above
 * the function makes the computer make a random choice
 * determines the winner and calls the addChoiceResult function to display the match
 * Also updates the history tab according to wins/losses
 * @param {*} choice 
 */

function makeChoice(choice) {
    const computerChoice = randomChoice();
    const youWin = isWinner(choice, computerChoice);
    const computerWin = isWinner(computerChoice, choice);
    const historyWin = document.getElementById("history-win");
    const historyLose = document.getElementById("history-lose");

    addChoiceResult(computerChoice, computerWin);
    addChoiceResult(choice, youWin);
    if (youWin) incrementScore(yourScoreSpan);
    if (computerWin) incrementScore(computerScoreSpan);

    if (yourScoreSpan.innerHTML == '3') {
        openModalWin();
        historyWin.innerText = parseInt(historyWin.innerText) +1;  
    } else if (computerScoreSpan.innerHTML == '3') {
        openModalLose();
        historyLose.innerText = parseInt(historyLose.innerText) +1;
    }

/**
 * Displays whether you won/lost or if the game ended in a draw
 */

    function displayResult() {
        const matchResult = document.getElementById('display-result');
        if (youWin) { matchResult.innerHTML = "You Won";
        } else if (computerWin) {
            matchResult.innerHTML = "You Lost";
        } else {
            matchResult.innerHTML = "Draw";
        }
        }
    displayResult();
}
/* Creates Div and Appends image corresponding to choice, adds it under the scoreboard */
function addChoiceResult(choice, winner) {
    const imgID = choice.image;
    const img = document.createElement('img');
    img.src = imgID;
    const div = document.createElement('div');
    div.appendChild(img);
    div.classList.add('result-choice');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);    
}
/* Function for the computer to make a random choice */
function randomChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

/* Function to determine the winner based of the choice object values */

function isWinner(choice, computerChoice) {
    return choice.beats === computerChoice.name;
}

/* Function that increments the score by one  */

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

/* MODALS */

/* Rules Modal */ 
var modal = document.getElementById("rules-modal");
var btn = document.getElementById("rules-modal-btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/* History Modal */ 
var modalHistory = document.getElementById("history-modal");
var btnHistory = document.getElementById("history-modal-btn");
var spanHistory = document.getElementsByClassName("close")[1];

btnHistory.onclick = function() {
  modalHistory.style.display = "block";
};
spanHistory.onclick = function() {
  modalHistory.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modalHistory) {
    modalHistory.style.display = "none";
  }
};

/* Win Modal */ 

function openModalWin() {
    const winModal = document.getElementById("win-modal");
    winModal.style.display = "block";  
}

function closeModalWin() {
    const winModal = document.getElementById("win-modal");
    winModal.style.display = "none";
    resetGame();
}

/* Lose Modal */ 

function openModalLose() {
    const loseModal = document.getElementById("lose-modal");
    loseModal.style.display = "block";

}

function closeModalLose() {
    const loseModal = document.getElementById("lose-modal");
    loseModal.style.display = "none";
    resetGame();
}

/* RESET GAME */

const matchResult = document.getElementById('display-result');

function resetGame() {
    yourScoreSpan.innerText = '0';
    computerScoreSpan.innerText = '0';
    matchResult.innerText = 'RESULT';
    const resets = document.querySelectorAll('.result-choice', 'winner');
    resets.forEach(reset => {
        reset.remove();
    });
}

/* LANDING POPUP */
/* Lets the user input their name into the form and has it stored in local storage to use in scoreboard */
function submitName() {
    const inputName = document.getElementById('name');
    if(inputName.checkValidity()) {
        localStorage.setItem('name', inputName.value);
        const popupBox = document.getElementById('landing-modal');
        popupBox.style.display = "none";
        const playerName = document.getElementById('playername');
        playerName.innerHTML = localStorage.getItem('name');
    } 
}
