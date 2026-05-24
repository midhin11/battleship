//game-setup.js
import { displayShips } from "../renders/render-game.js";

import { Player } from "../factories.js";
import { compShipPlacement } from "./compShip-placement.js";
import { renderGame } from "../renders/render-game.js";
import { renderSetup } from "../renders/render-setup-.js";
import { gridClickEventInitilaziation } from "../dom-events.js";


export function setupGame() {

    let playerOne = new Player();
    let playerComp = new Player();
    
    let playerBoard = playerOne.gameboard;
    let compBoard = playerComp.gameboard;

    renderSetup(playerBoard, startGame);

    function startGame(gameContainer) {
        compShipPlacement(compBoard);

        gameContainer.innerHTML = "";
        gameContainer.classList.remove("setup-container");
        gameContainer.classList.add("game-container");

        let playerBoardDisplay = renderGame(playerBoard, "Player");
        let compBoardDisplay = renderGame(compBoard, "Computer");

        gridClickEventInitilaziation(playerBoard, playerBoardDisplay, compBoard, compBoardDisplay);
    }
}