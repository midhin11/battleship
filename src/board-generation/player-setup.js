//player-setup.js

export function setupPlayer(playerBoard) {
    
    playerBoard.placeShip(5, "x-axis", 0, 9);
    playerBoard.placeShip(4, "y-axis", 2, 4);
    playerBoard.placeShip(4, "y-axis", 8, 1);
    playerBoard.placeShip(3, "x-axis", 1, 1);
    playerBoard.placeShip(3, "x-axis", 5, 6);
    
    playerBoard.receiveAttack(0,9);
}