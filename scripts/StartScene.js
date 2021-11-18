import Pong from "./Pong.js";
let text, center, onePlayer, twoPlayers;
class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }
  create() {
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };
    text = this.add.text(
      center.x,
      center.y,
      "Welcome to Pong, play with a friend of or against the computer",
      {
        fontFamily: "Arial",
        fontSize: 24,
      }
    );
    text.setOrigin(0.5);

    this.input.once(
      "pointerdown",
      function () {
        this.scene.add("Pong", Pong, true, { x: 400, y: 300 });
        this.scene.remove("StartScene");
      },
      this
    );
  }
}
export default StartScene;
