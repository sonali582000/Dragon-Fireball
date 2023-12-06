class Obstacles {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 550;
    this.top = Math.floor(Math.random() * (220 - 50 - 0) + 0);
    this.width = 50;
    this.height = 30;
    this.element = document.createElement("img");
    this.element.src = "images/arrow.png";
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.left -= 1;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
