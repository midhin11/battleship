//computer-play.js

import { updateBoardDisplay } from "./renders/render-board.js";
import { arrayEquals } from "./hepler-functions.js";

export function computerPlay(playerBoard, playerBoardDisplay) {

    let successfulAttack = false;

    while(!successfulAttack){

        let hitCoords = playerBoard.hitCoordinates;
        let row, col;
        let lastHitCoords = hitCoords[hitCoords.length - 1];
        let secLastHitCoords = hitCoords[hitCoords.length - 2];

        if(hitCoords.length >= 2) {
            let lastHitShip = findLastHitShip(playerBoard, lastHitCoords);

            if(!lastHitShip.isSunk()) {
                let sameRow = lastHitCoords[0] === secLastHitCoords[0];
                let sameCol = lastHitCoords[1] === secLastHitCoords[1];

                if(sameRow || sameCol) {

                    let rowDiff = Math.sign(lastHitCoords[0] - secLastHitCoords[0]);
                    let colDiff = Math.sign(lastHitCoords[1] - secLastHitCoords[1]);

                    // forward direction
                    let nextRow = lastHitCoords[0] + rowDiff;
                    let nextCol = lastHitCoords[1] + colDiff;
                    let forwardValid = nextRow >= 0 && nextRow <= 9 && nextCol >= 0 &&nextCol <= 9;

                    // reverse direction
                    let reverseRow = secLastHitCoords[0] - rowDiff;
                    let reverseCol = secLastHitCoords[1] - colDiff;
                    let reverseValid = reverseRow >= 0 && reverseRow <= 9 &&reverseCol >= 0 && reverseCol <= 9;

                    // try forward first
                    if(
                        forwardValid &&
                        !playerBoard.attacked.some(coords =>
                            arrayEquals(coords, [nextRow, nextCol])
                        )
                    ) {
                        row = nextRow;
                        col = nextCol;
                    }

                    // otherwise reverse direction
                    else if(
                        reverseValid &&
                        !playerBoard.attacked.some(coords =>
                            arrayEquals(coords, [reverseRow, reverseCol])
                        )
                    ) {
                        row = reverseRow;
                        col = reverseCol;
                    }

                    // fallback random
                    else {
                        row = Number(Math.floor(Math.random() * 10));
                        col = Number(Math.floor(Math.random() * 10));
                    }
                }

                else {

                    let generatedCoords = generateCoords(
                        lastHitCoords[0],
                        lastHitCoords[1]
                    );

                    if(
                        generatedCoords[0] > 9 ||
                        generatedCoords[0] < 0 ||
                        generatedCoords[1] > 9 ||
                        generatedCoords[1] < 0
                    ) {

                        row = Number(Math.floor(Math.random() * 10));
                        col = Number(Math.floor(Math.random() * 10));
                    }

                    else {

                        [row, col] = generatedCoords;
                    }
                }
            }

            else {
                row = Number(Math.floor(Math.random() * 10));
                col = Number(Math.floor(Math.random() * 10));
            }
        }

        else if(hitCoords.length === 1) {
            let generatedCoords = generateCoords(
                lastHitCoords[0],
                lastHitCoords[1]
            );

            if(
                generatedCoords[0] > 9 ||
                generatedCoords[0] < 0 ||
                generatedCoords[1] > 9 ||
                generatedCoords[1] < 0
            ) {
                row = Number(Math.floor(Math.random() * 10));
                col = Number(Math.floor(Math.random() * 10));
            }

            else {
                [row, col] = generatedCoords;
            }
        }

        else {
            row = Number(Math.floor(Math.random() * 10));
            col = Number(Math.floor(Math.random() * 10));
        }

        successfulAttack = playerBoard.receiveAttack(row, col);
    }

    updateBoardDisplay(playerBoard, playerBoardDisplay);
}

function generateCoords (row, col) {
    let randArr = [
        [row, col + 1],
        [row, col - 1],
        [row + 1, col],
        [row - 1, col]
    ]
    let rand = Math.floor(Math.random() * 4);
    return randArr[rand];
}

function findLastHitShip(playerBoard, lastHitCoords) {
    for(let ship of playerBoard.ships) {
        for(let coords of ship.coordinates) {
            if(arrayEquals(coords, lastHitCoords)){
                return ship;
            }
        }
    }
}