'use strict';

//Getting elements
const btnRoll = document.querySelector('.btn__roll'); //
const btnHold = document.querySelector('.btn__hold');
const btnNewGame = document.querySelector('.btn__new');
const diceElement = document.querySelector('.dice');

const score0Element = document.querySelector('#score__0');
const score1Element = document.querySelector('#score__1');
const current0Element = document.getElementById('current__0');
const current1Element = document.getElementById('current__1');
const player0 = document.querySelector('.player__0');
const player1 = document.querySelector('.player__1');

//Game initial condition
let totalScores, currentScore, activePlayer, isPlaying;
//Function

const switchActivePlayer = () => {
  currentScore = 0;

  document.getElementById(`current__${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player__active');
  player1.classList.toggle('player__active');
};

const initGame = () => {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0.classList.remove('player__winner');
  player1.classList.remove('player__winner');
  player0.classList.remove('player__active');
  player1.classList.remove('player__active');
  player0.classList.add('player__active');

  diceElement.classList.add('hidden');

  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
};

initGame();

//Event handlers
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    //1.Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    //2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice${diceNumber}.png`;

    //3. If the number is 1, switch to the next player, if not - add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current__${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    // 1. Add current score to active Player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score__${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2.If total score of active player >= 100, active player won, if not switch active player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;

      document
        .querySelector(`.player__${activePlayer}`)
        .classList.add('player__winner');
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.remove('player__active');

      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNewGame.addEventListener('click', initGame);
