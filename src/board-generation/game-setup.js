//game-setup.js
import { displayShips } from "../renders/render-board.js";

import { Player } from "../factories.js";
import { compShipPlacement } from "./compShip-placement.js";
import { renderGameScreen } from "../renders/render-game.js"; 
import { renderSetup } from "../renders/render-setup-.js";
import { gridClickEventInitilaziation } from "../dom-events.js";
import { gameContainer } from "../selectors.js";


export function setupGame() {

    let playerOne = new Player();
    let playerComp = new Player();
    
    let playerBoard = playerOne.gameboard;
    let compBoard = playerComp.gameboard;

    renderSetup(playerBoard, startGame);


    function startGame(gameContainer) {
        compShipPlacement(compBoard);

        let {playerBoardDisplay, compBoardDisplay, restartBtn} = renderGameScreen(playerBoard, compBoard);

        restartBtn.disabled = true;
        restartBtn.addEventListener("click", () => {
            setupGame();
        });

        gridClickEventInitilaziation(playerBoard, playerBoardDisplay, compBoard, compBoardDisplay, restartBtn);
    }
}
