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
    const startGame = new Audio("sounds/start-game.mp3");
    startGame.play();
    setTimeout(function () {
      game.start();
    }, 1000);
    setInterval(function () {
      const bgNum = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      document.querySelector(
        "#game-screen"
      ).style.backgroundImage = `url(images/bg-img${bgNum}.jpg`;
      console.log("Hi from scriptjs file");
    }, 20000);
  }
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
      game.player.directionY = -1;
      const upArrow = new Audio("sounds/up.mp3");
      upArrow.play();
    } else if (event.code === "ArrowDown" || event.code === "KeyS") {
      game.player.directionY = 1;
      const downArrow = new Audio("sounds/drop.mp3");
      downArrow.play();
    } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
      game.player.directionX = -1;
      const leftArrow = new Audio("sounds/left.wav");
      leftArrow.play();
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
      game.player.directionX = 1;
      const rightArrow = new Audio("sounds/right.wav");
      rightArrow.play();
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
