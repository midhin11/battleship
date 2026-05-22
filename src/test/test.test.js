import { Ship, Gameboard } from "../factories.js";

let board = new Gameboard()

test("Hitting ship", () => {
    let ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.hitCount).toBe(2);
});

test("Sinking ship", () => {
    let ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("placeShip", () => {
    const board = new Gameboard();

    board.placeShip(3, "x-axis", 0, 0);

    expect(board.ships.length).toBe(1);
});

test("ship gets correct coordinates", () => {
    const board = new Gameboard();

    board.placeShip(3, "x-axis", 0, 0);

    expect(board.ships[0].coordinates).toEqual([
        [0,0],
        [1,0],
        [2,0]
    ]);
});

test("overlapping ships", () => {
    const board = new Gameboard();

    board.placeShip(3, "x-axis", 0, 0);
    board.placeShip(2, "y-axis", 0, 0);

    expect(board.ships.length).toBe(1);
});

test("receiveAttack", () => {
    const board = new Gameboard();

    board.placeShip(2, "x-axis", 0, 0);

    board.receiveAttack(0,0);

    expect(board.ships[0].hitCount).toBe(1);
});

test("same coordinate cannot be attacked twice", () => {
    const board = new Gameboard();

    board.placeShip(2, "x-axis", 0, 0);

    board.receiveAttack(0,0);
    board.receiveAttack(0,0);

    expect(board.ships[0].hitCount).toBe(1);
});