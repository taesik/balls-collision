class Ball {

  constructor(x, y,  col) {
    this.radius = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    this.x = x;
    this.y = y;

    this.dx = randomDx();
    this.dy = randomDy();

    this.mass = this.radius * this.radius * this.radius;
    this.color = color(col);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      Math.round(this.x),
      Math.round(this.y),
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
    ctx.stroke();
    ctx.closePath();
  }

  changeColor() {
    this.color = injuredColor();
  }

  speed() {
    // magnitude of velocity vector
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }
  angle() {
    // velocity's angle with the x axis
    return Math.atan2(this.dy, this.dx);
  }
  onGround() {
    return this.y + this.radius >= canvas.height;
  }
}
