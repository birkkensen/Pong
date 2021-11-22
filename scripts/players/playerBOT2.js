import Player from "./player.js";

export default class PlayerBOT2 extends Player {
    targetPosition = {x:0, y: 0};

    update() {
        const {controls, sprite, targetPosition} = this;
        const ball = this.gameContext.ball;

        if (ball.body.velocity.x < 0) {
            // only move when coming towards player
            return;
        }
        const offset = 2;

        const distance = targetPosition.y - sprite.y;
        const maxSpeed = 400;
        let speed = distance * 3;
        speed = Math.max(-maxSpeed, Math.min(maxSpeed, speed));

        if (targetPosition.y > (sprite.y + offset)) {
            sprite.setVelocityY(speed);
        } else if (targetPosition.y < (sprite.y - offset)) {
            sprite.setVelocityY(speed);
        } else {
            //paddleRight.setVelocityY(0);
            sprite.setVelocityY(0);
        }
    }

    onReset() {
        this.targetPosition = this.trace();      
    }

    onBounce() {
        
    }

    onTrajectoryChange() {
        console.log("onTrajectoryChange");
        this.targetPosition = this.trace();

        // const graphics = this.gameContext.graphics;
        // graphics.clear();
        // graphics.lineStyle(4, 0x00ff00, .5);
        // graphics.beginPath();
        // graphics.moveTo(100, 100);
        // graphics.lineTo(200, 200);
        // graphics.lineTo(400, 200);
        // // graphics.closePath();
        // graphics.strokePath();
    }

    // Hacky trajectory trace including Y bounces
    trace() {
        const graphics = this.gameContext.graphics
        graphics.clear();
        graphics.lineStyle(4, 0x00ff00, .2);
        graphics.beginPath();

        const ball = this.gameContext.ball;
        const size = {
            width: 800,
            height: 500,
        }

        // lenght to right paddel
        const rightLimit = size.width - 60;

        let posTest = {
            x: ball.x,
            y: ball.y,
        }
        let posLineLastStart = {
            x: posTest.x,
            y: posTest.y,
        }
        graphics.moveTo(posLineLastStart.x, posLineLastStart.y);
        const velocity = {
            x: ball.body.velocity.x,
            y: ball.body.velocity.y,
        };

        if(velocity.x < 0) { 
            // only trace balls going towards player
            return posTest;
        }

        let endFound = false;

        let loops = 0;
        let bounces = 0;
        let initialTraceUp = velocity.y < 0;
        let invertTraceDir = false;
        

        // try to limit to one bounce per frame
        const bounceDelay = 100;
        let bounceCountdown = bounceDelay;
        while(!endFound) {
            loops++;

            // check if Test Position has reached bounds
            if(posTest.x > (rightLimit)) {
                endFound = true;
                console.log(`Found! with ${loops} loops & ${bounces} bounces at ${posTest.y}`);
                //graphics.lineBetween(posLineLastStart.x, posLineLastStart.y, posTest.x, posTest.y);
                graphics.lineTo(posTest.x, posTest.y);
                graphics.strokePath();
                return posTest;
            }

            if(bounceCountdown > 0) {
                bounceCountdown--;
            }
            const willBounceUp = posTest.y <= 0;
            const willBounceDown = posTest.y > (size.height - 10);
            if(willBounceUp) {
                invertTraceDir = initialTraceUp;
                bounces++;
            }
            if(willBounceDown) {
                invertTraceDir = !initialTraceUp;
                bounces++;
            }
            if(willBounceUp || willBounceDown) {
                //graphics.lineBetween(posLineLastStart.x, posLineLastStart.y, posTest.x, posTest.y);
                graphics.lineTo(posTest.x, posTest.y);
                posLineLastStart = posTest;
            }
        
            // x dir is constant
            posTest.x += 1;
            let addVelY = (velocity.y / velocity.x);
            // invert after bounces
            if(invertTraceDir) {
                posTest.y -= addVelY;
            }
            else {
                posTest.y += addVelY;
            }
            
        }
        graphics.strokePath();
        return posTest;
    }
}