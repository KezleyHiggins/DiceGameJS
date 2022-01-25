'use strict';

//#region Classes
class Player{
    constructor(playerNum){
        this.playerNum = playerNum;
        this.section = document.querySelector(`.player--${this.playerNum}`);

        this.currentScore = 0;
        this.currentScoreElement = document.getElementById(`current--${this.playerNum}`);

        this.overallScore = 0;
        this.overallScoreElement = document.querySelector(`#score--${this.playerNum}`);

        this.UpdateOverallScore(0);
        this.UpdateCurrentScore(0);
    }

    UpdateCurrentScore(newCurrentScore){
        this.currentScore = newCurrentScore;
        this.currentScoreElement.textContent = this.currentScore;
    }

    UpdateOverallScore(newOverallScore){
        this.overallScore = newOverallScore;
        this.overallScoreElement.textContent = this.overallScore;
    }

    HoldScore(){
        this.UpdateOverallScore(this.overallScore + this.currentScore)
        this.UpdateCurrentScore(0);
    }

    Reset(){
        this.UpdateCurrentScore(0);
        this.UpdateOverallScore(0);
    }

    SetAsActive(){
        this.section.classList.add("player--active");
    }

    SetAsInactive(){
        this.section.classList.remove("player--active");
    }
}

class Dice{
    constructor(){
        this.currentDie = 1;
        this.diceElement = document.querySelector(".dice");
        this.Hide();
    }

    Roll(){
        this.currentDie = Math.trunc(Math.random() * 6) + 1;
        this.diceElement.src = `dice-${this.currentDie}.png`;
    }

    Show(){
        if(this.diceElement.classList.contains("hidden") === true){
            this.diceElement.classList.remove("hidden");
        }
    }

    Hide(){
        if(this.diceElement.classList.contains("hidden") === false){
            this.diceElement.classList.add("hidden");
        }
    }
}
//#endregion

//#region Variables

const player1 = new Player(1);
const player2 = new Player(2);
const dice = new Dice();
let activePlayer = player1;

const newGameButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

//#endregion

//#region Main

const RollDice = function(){
    dice.Roll();
    dice.Show();

    if(dice.currentDie !== 1){
        activePlayer.UpdateCurrentScore(activePlayer.currentScore + dice.currentDie)
    }else{
        activePlayer.UpdateCurrentScore(0);
        Hold();
    }
}

const Hold = function(){
    activePlayer.HoldScore();
    activePlayer.SetAsInactive();

    if (activePlayer.playerNum == 1) {
        activePlayer = player2;
    }
    else{
        activePlayer = player1;
    }

    activePlayer.SetAsActive();
}

const NewGame = function(){
    player1.Reset();
    player2.Reset();
    activePlayer = player1;
}

rollButton.addEventListener("click", RollDice);
holdButton.addEventListener("click", Hold);
newGameButton.addEventListener("click", NewGame);

//#endregion