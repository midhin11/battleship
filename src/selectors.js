//selectors.js

let main = document.querySelector(".main");
let gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
main.append(gameContainer);

export { main, gameContainer};