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
        this.placedShip = [];
    }
    

    placeShip(length, direction, x, y) {
        if(this.shipCount > 5) return;

        let ship = new Ship(length);
        let placedCordinates = false

        if(direction === "x-axis") {
            let shipBuilder = [];

            for(let i = 0; i < ship.length; i++) {
                let current = [x+i, y]; 
                shipBuilder.push(current);  
            }

            placedCordinates = this.#placeShipCoordinates(shipBuilder, ship);
        }

        if(direction === "y-axis") {
            let shipBuilder = [];
            
            for(let i = 0; i < ship.length; i++) {
                let current = [x, y+i];
                shipBuilder.push(current);
            }

            placedCordinates = this.#placeShipCoordinates(shipBuilder, ship);
        }

        if(placedCordinates) {
            this.ships.push(ship);
            this.shipCount++;
        }
    }

    #placeShipCoordinates(shipBuilder, ship) {        
        for(let coordinates of shipBuilder) {
            let isShipPlaced = this.placedShip.some(placedAlready => arrayEquals(placedAlready, coordinates));
            if(isShipPlaced) return false;
        }

        ship.coordinates.push(...shipBuilder);
        this.placedShip.push(...shipBuilder);
        return true;
    }


    receiveAttack(x, y) {
        let attackCoordinates = [x, y];

        let isAttacked = this.attacked.some(attackedAlready => arrayEquals(attackedAlready, attackCoordinates));
        if(isAttacked) return;
        else this.attacked.push(attackCoordinates);

        for(let ship of this.ships) {
            for(let curCoordinates of ship.coordinates) {
                if(arrayEquals(curCoordinates, attackCoordinates)){
                    ship.hit();
                    return;
                }
            }
        }
    }

}