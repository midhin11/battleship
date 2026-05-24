//compShip-placement.js

export function compShipPlacement(compBoard) {
    for(let i = 1; i < 6; i++) {
        let len;
        if(i === 5 ) len = i;
        if(i === 4 || i === 3) len = 4;
        if(i === 2 || i === 1) len = 3;

        let axisNum = Math.floor(Math.random() * 2);
        let axis;
        if(axisNum === 0) axis = "horizontal";
        else axis = "vertical"

        let shipPlaced = false
        while(!shipPlaced) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            shipPlaced = compBoard.placeShip(len, axis, row, col);
        }
    }
}