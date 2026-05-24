// index.js

import "./styles/styles.css";
import { Player } from "./factories.js";
import { compShipPlacement } from "./board-generation/compShip-placement.js";
import { renderGame } from "./render-game.js";
import { gridClickEventInitilaziation } from "./dom-events.js";
import { setupPlayer } from "./board-generation/player-setup.js";

let playerOne = new Player();
let playerComp = new Player();

let playerBoard = playerOne.gameboard;
setupPlayer(playerBoard);

let compBoard = playerComp.gameboard;
compShipPlacement(compBoard);

let playerBoardDisplay = renderGame(playerBoard, "Player");
let compBoardDisplay = renderGame(compBoard, "Computer");

gridClickEventInitilaziation(playerBoard, playerBoardDisplay, compBoard, compBoardDisplay);