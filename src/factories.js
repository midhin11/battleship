//factories.js

import { arrayEquals } from "./hepler-functions.js";

export class Ship {
    constructor(length) {
        this.length = length;
        this.coordinates = [];
        this.hitCount = 0;
    }

    hit() {
        if(this.hitCount >= this.length) return;
        this.hitCount++;
    }

    isSunk() {
        return (this.hitCount >= this.length);
    }
}

export class Gameboard {
    constructor() {
        this.shipCount = 0
        this.ships = [];
        this.attacked = [];
        this.occupiedCoordinates = [];
        this.hitCoordinates = [];
        this.missCoordinates = []
    }

    // Ship placement and helper functions
    placeShip(length, direction, x, y) {  
        if(this.shipCount >= 5) return false;
        if(!this.canPlaceShip(length, direction, x, y)) return false;

        let ship = new Ship(length);
        let shipBuilder = this.getCoordinates(length, direction, x, y);

        this.#placeShipCoordinates(shipBuilder, ship);
        this.ships.push(ship);
        this.shipCount++;
        return true;
    }

    #placeShipCoordinates(shipBuilder, ship) {        
        ship.coordinates.push(...shipBuilder);
        this.occupiedCoordinates.push(...shipBuilder);
    }


    //Ship placement coordeates and validate
    getCoordinates(length, direction, x, y) {
        let coordsArr = [];
        for(let i = 0; i < length; i++) {
            if(direction === "vertical") coordsArr.push([x+i, y]);
            else coordsArr.push([x, y+i]); 
        }
        return coordsArr;
    }

    canPlaceShip(length, direction, x, y) {
        let coordsArr = this.getCoordinates(length, direction, x, y)
        for(let coords of coordsArr) {
            if(coords[0] > 9 || coords[1] > 9 || coords[0] < 0 || coords[1] < 0) {
                return false
            }

            let isShipPlaced = this.occupiedCoordinates.some(placedAlready => arrayEquals(placedAlready, coords))
            if(isShipPlaced) return false;
        }

        return true;
    }



    // Recieve attack
    receiveAttack(x, y) {
        let attackCoordinates = [x, y];

        let isAttacked = this.attacked.some(attackedAlready => arrayEquals(attackedAlready, attackCoordinates));
        if(isAttacked) return false;
        else this.attacked.push(attackCoordinates);

        for(let ship of this.ships) {
            for(let curCoordinates of ship.coordinates) {
                if(arrayEquals(curCoordinates, attackCoordinates)){
                    ship.hit();
                    this.hitCoordinates.push([x, y]);
                    return true;
                }
            }
        }

        this.missCoordinates.push([x, y]);
        return true;
    }

}

export class Player {
    constructor() {
        this.gameboard = new Gameboard()
    }
}