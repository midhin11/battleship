//game-over.js

export function gameOver(playerBoard, compBoard) {
    let allPlayerSunk = playerShipsSunk(playerBoard);
    let allCompSunk = compShipsSunk(compBoard);


    if(allPlayerSunk || allCompSunk) return true;
    return false; 
}

export function playerWinCheck(playerBoard, compBoard) {
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
