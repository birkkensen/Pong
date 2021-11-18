import StartScene from "./StartScene.js";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [StartScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
    },
  },
};

new Phaser.Game(config);
