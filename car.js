class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = 0;

        this.controls = new Controls();
        this.sensor = new Sensor(this);
    }

    update(roadBorders) {
        this.#move();
        this.sensor.update(roadBorders);
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }

        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed
        }

        // reverse speed
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2
        }

        // FRICTION slows speed
        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        //backward friction will be + sign
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // don't turn a car when it's not moving
        if (this.speed !== 0) {
            // flip controls when going reverse
            const flip = this.speed > 0 ? 1 : -1
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }

            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        const sin = Math.sin(this.angle);
        const cos = Math.cos(this.angle);

        this.x -= sin * this.speed;
        this.y -= cos * this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }
}
