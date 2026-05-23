//dom-events.js

import { renderBoard, hitDisplay, missDisplay, displayShips, isSunkDisplay } from "./render-board.js";

export function gridClickEventInitilaziation (playerBoard, playerBoardDisplay, compBoard, compBoardDisplay) {
    let compGrids = document.querySelectorAll(".comp");
    compGrids.forEach(grid => {
        grid.addEventListener("click", () => {
            let row = Number(grid.dataset.row);
            let col = Number(grid.dataset.col);
            
            if(!compBoard.receiveAttack(row, col)) return;

            hitDisplay(compBoard, compBoardDisplay);
            missDisplay(compBoard, compBoardDisplay);
            isSunkDisplay(compBoard, compBoardDisplay);

            enemyPlay(playerBoard, playerBoardDisplay);
            
        });
    });
}

function enemyPlay(playerBoard, playerBoardDisplay) {

    let successfulAttack = false

    while(!successfulAttack){
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        successfulAttack = playerBoard.receiveAttack(row, col);
    }

    hitDisplay(playerBoard, playerBoardDisplay);
    missDisplay(playerBoard, playerBoardDisplay);
    isSunkDisplay(playerBoard, playerBoardDisplay);

}