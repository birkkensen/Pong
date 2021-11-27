import Player from "./player.js";

export default class PlayerBOT1 extends Player {
  create() {
    this.ghostExists = false;
    this.hasBounced = false;
    this.firstBall = true;
    this.cpuTracking = 0;
    this.cpuTrackArr = [];
    this.ghostBallMultiplier = 3;
    this.ball = this.gameContext.ball;
    this.ghost();
  }
  update() {
    const { gameContext, sprite } = this;
    this.ghost();
    if (this.ball.body.velocity.x > 0) {
      return;
    }
    const maxSpeed = 400;
    const distance = this.cpuTracking - sprite.y;
    let speed = distance * 4;
    speed = Math.max(-maxSpeed, Math.min(maxSpeed, speed));
    if (this.cpuTracking >= sprite.y + 2) {
      sprite.setVelocityY(speed);
    } else if (this.cpuTracking <= sprite.y - 2) {
      sprite.setVelocityY(speed);
    } else {
      sprite.setVelocityY(0);
    }
  }

  onBounce() {}
  onTrajectoryChange() {
    this.hasBounced = true;
    this.firstBallBounce = false;
  }
  onReset() {
    this.firstBall = true;
    this.firstBallBounce = true;
  }

  ghost() {
    if (this.ball.body.velocity.x > 0) {
      return;
    }
    // Extra whacky
    // if (!this.ghostExists || this.firstBall) {
    if ((!this.ghostExists && this.hasBounced) || this.firstBall) {
      this.createGhostBall();
      this.ghostExists = true;
      this.hasBounced = false;
      this.firstBall = false;
    }
    if (this.ghostExists) {
      if (this.ghostBall.x < 0 || this.ghostBall.x > this.gameContext.physics.world.bounds.width) {
        this.ghostBall.destroy();
        this.ghostExists = false;
        return;
      }
      if (this.ghostBall.x <= 100 && this.ghostBall.x >= 50) {
        this.cpuTrackArr.push(this.ghostBall.y);
        let closest = this.cpuTrackArr.reduce((prev, curr) => {
          return Math.abs(curr - 70) < Math.abs(prev - 70) ? curr : prev;
        });
        this.cpuTracking = closest;
        this.cpuTrackArr = [];
      }
    }
  }
  createGhostBall() {
    this.ghostBall = this.gameContext.physics.add.sprite(this.ball.x, this.ball.y, "ball");
    this.ghostBall.setBounce(1);
    this.ghostBall.setCollideWorldBounds(true);
    this.ghostBall.setVelocity(
      this.ball.body.velocity.x * this.ghostBallMultiplier,
      this.ball.body.velocity.y * this.ghostBallMultiplier
    );
    this.ghostBall.alpha = 0.5;
  }
}
