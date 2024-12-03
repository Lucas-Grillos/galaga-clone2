const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");

class Player {
    constructor() {
        this.hitbox = {
            height: 40,
            width: 30
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
    
}

const player = new Player();

window.onload = animate();
