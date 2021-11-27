// import { Player } from "./players/index.js";
import { Player, PlayerManual, PlayerBOT1, PlayerBOT2 } from "./players/index.js";

class Pong extends Phaser.Scene {
  // world
  graphics = Object;
  text = Object;
  center = Object;

  // objects
  ball = Object;
  player1 = Player;
  player2 = Player;

  // game variables
  player1Points = 0;
  player2Points = 0;
  speedBall = 300;
  speedPlayer1 = 300;
  speedPlayer2 = 300;

  // startign speed and direction
  speedDirection = [-this.speedBall, this.speedBall];
  speed = this.speedDirection[Math.floor(Math.random() * this.speedDirection.length)];

  constructor() {
    super({
      key: "Pong",
    });
  }

  // Preload assets and images
  preload() {
    this.load.image("ball", "./images/ball.png");
    this.load.image("player", "./images/player.png");
    this.load.image("line", "./images/line.png");
  }

  // construct game world
  create() {
    this.graphics = this.add.graphics();

    // Center
    this.center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    // Text
    this.text = this.add.text(this.center.x, 50, this.player1Points + "   " + this.player2Points, {
      fontFamily: "Arial",
      fontSize: 50,
    });
    this.text.setOrigin(0.5);

    // Middle line
    let image = this.add.image(this.center.x, this.center.y, "line");
    image.setOrigin(0.5);

    // === CREATE OBJECTS ===

    // Create Ball
    this.ball = this.physics.add.sprite(this.center.x, this.center.y, "ball");
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocityX(this.speed);

    // Create Player 1
    const player1Sprite = this.physics.add.sprite(50, this.center.y, "player");
    const player1Controls = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
    });
    this.player1 = new PlayerBOT1(this, player1Sprite, player1Controls, [1, 1.5]);
    this.player1.create();
    // / Create Player 2
    const player2Sprite = this.physics.add.sprite(this.center.x * 2 - 50, this.center.y, "player");
    const player2Controls = this.input.keyboard.createCursorKeys();
    this.player2 = new PlayerBOT2(this, player2Sprite, player2Controls, [1, 0.5]);

    // Set colliders
    this.physics.add.collider(this.ball, this.player1.sprite, this.onBounce, null, this);
    this.physics.add.collider(this.ball, this.player2.sprite, this.onBounce, null, this);

    // Remove the collision on the left and right
    this.physics.world.checkCollision.left = false;
    this.physics.world.checkCollision.right = false;

    this.resetGame();
  }

  // called each frame
  update() {
    // Points
    this.checkIfPoint();

    // call updates for each object that contains logic
    this.player1.update();
    this.player2.update();
  }

  // Reset the game and update score
  resetGame() {
    const { text, ball, speedDirection, center } = this;

    text.setText(this.player1Points + "   " + this.player2Points);
    ball.setVelocity(this.speed, this.speed);
    ball.setPosition(center.x, Math.floor(Math.random() * center.y));

    this.speed = speedDirection[Math.floor(Math.random() * speedDirection.length)];

    // call updates for each object that contains logic
    this.player1.onReset();
    this.player2.onReset();
    console.log(this.player2);
  }

  // Points counter
  checkIfPoint() {
    const { center, ball } = this;

    if (ball.x < 0) {
      this.player2Points++;
      this.resetGame();
    } else if (ball.x > center.x * 2) {
      this.player1Points++;
      this.resetGame();
    }
  }

  // Bounce on the paddle
  onBounce(ball, playerSprite) {
    // random dir change?
    //console.log(player);
    // if (ball.body.velocity.x < 200) {
    //     if (ball.body.velocity.x < 0) {
    //         ball.setVelocityX(-600);
    //     } else {
    //         ball.setVelocityX(600);
    //     }
    // }
    if (ball.y < playerSprite.y) {
      ball.setVelocityY(ball.body.velocity.y - 70);
    } else {
      ball.setVelocityY(ball.body.velocity.y + 70);
    }
    // call optional onBounce event
    playerSprite.playerContext.onBounce();

    // if players want to know changes in trajectory, ex bot2 that wants to trace
    this.player1.onTrajectoryChange();
    this.player2.onTrajectoryChange();
  }
}

export default Pong;
