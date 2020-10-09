import { Game } from "./game.js";
import { Column } from "./column.js";
import { GameJsonSerializer } from '/game-json-serializer.js';
import { GameJsonDeserializer } from '/game-json-deserializer.js';

let game;
const json = window.localStorage.getItem('connect-four');
if (json) {
  const deserializer = new GameJsonDeserializer(json);
  console.log(deserializer)
  game = deserializer.deserialize();
  console.log(game)
  updateUI();
}

function updateUI() {
  if (game === undefined) {
    document.getElementById("board-holder").classList.add("is-invisible");
  } else {
    document.getElementById("board-holder").classList.remove("is-invisible");
    document.getElementById("game-name").innerHTML = game.getName();

    let currentPlayer = game.currentPlayer;
    let rowWhereYouClick = document.getElementById("click-targets");
    if (currentPlayer === 1) {
      rowWhereYouClick.classList.add("black");
      rowWhereYouClick.classList.remove("red");
    } else {
      rowWhereYouClick.classList.add("red");
      rowWhereYouClick.classList.remove("black");
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
    
    for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
      const isColumnFull = game.isColumnFull(columnIndex);
      const columnId = `column-${columnIndex}`;
      const column = document.getElementById(columnId);

      if (isColumnFull) {
        column.classList.add('full');
      } else {
        column.classList.remove('full');
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
    game.playInColumn(columnNum); // if we click a full column, it still switches TODO:
    updateUI();

    const serializer = new GameJsonSerializer(game);
    const json = serializer.serialize();
    window.localStorage.setItem('connect-four', json);

    updateUI();

  })
});
