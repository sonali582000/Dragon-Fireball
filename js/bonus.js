class Bonus {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 650;
    this.top = Math.ceil(Math.random() * (400 - 60 - 40) + 0);
    this.width = 40;
    this.height = 40;

    this.element = document.createElement("img");
    this.element.src = "images/gem.png";
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
