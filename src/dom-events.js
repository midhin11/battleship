//dom-events.js

import { updateBoardDisplay } from "./renders/render-board.js";
import { gameOvercheck } from "./game-over.js";
import { computerPlay } from "./computer-play.js";
import { statusBar } from "./selectors.js";

export function gridClickEventInitilaziation (playerBoard, playerBoardDisplay, compBoard, compBoardDisplay, restartBtn) {

    let playerTurn = true
    let compGrids = document.querySelectorAll(".comp");

    compGrids.forEach(grid => {
        grid.addEventListener("click", () => {
            if(!playerTurn) return;

            let row = Number(grid.dataset.row);
            let col = Number(grid.dataset.col);
            
            if(!compBoard.receiveAttack(row, col)) return;

            updateBoardDisplay(compBoard, compBoardDisplay);
            playerTurn = false;
            statusBar.textContent = "ENEMY TURN";
    
            // Game over and winner check
            if(gameOvercheck(playerBoard, compBoard)) {
                playerTurn = false;
                restartBtn.disabled = false;
                disableCompBoard();
                return;
            }
            
            setTimeout(() => {
                computerPlay(playerBoard, playerBoardDisplay);

                // Game over and winner check
                if (gameOvercheck(playerBoard, compBoard)) {
                    playerTurn = false;
                    restartBtn.disabled = false;
                    disableCompBoard();
                    return;
                }
                statusBar.textContent = "PLAYER TURN";
                playerTurn = true;
            }, 1000);

        });
    });
}

function disableCompBoard() {

    let compGrids = document.querySelectorAll(".comp");
    let playerGrids = document.querySelectorAll(".player")

    compGrids.forEach(grid => {
        grid.classList.add("disabled");
    });
    playerGrids.forEach(grid => {
        grid.classList.add("disabled");
    })
}
