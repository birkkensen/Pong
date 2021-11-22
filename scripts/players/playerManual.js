import Player from "./player.js";

export default class PlayerManual extends Player {
    update() {
        const {controls, sprite} = this;


        if (controls.up.isDown) {
            sprite.setVelocityY(-500);
        } else if (controls.down.isDown) {
            sprite.setVelocityY(500);
        } else {
            sprite.setVelocityY(0);
        }
    }
}