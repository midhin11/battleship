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

        let ship = new Ship(length);
        let placedCoordinates = false
        let shipBuilder = [];

        if(direction === "x-axis") {
            if(!this.#boundaryValidate(length, direction, x, y)) return false;

            for(let i = 0; i < ship.length; i++) {
                let current = [x+i, y]; 
                shipBuilder.push(current);  
            }

            placedCoordinates = this.#placeShipCoordinates(shipBuilder, ship);
        }

        if(direction === "y-axis") {
            if(!this.#boundaryValidate(length, direction, x, y)) return false;
            
            for(let i = 0; i < ship.length; i++) {
                let current = [x, y+i];
                shipBuilder.push(current);
            }

            placedCoordinates = this.#placeShipCoordinates(shipBuilder, ship);
        }

        if(placedCoordinates) {
            this.ships.push(ship);
            this.shipCount++;
            return true;
        }

        return false;
    }

    #boundaryValidate(length, direction, x, y) {  // 5, x, 5, 0
        if(direction === "x-axis") {
            if(x + length -1 > 9) return false;
        }

        if(direction === "y-axis") {
            if(y + length -1 > 9) return false;
        }

        return true;
    }

    #placeShipCoordinates(shipBuilder, ship) {        
        for(let coordinates of shipBuilder) {
            let isShipPlaced = this.occupiedCoordinates.some(placedAlready => arrayEquals(placedAlready, coordinates));
            if(isShipPlaced) return false;
        }

        ship.coordinates.push(...shipBuilder);
        this.occupiedCoordinates.push(...shipBuilder);
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