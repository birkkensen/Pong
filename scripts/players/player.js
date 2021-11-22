class Player {

    // === VARIABLES ===
    gameContext = null;
    sprite = Object;
    controls = null;

    // bot 2 variables
    targetPosition = Object;

    constructor(gameContext, sprite, controls, scale = [1, 1]) {
        // add ref to context of phaser so we can access it later
        this.gameContext = gameContext;

        this.sprite = sprite;
        // attach this as context so we can access .onBounce from sprite
        this.sprite.playerContext = this;
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setImmovable(true);
        this.controls = controls;

        this.sprite.setScale(scale[0], scale[1]);
    }

    update() { }
    onReset() {}
    onBounce() {}
    onTrajectoryChange() {}
}
export default Player;