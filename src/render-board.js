//render-board.js
import { gameContainer } from "./selectors.js";

export function renderBoard(board, player) {
    let inGameContainer = document.createElement("div");
    let playerName = document.createElement("div");
    let boardDisplay = document.createElement("div");
    boardDisplay.classList.add("board");

    if(player === "Player") {
        inGameContainer.classList.add("player-container");
        playerName.textContent = "Player One";
        boardDisplay.classList.add("player-board");
    }
    else {
        inGameContainer.classList.add("comp-container");
        playerName.textContent = "Computer";
        boardDisplay.classList.add("comp-board");
    }


    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let grid = document.createElement("div");
            if(player === "Player") grid.classList.add("player");
            else grid.classList.add("comp");
            grid.classList.add("grid");
            grid.setAttribute("data-row", `${i}`);
            grid.setAttribute("data-col", `${j}`);
            boardDisplay.append(grid);
        }
    }

    inGameContainer.append(playerName);
    inGameContainer.append(boardDisplay);
    gameContainer.append(inGameContainer);

    // Displaying ships on board
    displayShips(board, boardDisplay);

    //Displaying hits on board
    hitDisplay(board, boardDisplay);

    //Displaying misses on board
    missDisplay(board, boardDisplay);

    //Display sunk as red on board
    isSunkDisplay(board, boardDisplay);

    return boardDisplay;
}


export function displayShips(board, boardDisplay) {
    for (let ship of board.ships) {
        for(let coords of ship.coordinates) {
            let [row, col] = coords; 
            let shipGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
            shipGrid.style.backgroundColor = "gray";
        }
    }
}

export function hitDisplay(board, boardDisplay) {
    for(let hitCoords of board.hitCoordinates) {
        let [row, col] = hitCoords;
        let hitGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
        hitGrid.style.backgroundColor = "green";
    }
}

export function missDisplay(board, boardDisplay) {
    for(let missCoords of board.missCoordinates) {
        let [row, col] = missCoords;
        let missGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
        missGrid.style.backgroundColor = "blue";
    }
}

export function isSunkDisplay(board, boardDisplay) {
    for(let ship of board.ships) {
        if(ship.isSunk()) {
            for(let coords of ship.coordinates) {
                let [row, col] = coords; 
                let sunkGrid = boardDisplay.querySelector(`.grid[data-row="${row}"][data-col="${col}"]`);
                sunkGrid.style.backgroundColor = "red";
            }
        }
    }
}