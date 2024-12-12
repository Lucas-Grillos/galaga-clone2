const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");

SHIP_VEL = 1;
SHIP_DIAG_VEL = 0.75;

const MOVE_KEYS = {
    w: false,
    a: false,
    s: false, 
    d: false
}

class Player {
    constructor() {
        this.hitbox = {
            height: 40,
            width: 30
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.position = {
            x: (canvas.width / 2) - (this.hitbox.width / 2),
            y: 500
        }

        this.horizontalRect = {
            width: 30,
            height: 10
        }

        this.verticalRect = {
            width: 10,
            height: 40
        }
    }

    setVelocity() {
        if (MOVE_KEYS["w"]===true && MOVE_KEYS["s"]!== true) {
            this.velocity.y = -SHIP_VEL;
        } 
        else if (MOVE_KEYS["w"]!==true && MOVE_KEYS["s"]!==true) {
            this.velocity.y = 0;
        } 
        
        if (MOVE_KEYS["a"]===true && MOVE_KEYS["d"]!==true) {
            this.velocity.x = -SHIP_VEL;
        } else  if(MOVE_KEYS["a"]!==true && MOVE_KEYS["d"]!==true) {
            this.velocity.x = 0;
        }
        
        if (MOVE_KEYS["s"]===true && MOVE_KEYS["w"]!==true) {
            this.velocity.y = SHIP_VEL;
        } else if (MOVE_KEYS["s"]!==true && MOVE_KEYS["w"]!== true){
            this.velocity.y = 0;
        } 
        
        if (MOVE_KEYS["d"]===true && MOVE_KEYS["a"]!==true) {
            this.velocity.x = 1;
        } else if(MOVE_KEYS["d"]!==true && MOVE_KEYS["a"]!==true) {
            this.velocity.x = 0;
        }
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y
    }

    draw() {
        ctx.strokeStyle = "white";
        // hitbox
        ctx.strokeRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height)

        ctx.fillStyle = "red";
        // horizontal rect
        ctx.fillRect(this.position.x, (this.position.y + this.hitbox.height - this.horizontalRect.height), 
            this.horizontalRect.width, this.horizontalRect.height)
        // vertical rect
        ctx.fillRect(this.position.x + this.hitbox.width/2 - this.verticalRect.width/2, this.position.y, 
            this.verticalRect.width, this.verticalRect.height)
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw()
    player.setVelocity()
    player.move();
}

const player = new Player();

const keyDown = (event) => {
    //console.log(event.key);
    if (event.key in MOVE_KEYS) {
        //console.log(true);
        velocityOnOff(event.key, true);
    }
}

const keyUp = (event) => {
    if (event.key in MOVE_KEYS) {
        velocityOnOff(event.key, false);
    }
}

const velocityOnOff = (key, bool) => {
    MOVE_KEYS[key] = bool;
    //console.log(MOVE_KEYS[key])
}

window.onload = animate();
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
