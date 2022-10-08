// Ratnesh commit
//ARCHAS COMMIT 
//commit 2

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backgroundImage = new Image();
backgroundImage.src = "images/background/backgroundSprite.png"

let backgroundImageOver = new Image();
backgroundImageOver.src = "images/background/backgroundSprite-removebg.png"

function background() {
    ctx.drawImage(backgroundImage, 10, 8, 419, 224, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 205, 255, 672, 33, 0, 570, canvas.width, canvas.height-570);
    ctx.drawImage(backgroundImageOver, 18, 340, 672, 200, 0, 0, canvas.width, 580);
}

function animate() {
    background();
    requestAnimationFrame(animate);
}

animate();

