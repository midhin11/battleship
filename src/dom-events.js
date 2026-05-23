//dom-events.js

import { updateBoardDisplay } from "./render-board.js";
import { gameOvercheck } from "./game-over.js";
import { enemyPlay } from "./computer-play.js";

export function gridClickEventInitilaziation (playerBoard, playerBoardDisplay, compBoard, compBoardDisplay) {

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
    
            // Game over and winner check
            if(gameOvercheck(playerBoard, compBoard)) {
                playerTurn = false;
                return;
            }
            
            setTimeout(() => {
                enemyPlay(playerBoard, playerBoardDisplay);

                // Game over and winner check
                if (gameOvercheck(playerBoard, compBoard)) {
                    playerTurn = false;
                    return;
                }
                playerTurn = true;
            }, 0);

        });
    });
}
