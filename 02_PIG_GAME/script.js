"use strict";

// variable
const container = document.querySelector(".container");
const player1Roll = document.querySelector(".player1-roll-dice");
const player2Roll = document.querySelector(".player2-roll-dice");
const player1CurrentScore = document.querySelector(".player1-current-score");
const player2CurrentScore = document.querySelector(".player2-current-score");
const player1TotalScore = document.querySelector(".player1-total-score");
const player2TotalScore = document.querySelector(".player2-total-score");
const restartGame = document.querySelector(".restart-game");
const lockTurn = document.querySelector(".lock-game");
const dice1 = document.querySelector(".dice1-img");
const dice2 = document.querySelector(".dice2-img");
const triangle1 = document.querySelector(".t1");
const triangle2 = document.querySelector(".t2");
const restart_win = document.querySelector(".restart_win");
const winnername = document.querySelector(".winnername");
const player1AUDIO = new Audio();
const player2AUDIO = new Audio();
player1AUDIO.src = "./SOUND/player1.mp3";
player2AUDIO.src = "./SOUND/player2.mp3";

let CURRENTSCORE_player1 = 0;
let CURRENTSCORE_player2 = 0;
let TOTALSCORE_player1 = 0;
let TOTALSCORE_player2 = 0;

let player1Turn = true;

const dice_images = [
  "DICE/dice6.png",
  "DICE/dice1.png",
  "DICE/dice2.png",
  "DICE/dice3.png",
  "DICE/dice4.png",
  "DICE/dice5.png",
  "DICE/dice6.png",
];

// random dice function
const generateRandomDice = () => {
  const randomNumber = Math.round(Math.random() * 6) + 1;
  return randomNumber;
};

const gameover = (who_won) => {
  container.style.opacity = 0.2;
  restartGame.style.opacity = 0.2;
  lockTurn.style.opacity = 0.2;
  document.querySelector(".WINNER").classList.remove("win");
  winnername.textContent = `${who_won} WINS`;
};

// winner function
const Winner = () => {
  const player1Score = Number(player1TotalScore.textContent);
  const player2Score = Number(player2TotalScore.textContent);

  if (TOTALSCORE_player1 >= 100) {
    gameover("PLAYER 1");
    return;
  }
  if (TOTALSCORE_player2 >= 100) {
    gameover("PLAYER 2");
    return;
  }
};

player1Roll.addEventListener("click", () => {
  if (player1Turn === true) {
    player1AUDIO.play();
    Winner(); // calling the winner function
    const random_number = (generateRandomDice() % 6) + 1;
    console.log(`PLAYER 1 --> ${random_number}`);
    dice1.style.backgroundImage = `url(${dice_images[random_number]})`;

    CURRENTSCORE_player1 += random_number;
    player1CurrentScore.textContent = CURRENTSCORE_player1;

    if (random_number == 1) {
      player1Turn = false;
      CURRENTSCORE_player1 = 0;
      player1CurrentScore.textContent = CURRENTSCORE_player1;
      triangle1.classList.add("triangle1");
      triangle2.classList.remove("triangle2");
    }
  }
});

player2Roll.addEventListener("click", () => {
  if (player1Turn === false) {
    player2AUDIO.play();
    Winner(); // calling the winner function
    const random_number = (generateRandomDice() % 6) + 1;
    dice2.style.backgroundImage = `url(${dice_images[random_number]})`;

    CURRENTSCORE_player2 += random_number;
    player2CurrentScore.textContent = CURRENTSCORE_player2;

    if (random_number == 1) {
      player1Turn = true;
      CURRENTSCORE_player2 = 0;
      player2CurrentScore.textContent = CURRENTSCORE_player2;
      triangle1.classList.remove("triangle1");
      triangle2.classList.add("triangle2");
    }
  }
});

lockTurn.addEventListener("click", () => {
  if (player1Turn) {
    Winner();
    dice1.style.backgroundImage = `url(${dice_images[1]})`;
    TOTALSCORE_player1 += CURRENTSCORE_player1;
    CURRENTSCORE_player1 = 0;
    player1TotalScore.textContent = TOTALSCORE_player1;
    player1CurrentScore.textContent = CURRENTSCORE_player1;
    player1Turn = false;
  } else {
    Winner();
    TOTALSCORE_player2 += CURRENTSCORE_player2;
    CURRENTSCORE_player2 = 0;
    player2TotalScore.textContent = TOTALSCORE_player2;
    player2CurrentScore.textContent = CURRENTSCORE_player2;
    player1Turn = true;
    dice2.style.backgroundImage = `url(${dice_images[1]})`;
  }
});

const restart_the_game = () => {
  CURRENTSCORE_player1 = 0;
  CURRENTSCORE_player2 = 0;
  TOTALSCORE_player1 = 0;
  TOTALSCORE_player2 = 0;
  player1CurrentScore.textContent = "0";
  player2CurrentScore.textContent = "0";
  player1TotalScore.textContent = "0";
  player2TotalScore.textContent = "0";
};

restartGame.addEventListener("click", restart_the_game);

restart_win.addEventListener("click", () => {
  restart_the_game();
  document.querySelector(".WINNER").classList.add("win");
  container.style.opacity = 1;
  restartGame.style.opacity = 1;
  lockTurn.style.opacity = 1;
});
