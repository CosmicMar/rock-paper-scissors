//assigning elements
//containers
const choiceContainer = document.querySelector('.choice');
const resultsContainer = document.querySelector('.results');
//updating string elements
const playerScoreSpan = document.getElementById('player-score');
const botScoreSpan = document.getElementById('bot-score');
const directions = document.getElementById('directions');
const winnerMsgElement = document.getElementById('winner-msg');
const resultsMsgElement = document.getElementById('results-msg');
//updating images
const playerChoiceImg = document.getElementById('player-result-img')
const botChoiceImg = document.getElementById('bot-result-img');
//img src
const rockImg = 'https://i.postimg.cc/nz2xktpp/rock.png';
const paperImg = 'https://i.postimg.cc/DZGSx0mL/paper.png';
const scissorsImg = 'https://i.postimg.cc/HsRg3zDc/scissors.png';
//buttons
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const nextRoundBtn = document.getElementById('next-round-btn');
const resetBtn = document.getElementById('reset-game-btn');
//event
rockBtn.addEventListener('click', function () {showResults('Rock');})
paperBtn.addEventListener('click', function () {showResults('Paper');})
scissorsBtn.addEventListener('click', function () {showResults('Scissors');})
nextRoundBtn.addEventListener('click', nextRound);
resetBtn.addEventListener('click', resetGame);

//determine bot choice
function getBotChoice() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  const botResult = options[randomIndex];
  switch (botResult) {
    case 'Rock':
      botChoiceImg.src = rockImg;
      return botResult;
    case 'Paper':
      botChoiceImg.src = paperImg;
      return botResult;
    case 'Scissors':
      botChoiceImg.src = scissorsImg;
      return botResult;
  }
}

function updatePlayerChoiceImg(playerChoice) {
  switch (playerChoice) {
    case 'Rock':
      return rockImg;
    case 'Paper':
      return paperImg;
    case 'Scissors':
      return scissorsImg;
  }
}

function hasPlayerWon(playerChoice, botChoice) {
  return (
    (playerChoice === 'Rock' && botChoice === 'Scissors') ||
    (playerChoice === 'Paper' && botChoice === 'Rock') ||
    (playerChoice === 'Scissors' && botChoice === 'Paper')
  );
}

let playerScore = 0;
let botScore = 0;

function getResults(playerChoice) {
  const botChoice = getBotChoice();
  if (hasPlayerWon(playerChoice, botChoice)) {
    playerScore++;
    nextRoundBtn.innerText = 'Next Round';
    return `You win this round! \n ${playerChoice} beats ${botChoice}`;
  } else if (playerChoice === botChoice) {
    nextRoundBtn.innerText = 'TRY AGAIN';
    return `It's a tie! \n Both chose ${playerChoice} \n Try again.`;
  } else {
    botScore++;
    nextRoundBtn.innerText = 'Next Round';
    return `The Bot won this round! \n ${botChoice} beats ${playerChoice}`
  }
}

function showResults(playerChoice) {
  resultsMsgElement.innerText = getResults(playerChoice);
  playerScoreSpan.innerText = playerScore;
  botScoreSpan.innerText = botScore;
  choiceContainer.style.display = 'none';
  resultsContainer.style.display = 'flex';
  directions.style.display = 'none';
  playerChoiceImg.src = updatePlayerChoiceImg(playerChoice);

  if (playerScore === 3 || botScore === 3) {
    nextRoundBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    winnerMsgElement.innerText = 
      `${ playerScore === 3
          ? 'You won the game!'
          : 'The Bot won the game. \nBetter luck next time!'
      }`;
  }
}

function nextRound() {
  directions.innerText = 'CHOOSE AN OPTION';
  directions.style.display = 'block';
  choiceContainer.style.display = 'flex';
  resultsContainer.style.display = 'none';
}

function resetGame() {
  playerScore = 0;
  botScore = 0;
  playerScoreSpan.innerText = playerScore;
  botScoreSpan.innerText = botScore;
  directions.innerText = 'CHOOSE TO BEGIN';
  directions.style.display = 'block'
  resetBtn.style.display = 'none';
  choiceContainer.style.display = 'flex';
  resultsContainer.style.display = 'none';

  resultsMsgElement.innerText = '';
  winnerMsgElement.innerText = '';
}