// index.js

import "./styles.css";
import { Player } from "./factories.js";
import { renderBoard } from "./render-board.js";
import { gridClickEventInitilaziation } from "./dom-events.js";

let playerOne = new Player();
let playerComp = new Player();

let playerBoard = playerOne.gameboard;
let compBoard = playerComp.gameboard;

playerBoard.placeShip(5, "x-axis", 0, 9);
playerBoard.placeShip(4, "y-axis", 2, 4);
playerBoard.placeShip(4, "y-axis", 8, 1);
playerBoard.placeShip(3, "x-axis", 1, 1);
playerBoard.placeShip(3, "x-axis", 5, 6);

playerBoard.receiveAttack(0,9);

for(let i = 1; i < 6; i++) {
    let len;
    if(i === 5 ) len = i;
    if(i === 4 || i === 3) len = 4;
    if(i === 2 || i === 1) len = 3;

    let axisNum = Math.floor(Math.random() * 2);
    let axis;
    if(axisNum === 0) axis = "x-axis";
    else axis = "y-axis"

    let shipPlaced = false
    while(!shipPlaced) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        shipPlaced = compBoard.placeShip(len, axis, row, col);
    }
}

// compBoard.placeShip(5, "x-axis", 1, 1);
// compBoard.placeShip(4, "y-axis", 7, 3);
// compBoard.placeShip(3, "y-axis", 2, 5);
// compBoard.placeShip(2, "x-axis", 8, 8);
// compBoard.placeShip(1, "x-axis", 4, 9);


let playerBoardDisplay = renderBoard(playerBoard, "Player");
let compBoardDisplay = renderBoard(compBoard, "Computer");

gridClickEventInitilaziation(playerBoard, playerBoardDisplay, compBoard, compBoardDisplay);