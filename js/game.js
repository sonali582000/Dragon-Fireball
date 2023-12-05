class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.height = 220;
    this.width = 600;
    this.player = null;
    this.obstacles = [];
    this.animationId = null;
    this.bonus = [];
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.player = new Player(this.gameScreen);
    this.obstacles.push(new Obstacles(this.gameScreen));
    this.bonus.push(new Bonus(this.gameScreen));
    this.gameLoop();
  }

  gameLoop() {
    this.player.move();

    const nextObstacle = [];
    const power = [];

    this.bonus.forEach((currentBonus) => {
      currentBonus.move();
      if (currentBonus.left > -40) {
        if (this.player.didCollide(currentBonus)) {
          const imgNum = Math.floor(Math.random() * (8 - 2 + 1) + 2);
          this.player.element.src = `images/dragon${imgNum}.png`;
          currentBonus.element.remove();
        } else {
          power.push(currentBonus);
        }
      } else {
        currentBonus.element.remove();
      }
    });
    this.bonus = power;

    this.obstacles.forEach((currentObstacle) => {
      currentObstacle.move();
      if (currentObstacle.left > -50) {
        if (this.player.didCollide(currentObstacle)) {
          currentObstacle.element.remove();
        } else {
          nextObstacle.push(currentObstacle);
        }
      } else {
        currentObstacle.element.remove();
      }
    });
    this.obstacles = nextObstacle;

    if (this.gameIsOver) {
      return;
    }
    if (this.animationId % 250 === 0) {
      this.obstacles.push(new Obstacles(this.gameScreen));
    }

    if (this.animationId % 500 === 0) {
      this.bonus.push(new Bonus(this.gameScreen));
    }

    this.animationId = window.requestAnimationFrame(() => this.gameLoop());
  }
}
