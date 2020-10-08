import { Game } from "./game.js";

let game;

function updateUI() {
  if (game === undefined) {
    document.getElementById("board-holder").classList.add("is-invisible");
  } else {
    document.getElementById("board-holder").classList.remove("is-invisible");
    document.getElementById("game-name").innerHTML = game.getName();

    let currentPlayer = game.currentPlayer;
    if (currentPlayer === 1) {
      document.getElementById("click-targets").classList.add("black");
      document.getElementById("click-targets").classList.remove("red");
    } else {
      document.getElementById("click-targets").classList.add("red");
      document.getElementById("click-targets").classList.remove("black");
    }

    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const square = document.getElementById(`square-${r}-${c}`);
        const tokenValue = game.getTokenAt(r,c);
        square.innerHTML = '';
        const token = document.createElement('div');
        token.classList.add("token");
        if (tokenValue === 1) {
            token.classList.add("black");
            square.appendChild(token);
        } else if (tokenValue === 2) {
            token.classList.add("red");
            square.appendChild(token);
        }
        }
    }
    }
  
}

window.addEventListener("DOMContentLoaded", (event) => {
  let playerOne = document.getElementById("player-1-name");
  let playerTwo = document.getElementById("player-2-name");
  let newGameButton = document.getElementById("new-game");

  document.getElementById("form-holder").addEventListener("keyup", () => {
    if (playerOne.value !== "" && playerTwo.value !== "") {
      newGameButton.disabled = false;
    } else {
      newGameButton.disabled = true;
    }
  });

  newGameButton.addEventListener("click", (event) => {
    game = new Game(playerOne.value, playerTwo.value);

    playerOne.value = "";
    playerTwo.value = "";
    newGameButton.disabled = true;
    updateUI();
  });

  document.getElementById('click-targets').addEventListener("click", (event) => {
    const columnId = event.target.id;
    let columnNum = Number.parseInt(columnId.slice(7));
    game.playInColumn(columnNum);
    updateUI();
  })
});
