function color(color) {
  if (color == 1) {
    return healthyColor();
  } else if (color == 0) {
    return injuredColor();
  }
}

function healthyColor() {
  let red = 0;
  let green = 255;
  let blue = 0;

  let rc = "rgb(" + red + ", " + green + ", " + blue + ")";
  return rc;
}

function injuredColor() {
  let red = 255;
  let green = 0;
  let blue = 0;

  let rc = "rgb(" + red + ", " + green + ", " + blue + ")";
  return rc;
}
function xCoordinate() {
  // random position x
  let x = Math.floor(Math.random() * canvas.width);
  if (x < 30) {
    x = 30;
  } else if (x + 30 > canvas.width) {
    x = canvas.width - 30;
  }
  return x;
}

function yCoordinate() {
  // random position y
  let y = Math.floor(Math.random() * canvas.height);
  if (y < 30) {
    y = 30;
  } else if (y + 30 > canvas.height) {
    y = canvas.height - 30;
  }
  return y;
}
function raduius() {
  let r = 5;

  return r;
}
// randomDx for the next position in X - coordinate
function randomDx() {
  let r = Math.floor(Math.random() * 10 - 4);
  return r;
}
// randomDx for the next position in Y - coordinate
function randomDy() {
  let r = Math.floor(Math.random() * 10 - 3);
  return r;
}

function distanceNextFrame(a, b) {
  return (
    Math.sqrt((a.x + a.dx - b.x - b.dx) ** 2 + (a.y + a.dy - b.y - b.dy) ** 2) -
    a.radius -
    b.radius
  );
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
