const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");

SHIP_VEL = 2;
SHIP_DIAG_VEL = 1.5;

const MOVE_KEYS = {
    w: false,
    a: false,
    s: false, 
    d: false
}

const FIRE_KEY = " ";

class Player_Bullet {
    constructor() {

        this.velocity=7;
        this.hitbox = {
            height: 12,
            width: 5
        }

        this.position = {
            x: player.position.x + (player.hitbox.width / 2) - (this.hitbox.width/2),
            y: player.position.y
        }
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
    }

    move() {
        this.position.y-=this.velocity;
        if (this.position.y < -50) {
            cleanBullets()
        }
    }
    // CanvasRect.fillRect(x: number, y: number, w: number, h: number): void

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
        /* w 'up' movement */
        if (MOVE_KEYS["w"] && !MOVE_KEYS["s"]) {
            if (MOVE_KEYS["a"] || MOVE_KEYS["d"]) {
                this.velocity.y = -SHIP_DIAG_VEL
            } else {
                this.velocity.y = -SHIP_VEL;
            }
        } 
        else if (!MOVE_KEYS["w"] && !MOVE_KEYS["s"]) {
            this.velocity.y = 0;
        } 
        
        /* a 'left' movement */
        if (MOVE_KEYS["a"] && !MOVE_KEYS["d"]) {
            if (MOVE_KEYS["w"] || MOVE_KEYS["s"]) {
                this.velocity.x = -SHIP_DIAG_VEL;
            } else {
            this.velocity.x = -SHIP_VEL;
            }
        } else  if(!MOVE_KEYS["a"] && !MOVE_KEYS["d"]) {
            this.velocity.x = 0;
        }
        
        /* s 'down' movement */
        if (MOVE_KEYS["s"] && !MOVE_KEYS["w"]) {
            if (MOVE_KEYS["a"] || MOVE_KEYS["d"]) {
                this.velocity.y = SHIP_DIAG_VEL;
            } else {
                this.velocity.y = SHIP_VEL;
            }
        } else if (!MOVE_KEYS["s"] && !MOVE_KEYS["w"]){
            this.velocity.y = 0;
        } 
        
        /* d 'right' movement */
        if (MOVE_KEYS["d"] && !MOVE_KEYS["a"]) { 
            if (MOVE_KEYS["w"] || MOVE_KEYS["s"]) {
                this.velocity.x = SHIP_DIAG_VEL;
            } else {
                this.velocity.x = SHIP_VEL;
            }
        } else if(!MOVE_KEYS["d"] && !MOVE_KEYS["a"]) {
            this.velocity.x = 0;
        }
    }

    checkWallCollisions() {
        if (this.position.x < 0) {
            this.velocity.x = 0;
            this.position.x = 0;
        }

        if (this.position.x + this.hitbox.width > canvas.width) {
            this.velocity.x = 0;
            this.position.x = canvas.width-this.hitbox.width;
        }

        if (this.position.y < 0) {
            this.velocity.y = 0;
            this.position.y = 0;
        }

        if (this.position.y + this.hitbox.height > canvas.height) {
            this.velocity.y = 0;
            this.position.y = canvas.height - this.hitbox.height;
        }
    }

    move() {
        this.checkWallCollisions()
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
    /*
    setTimeout(() => {
        requestAnimationFrame(animate);  
    }, 1000 / 144)
    */
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw()
    player.setVelocity()
    player.move();

    bullets.forEach(bullet => bullet.draw());
    bullets.forEach(bullet => bullet.move());
}

const player = new Player();
let bullets = [];

const cleanBullets = () => {
    bullets = bullets.filter(bullet => {
        if (bullet.position.y > 0) {
            return bullet;
        } 
    })
}

const keyDown = (event) => {
    //console.log(event.key);
    if (event.key in MOVE_KEYS) {
        //console.log(true);
        velocityOnOff(event.key, true);
    }
    if (event.key == FIRE_KEY) {
        console.log("hello!")
        const bullet = new Player_Bullet();
        bullets.push(bullet);
    }

    //test key
    if (event.key=="q") {
        console.log(bullets);
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
