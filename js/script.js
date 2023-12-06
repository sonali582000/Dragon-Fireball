window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    // startGame()
    location.reload();
    window.location.href = "./index.html";
  });

  function startGame() {
    game = new Game();
    game.start();
    console.log("start game");
  }
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
      game.player.directionY = -1;
    } else if (event.code === "ArrowDown" || event.code === "KeyS") {
      game.player.directionY = 1;
    } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
      game.player.directionX = -1;
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
      game.player.directionX = 1;
    }
  });

  document.addEventListener("keyUp", (event) => {
    if (
      event.code === "ArrowUp" ||
      event.code === "KeyW" ||
      event.code === "ArrowDown" ||
      event.code === "KeyS"
    ) {
      game.player.directionY = 0;
    } else if (
      event.code === "ArrowLeft" ||
      event.code === "KeyA" ||
      event.code === "ArrowRight" ||
      event.code === "KeyD"
    ) {
      game.player.directionX = 0;
    }
  });
};
