import Player from "./player.js";

export default class PlayerBOT1 extends Player {
    update() {
        const {gameContext, sprite} = this;
        if (gameContext.ball.x < gameContext.center.x) {
            if (gameContext.ball.y > sprite.y) {
                sprite.setVelocityY(400);
            } else if (gameContext.ball.y < sprite.y) {
                sprite.setVelocityY(-400);
            }
        } else {
            sprite.setVelocityY(0);
        }
    }
}