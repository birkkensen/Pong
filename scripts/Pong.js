let text, center, ball, paddleLeft, paddleRight, paddleLeftControls, paddleRightControls;
let startGame = false;
let paddleLeftPoints = 0;
let paddleRightPoints = 0;
// startign speed and direction
const speedDirection = [-200, 200];
let speed = speedDirection[Math.floor(Math.random() * speedDirection.length)];

class Pong extends Phaser.Scene {
  constructor() {
    super({ key: "Pong" });
  }

  preload() {
    // Preload the images
    this.load.image("ball", "./images/ball.png");
    this.load.image("player", "./images/player.png");
    this.load.image("line", "./images/line.png");
  }
  create() {
    // Center
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    // Place the objects
    ball = this.physics.add.sprite(center.x, center.y, "ball");
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);
    ball.setVelocityX(speed);
    // Text
    text = this.add.text(center.x, 50, paddleLeftPoints + "   " + paddleRightPoints, {
      fontFamily: "Arial",
      fontSize: 50,
    });
    text.setOrigin(0.5);

    // Middle line
    let image = this.add.image(center.x, center.y, "line");
    image.setOrigin(0.5);

    // Right paddle
    paddleRight = this.physics.add.sprite(center.x * 2 - 50, center.y, "player");
    paddleRight.setCollideWorldBounds(true);
    paddleRight.setImmovable(true);
    paddleRightControls = this.input.keyboard.createCursorKeys();

    // Left paddle
    paddleLeft = this.physics.add.sprite(50, center.y, "player");
    paddleLeft.setCollideWorldBounds(true);
    paddleLeft.setImmovable(true);
    paddleLeftControls = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });

    // Scale the player
    paddleLeft.setScale(1, 1.5);
    paddleRight.setScale(1, 1.5);

    // Remove the collision on the left and right
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;
  }
  update() {
    // if (paddleRightControls.space.isDown) {
    //   // startGame = true;

    // }
    // if (startGame) {
    // Set colliders
    this.physics.add.collider(ball, paddleLeft, bounce, null, this);
    this.physics.add.collider(ball, paddleRight, bounce, null, this);
    // Points
    checkIfPoint();

    // Controls for the right paddle
    if (paddleRightControls.up.isDown) {
      paddleRight.setVelocityY(-500);
    } else if (paddleRightControls.down.isDown) {
      paddleRight.setVelocityY(500);
    } else {
      paddleRight.setVelocityY(0);
    }
    computerPlayer();
    // // Controls for the left paddle
    // if (paddleLeftControls.up.isDown) {
    //   paddleLeft.setVelocityY(-500);
    // } else if (paddleLeftControls.down.isDown) {
    //   paddleLeft.setVelocityY(500);
    // } else {
    //   paddleLeft.setVelocityY(0);
    // }
  }
}
// }

export default Pong;

// Bounce on the paddle
function bounce(ball, player) {
  if (ball.body.velocity.x < 200) {
    if (ball.body.velocity.x < 0) {
      ball.setVelocityX(-600);
    } else {
      ball.setVelocityX(600);
    }
  }
  console.log("Ball: ", ball.y);
  console.log("Player: ", player.y);
  if (ball.y < player.y) {
    ball.setVelocityY(ball.body.velocity.y - 70);
  } else {
    ball.setVelocityY(ball.body.velocity.y + 70);
  }
}

// Points counter
function checkIfPoint() {
  if (ball.x < 0) {
    paddleRightPoints++;
    resetGame();
  } else if (ball.x > center.x * 2) {
    paddleLeftPoints++;
    resetGame();
  }
}
// Reset the game and update score
function resetGame() {
  startGame = false;
  text.setText(paddleLeftPoints + "   " + paddleRightPoints);
  ball.setVelocity(speed, speed);
  ball.setPosition(center.x, Math.floor(Math.random() * center.y));
  // Set timeout to reset the paddles
  // setTimeout(() => {
  //   paddleLeft.setPosition(50, center.y);
  //   paddleRight.setPosition(center.x * 2 - 50, center.y);
  // }, 200);

  speed = speedDirection[Math.floor(Math.random() * speedDirection.length)];
}

function computerPlayer() {
  if (ball.x < center.x) {
    if (ball.y > paddleLeft.y) {
      paddleLeft.setVelocityY(400);
    } else if (ball.y < paddleLeft.y) {
      paddleLeft.setVelocityY(-400);
    }
  } else {
    paddleLeft.setVelocityY(0);
  }
}
