//render-board.js
import { main, gameContainer } from "./selectors.js";

export function renderBoard(board, player) {
    let playerContainer = document.createElement("div");
    let playerName = document.createElement("div");
    playerContainer.classList.add("player-container");

    if(player === "Player") playerName.textContent = "Player One";
    else playerName.textContent = "Computer";

    let boardDisplay = document.createElement("div");
    boardDisplay.classList.add("board");

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let grid = document.createElement("div");
            grid.classList.add("grid");
            grid.setAttribute("data-row", `${i}`);
            grid.setAttribute("data-col", `${j}`);
            boardDisplay.append(grid);
        }
    }

    playerContainer.append(playerName);
    playerContainer.append(boardDisplay);
    gameContainer.append(playerContainer);

    // Displaying ships on board
    for (let ship of board.ships) {
        for(let coords of ship.coordinates) {
            let [row, col] = coords; 
            let shipGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
            shipGrid.style.backgroundColor = "gray";
        }
    }

    //Displaying hits on board
    for(let hitCoords of board.hitCoordinates) {
        let [row, col] = hitCoords;
        let hitGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
        hitGrid.style.backgroundColor = "red";
    }

    //Displaying misses on board
    for(let missCoords of board.missCoordinates) {
        let [row, col] = missCoords;
        let hitGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
        hitGrid.style.backgroundColor = "green";
    }
}