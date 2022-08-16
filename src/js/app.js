
let state = initState();
let game = initGameObjects()

game.startScreen.addEventListener("click", (e) => {
    console.log("Game started!")
    game.startScreen.classList.add("hidden");
    game.gameScreen.classList.remove("hidden");
});
