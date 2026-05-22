// index.js

import "./styles.css";
import { Ship, Gameboard, Player } from "./factories.js";
import { renderBoard } from "./render-board.js";

let playerOne = new Player();
let playerComp = new Player();

let playerBoard = playerOne.gameboard;
let compBoard = playerComp.gameboard;

playerBoard.placeShip(5, "x-axis", 0, 9);
playerBoard.placeShip(4, "y-axis", 2, 4);
playerBoard.placeShip(3, "y-axis", 7, 2);
playerBoard.placeShip(2, "x-axis", 1, 1);
playerBoard.placeShip(1, "x-axis", 5, 6);

compBoard.placeShip(5, "x-axis", 1, 1);
compBoard.placeShip(4, "y-axis", 7, 3);
compBoard.placeShip(3, "y-axis", 2, 5);
compBoard.placeShip(2, "x-axis", 8, 8);
compBoard.placeShip(1, "x-axis", 4, 9);
compBoard.receiveAttack(1, 1);
compBoard.receiveAttack(2, 1);
compBoard.receiveAttack(2, 2);


renderBoard(playerBoard, "Player");
renderBoard(compBoard, "Computer");