const canvas = document.getElementById('myCanvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * .9);

// put car in a 0 (left) lane
const xCarPosition = road.getLaneCenter(4);
const car = new Car(xCarPosition, 100, 30, 50);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}