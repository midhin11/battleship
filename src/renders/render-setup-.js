// render-setup.js

import { hitDisplay, missDisplay, isSunkDisplay, updateBoardDisplay } from "./render-game.js";
import { gameContainer } from "../selectors.js";

export function renderSetup(board, startGame) {
    // let playerSetupContainer = document.createElement("div");
    // gameContainer.append(playerSetupContainer);
    // playerSetupContainer.classList.add("player-setup-container");
    gameContainer.classList.remove("game-container");
    gameContainer.classList.add("setup-container");

    let setupPanel = document.createElement("div");
    setupPanel.classList.add("setup-panel");
    gameContainer.append(setupPanel);

    let row, col;
    let direction = "horizontal"
    let lengthArr = [5, 4, 4, 3, 3];
    let curlengthIndex = 0;


    let placeShip = document.createElement("div");
    placeShip.textContent = "PLACE YOUR SHIPS";
    placeShip.classList.add("place-ship");
    setupPanel.append(placeShip);


    let currentShipLength = document.createElement("div");
    currentShipLength.textContent = `Current Ship Length: ${lengthArr[curlengthIndex]}`;
    currentShipLength.classList.add("curr-len");
    setupPanel.append(currentShipLength);


    let currDirection = document.createElement("div");
    currDirection.textContent = `Current Direction: ${direction}`;
    currDirection.classList.add("curr-dir");
    setupPanel.append(currDirection);


    let roatateShip = document.createElement("button");
    roatateShip.textContent = `Rotate Ship`;
    roatateShip.classList.add("rotate-btn");
    roatateShip.addEventListener("click", () => {
        direction = (direction === "horizontal") ? "vertical" : "horizontal";
        currDirection.textContent = `Current Direction: ${direction}`;
    })
    setupPanel.append(roatateShip);
    

    let setupBoard = document.createElement("div");
    setupBoard.classList.add("setup-board");
    setupPanel.append(setupBoard);

    let startBtn = document.createElement("button");
    startBtn.textContent = `Start Game`;
    startBtn.classList.add("start-btn");
    startBtn.disabled = true
    startBtn.addEventListener("click", () => {
        startGame(gameContainer);
    })
    setupPanel.append(startBtn);

    // Grid generation for board
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            let grid = document.createElement("div");
            grid.classList.add("setup-grid");
            grid.setAttribute("data-row", `${i}`);
            grid.setAttribute("data-col", `${j}`);
            setupBoard.append(grid);
        }
    }
    
    // On click actions
    let grids = setupBoard.querySelectorAll(".setup-grid") 
    grids.forEach(grid => {
        grid.addEventListener("click", (e) => {
            let length = lengthArr[curlengthIndex];
            row = Number(e.target.dataset.row);
            col = Number(e.target.dataset.col);
            
            let coordsList = board.getCoordinates(length, direction, row, col) 
            coordsList.forEach(coords => {
                let curGrid = setupBoard.querySelector(`.setup-grid[data-row="${coords[0]}"][data-col="${coords[1]}"]`);

                if(!curGrid) return;
                curGrid.classList.remove("preview-valid", "preview-invalid")
            })


            let shipPlaced = board.placeShip(length, direction, row, col);
            if(!shipPlaced) return;
            curlengthIndex++;
            if(lengthArr[curlengthIndex] !== undefined) {
                currentShipLength.textContent = `Current Ship Length: ${lengthArr[curlengthIndex]}`;
            }
            else {
                currentShipLength.textContent = `ALL SHIPS PLACED`;
                currDirection.textContent = `GET READY FOR BATTLE!`;
                startBtn.disabled = false;
                roatateShip.disabled = true;
            }

            displayShips(board, setupBoard);    
        })
    })

    //mousenter acion
    grids.forEach(grid => {
        grid.addEventListener("mouseenter", (e) => {
            row = Number(e.target.dataset.row);
            col = Number(e.target.dataset.col);
            let length = lengthArr[curlengthIndex];

            let coordsList = board.getCoordinates(length, direction, row, col) 
            let valid = board.canPlaceShip(length, direction, row, col);

            coordsList.forEach(coords => {
                let curGrid = setupBoard.querySelector(`.setup-grid[data-row="${coords[0]}"][data-col="${coords[1]}"]`);
                
                if(!curGrid) return;
                if(valid) curGrid.classList.add("preview-valid");
                else curGrid.classList.add("preview-invalid");
            })
        })
    })

    //mouseleave action
    grids.forEach(grid => {
        grid.addEventListener("mouseleave", (e) => {
            row = Number(e.target.dataset.row);
            col = Number(e.target.dataset.col);
            let length = lengthArr[curlengthIndex];
            let coordsList = board.getCoordinates(length, direction, row, col) 
            coordsList.forEach(coords => {
                let curGrid = setupBoard.querySelector(`.setup-grid[data-row="${coords[0]}"][data-col="${coords[1]}"]`);

                if(!curGrid) return;
                curGrid.classList.remove("preview-valid", "preview-invalid")
            })
        })
    })
    
}


export function displayShips(board, boardDisplay) {
    for (let ship of board.ships) {
        for(let coords of ship.coordinates) {
            let [row, col] = coords; 
            let shipGrid = boardDisplay.querySelector(`.setup-grid[data-row="${row}"][data-col="${col}"]`);
            shipGrid.classList.add("ship");
        }
    }
}