class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEnd = document.getElementById("game-end");
    this.height = 350;
    this.width = 700;
    this.player = null;
    this.obstacles = [];
    this.animationId = null;
    this.bonus = [];
    this.score = 0;
    this.live = 5;
    this.powers = 0;
    this.gameIsOver = false;
    this.higherPoints = 0;
    this.uname = "";
    this.name = localStorage.getItem("name");
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
    document.getElementById("score-board").style.display = "block";
    // document.querySelector(".game-objective").style.backgroundImage = "none";
  }

  gameLoop() {
    this.player.move();

    const nextObstacle = [];
    const power = [];

    this.bonus.forEach((currentBonus) => {
      currentBonus.move();
      if (currentBonus.left > 0) {
        if (this.player.didCollide(currentBonus)) {
          const imgNum = Math.floor(Math.random() * (12 - 2 + 1) + 2);
          this.player.element.src = `images/dragon${imgNum}.png`;
          this.powers += 5;
          currentBonus.element.remove();
        } else {
          power.push(currentBonus);
        }
      } else {
        currentBonus.element.remove();
      }
    });
    this.bonus = power;
    console.log(this.name);

    this.obstacles.forEach((currentObstacle) => {
      currentObstacle.move();
      if (currentObstacle.left > 0) {
        if (this.player.didCollide(currentObstacle)) {
          currentObstacle.element.remove();
          this.live -= 1;
        } else {
          nextObstacle.push(currentObstacle);
        }
      } else {
        currentObstacle.element.remove();
        this.score += 10;
      }
    });
    this.obstacles = nextObstacle;
    console.log(this.obstacles);
    if (this.gameIsOver) {
      return;
    }
    if (this.animationId % 120 === 0) {
      this.obstacles.push(new Obstacles(this.gameScreen));
    }

    if (this.animationId % 500 === 0) {
      this.bonus.push(new Bonus(this.gameScreen));
    }

    this.animationId = window.requestAnimationFrame(() => this.gameLoop());

    if (this.live > 0) {
      document.getElementById("score").innerText = this.score;
    } else {
      this.gameIsOver = true;
      this.gameScreen.style.display = "none";
      this.gameEnd.style.display = "block";
      if (this.score > this.higherPoints) {
        this.higherPoints = this.score;
        this.uname = this.name;
        document.getElementById("hpoints").innerText = this.higherPoints;
        document.getElementById("name").innerText = this.uname;
        localStorage.setItem("Username", this.uname);
        localStorage.setItem("HighestPoint", this.higherPoints);
      } else {
        const Username = localStorage.getItem("Username");
        const HighestPoint = localStorage.getItem("HighestPoint");
        document.getElementById("hpoints").innerText = HighestPoint;
        document.getElementById("name").innerText = Username;
      }

      console.log(Username, HighestPoint);
    }

    document.getElementById("lives").innerText = this.live;
    document.getElementById("power").innerText = this.powers;
  }
}
