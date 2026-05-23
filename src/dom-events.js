//dom-events.js

import { renderBoard, hitDisplay, missDisplay, displayShips, isSunkDisplay } from "./render-board.js";

export function gridClickEventInitilaziation (playerBoard, playerBoardDisplay, compBoard, compBoardDisplay) {
    let compGrids = document.querySelectorAll(".comp");
    compGrids.forEach(grid => {
        grid.addEventListener("click", () => {
            let row = Number(grid.dataset.row);
            let col = Number(grid.dataset.col);
            compBoard.receiveAttack(row, col);

            hitDisplay(compBoard, compBoardDisplay);
            missDisplay(compBoard, compBoardDisplay);
            isSunkDisplay(compBoard, compBoardDisplay);

            // let randRow = Math.floor(Math.random() * 10);
            // let randCol = Math.floor(Math.random() * 10);

        });
    });
}
