import { gameContainer,  statusBar } from "../selectors.js";

import { renderBoard } from "./render-board.js";

export function renderGameScreen(playerBoard, compBoard) {

    gameContainer.innerHTML = "";
    gameContainer.classList.remove("setup-container");
    gameContainer.classList.add("game-container");
    statusBar.style.display = "block";
    statusBar.textContent = "PLAYER TURN";

    let playerRender = renderBoard(playerBoard, "Player");
    let compRender = renderBoard(compBoard, "Computer");

    let boardsWrapper = document.createElement("div");
    boardsWrapper.classList.add("board-wrapper");
    boardsWrapper.append(playerRender.container, compRender.container);

    let legend = document.createElement("div");
    legend.classList.add("legend");
    legend.innerHTML = `
    <div class="legend-item">
        <div class="legend-box miss"></div>
        <span>Miss</span>
    </div>

    <div class="legend-item">
        <div class="legend-box hit"></div>
        <span>Hit</span>
    </div>

    <div class="legend-item">
        <div class="legend-box sunk"></div>
        <span>Sunk</span>
    </div>
    `;

    let controls = document.createElement("div");
    controls.classList.add("game-controls");
    let restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart";
    restartBtn.classList.add("restart-btn");
    controls.append(restartBtn);

    gameContainer.append(boardsWrapper, legend, controls);

    return {
        playerBoardDisplay: playerRender.boardDisplay,
        compBoardDisplay: compRender.boardDisplay,
        restartBtn,
        statusBar
    };
}