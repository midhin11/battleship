//game-over.js

import { statusBar } from "./selectors.js";

export function gameOvercheck(playerBoard, compBoard) {
    if(!gameOver(playerBoard, compBoard)) {
        return false;
    }

    if(playerWinCheck(playerBoard)) statusBar.textContent = "YOU WIN!";
    else statusBar.textContent = "YOU LOSE!";

    return true;
}

export function gameOver(playerBoard, compBoard) {
    let allPlayerSunk = playerShipsSunk(playerBoard);
    let allCompSunk = compShipsSunk(compBoard);


    if(allPlayerSunk || allCompSunk) return true;
    return false; 
}

export function playerWinCheck(playerBoard) {
    if(playerShipsSunk(playerBoard)) return false;
    else return true;
} 


function playerShipsSunk(playerBoard) {
    return playerBoard.ships.every(ship => {
        if(ship.isSunk()) return true;
        return false;
    })
}

function compShipsSunk(compBoard) {
    return compBoard.ships.every(ship => {
        if(ship.isSunk()) return true;
        return false;
    })
}
