let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let ballArray = []; // array for creating the balles based on people number
let countOfBalls = Math.floor(Math.random() * (20 - 10 + 1) + 10); // number of people in city

// assume canvas is clear
let clearCanv = true;

// time data for drawing
let lastTime = new Date().getTime();
let currentTime = 0;
let dt = 0; // for drawing delta time

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasBackground() {
  canvas.style.backgroundColor = "rgb(255, 255, 255)";
}

function drawObjects() {
  for (let obj in ballArray) {
    ballArray[obj].draw();
  }
}

function moveObjects() {
  // here we change the x-coordinate and y-coordinate randomly but the balls while get out of the canvase
  // we should add the collision with wall of canvase
  for (let i = 0; i < ballArray.length; i++) {
    let ob = ballArray[i];
    ob.x += (ob.dx * dt) / 2;
    ob.y += (ob.dy * dt) / 2;
  }
}

function wallCollision(ball) {
  if (
    ball.x - ball.radius + ball.dx < 0 ||
    ball.x + ball.radius + ball.dx > canvas.width
  ) {
    ball.dx *= -1;
  }
  if (
    ball.y - ball.radius + ball.dy < 0 ||
    ball.y + ball.radius + ball.dy > canvas.height
  ) {
    ball.dy *= -1;
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
  }
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
  }
  if (ball.x + ball.radius > canvas.width) {
    ball.x = canvas.width - ball.radius;
  }
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
  }
}

function ballCollision() {
  // here tha main function for collision
  for (let i = 0; i < ballArray.length; i++) {
    for (let j = i + 1; j < ballArray.length; j++) {
      let ob1 = ballArray[i];
      let ob2 = ballArray[j];
      let dist = distance(ob1, ob2);

      if (dist < ob1.radius + ob2.radius) {
        // here when the balls are collision
        // console.log("balls collision");

        let theta1 = ob1.angle();
        let theta2 = ob2.angle();
        let phi = Math.atan2(ob2.y - ob1.y, ob2.x - ob1.x);
        let m1 = ob1.mass;
        let m2 = ob2.mass;
        let v1 = ob1.speed();
        let v2 = ob2.speed();

        let dx1F =
          ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - phi)) /
            (m1 + m2)) *
            Math.cos(phi) +
          v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
        let dy1F =
          ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - phi)) /
            (m1 + m2)) *
            Math.sin(phi) +
          v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
        let dx2F =
          ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - phi)) /
            (m1 + m2)) *
            Math.cos(phi) +
          v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
        let dy2F =
          ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - phi)) /
            (m1 + m2)) *
            Math.sin(phi) +
          v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

        ob1.dx = dx1F;
        ob1.dy = dy1F;
        ob2.dx = dx2F;
        ob2.dy = dy2F;

        staticCollision(ob1, ob2);
      }
    }
    wallCollision(ballArray[i]);
  }

  if (ballArray.length > 0) wallCollision(ballArray[ballArray.length - 1]);
}

function staticCollision(ob1, ob2, emergency = false) {
  let overlap = ob1.radius + ob2.radius - distance(ob1, ob2);
  let smallerObject = ob1.radius < ob2.radius ? ob1 : ob2;
  let biggerObject = ob1.radius > ob2.radius ? ob1 : ob2;

  // When things go normally, this line does not execute.
  // "Emergency" is when staticCollision has run, but the collision
  // still hasn't been resolved. Which implies that one of the objects
  // is likely being jammed against a corner, so we must now move the OTHER one instead.
  // in other words: this line basically swaps the "little guy" role, because
  // the actual little guy can't be moved away due to being blocked by the wall.
  if (emergency) [smallerObject, biggerObject] = [biggerObject, smallerObject];

  let theta = Math.atan2(
    biggerObject.y - smallerObject.y,
    biggerObject.x - smallerObject.x
  );
  smallerObject.x -= overlap * Math.cos(theta);
  smallerObject.y -= overlap * Math.sin(theta);

  if (distance(ob1, ob2) < ob1.radius + ob2.radius) {
    // we don't want to be stuck in an infinite emergency.
    // so if we have already run one emergency round; just ignore the problem.
    if (!emergency) staticCollision(ob1, ob2, true);
  }
}

function applyGravity() {
  for (let obj in ballArray) {
    let ob = ballArray[obj];
    if (ob.onGround() == false) {
      ob.dy += 0.29;
    }

    // apply basic drag
    ob.dx *= 0.99;
    ob.dy *= 0.975;
  }
}

function draw() {
  // draw function
  currentTime = new Date().getTime();
  dt = (currentTime - lastTime) / 1000; // delta time in seconds

  // dirty and lazy solution
  // instead of scaling up every velocity vector the program
  // we increase the speed of time
  dt *= 50;

  if (clearCanv) clearCanvas();
  canvasBackground();

  drawObjects();

  moveObjects();

  ballCollision();

  // applyGravity();
  //logger();

  lastTime = currentTime;
  window.requestAnimationFrame(draw);
}


for (let i = 0; i < countOfBalls; i++) {
  if (i == 0) {
    ballArray[i] = new Ball(xCoordinate(), yCoordinate() );
  } else ballArray[i] = new Ball(xCoordinate(), yCoordinate());
}

draw();
