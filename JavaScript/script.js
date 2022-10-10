// Ratnesh commit
//ARCHAS COMMIT 
//commit 2

const BGcanvas = document.getElementById('myCanvas');
const BGctx = BGcanvas.getContext('2d');
// BGctx.scale(-1,1);
BGcanvas.width = window.innerWidth;
BGcanvas.height = window.innerHeight;
// let speed = 10, leftlocation = 150;
// let toplocation = 380;
let prevposition = 0;
let prevposition2 = 0;
let position;
let position2;

let x = 0;
let y = 0;
let velocityX = 150; //should be same as initial position of player for smooth start
let velocityY = 380;
let velocityX2 = 1000; //should be same as initial position of player for smooth start
let velocityY2 = 380;
let gravity = 380;
let canJump = true;
let canJump2 = true;
let maxSpeed = 2;
let keysPressed = [];


// Temporary variable for player one health
let playerOne = {
    health: 100,
    healthBar: document.getElementById('health-one')
}

let playerTwo = {
    health: 100,
    healthBar: document.getElementById('health-two')
}

// Timer

function startTimer() {
    let timer = document.getElementById('timer');
    let time = 3;
    const prevtimeInterval = setInterval(function () {
        timer.innerText = time;
        time--;
        if (time === -1) {
            clearInterval(prevtimeInterval);
            time = 60;
            timer.innerText = "Start";
            setInterval(function () {
                time = Math.max(time, 0);
                timer.innerText = time;
                time--;
                if (time === -1) {
                    clearInterval(prevtimeInterval);
                }
            }, 1000);
        }
    }, 1000);
    console.log("Match ended");
}
startTimer();




// Event Listeners
window.addEventListener('keydown', function (event) {
    switch (event.key.toLocaleLowerCase()) {
        case 'w':
            keysPressed[event.key] = true;
            break;
        case 'a':
            keysPressed[event.key] = true;
            break;
        case 's':
            keysPressed[event.key] = true;
            break;
        case 'd':
            keysPressed[event.key] = true;
            break;
        case 'z':
            playerState = "kick";
            break;
        case 'x':
            // Event
            playerState = "punch"
            break;
        case 'j':
            // Event
            playerState2 = "forward";
            keysPressed[event.key] = true;
            break;
        case 'l':
            // Event
            playerState2 = "backward";
            keysPressed[event.key] = true;
            break;
        case 'i':
            // Event
            playerState2 = "jump";
            keysPressed[event.key] = true;
            break;
        case 'k':
            // Event
            playerState2 = "crouch";
            keysPressed[event.key] = true;
            break;
        case 'n':
            // Event
            playerState = "gethit";
            playerOne.health -= 10;
            playerOne.healthBar.style.width = playerOne.health + '%';
            if (playerOne.health <= 0)
                playerState = "ko";
            break;
        case 'm':
            // Event
            playerTwo.health -= 10;
            playerTwo.healthBar.style.width = playerTwo.health + '%';
            playerTwo.healthBar.style.marginLeft = 100 - playerTwo.health + '%';
            break;
    }
})

window.addEventListener('keyup', function (event) {
    playerState = "idle";
    playerState2 = "idle";
    keysPressed[event.key] = false;
    // if (toplocation != 380) {
    //     toplocation = 380;
    //     canvas.style.top = toplocation + "px";
    // }
})

let backgroundImage = new Image();
backgroundImage.src = "images/background/backgroundSprite.png"

let backgroundImageOver = new Image();
backgroundImageOver.src = "images/background/backgroundSprite-removebg.png"

function background() {
    // BGctx.scale(-1,1);
    // BGctx.rotate(45 * Math.PI / 180);
    BGctx.drawImage(backgroundImage, 10, 8, 419, 224, 0, 0, BGcanvas.width, BGcanvas.height);
    BGctx.drawImage(backgroundImage, 205, 255, 672, 33, 0, 570, BGcanvas.width, BGcanvas.height - 570);
    BGctx.drawImage(backgroundImageOver, 18, 340, 672, 200, 0, 0, BGcanvas.width, 580);

}

let playerState = 'intro';
let playerState2 = 'intro';
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const CANVAS_WIDTH = canvas.width = canvas2.width = 250;
const CANVAS_HEIGHT = canvas.height = canvas2.height = 350;
const playerImage = new Image();
playerImage.src = 'images/Ryu.gif';
let spriteWidth = 62;
let spriteHeight = 115;
let spriteWidth2 = 62;
let spriteHeight2 = 115;
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'intro',
        frames: 12,
        framexposition: [18, 92, 167, 246, 322, 322, 391, 391, 466, 466, 536, 536],
        frameswidth: [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69],
        framesheight: [110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110],
        frameyposition: 0,
    },
    {
        name: 'idle',
        frames: 6,
        framexposition: [109, 189, 269, 349, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 1,
    },
    {

        name: 'forward',
        frames: 6,
        framexposition: [63, 144, 226, 307, 376, 453],
        frameswidth: [70, 70, 70, 70, 70, 70],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 2 - 8,
    },
    {
        name: 'backward',
        frames: 6,
        framexposition: [64, 140, 219, 292, 368, 455],
        frameswidth: [70, 70, 70, 70, 70, 70],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 3 - 8,
    },
    {
        name: 'jump',
        frames: 7,
        framexposition: [36, 109, 189, 269, 349, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 4,
    },
    {
        name: 'punch',
        frames: 6,
        framexposition: [25, 106, 189, 309, 402, 517, 504],
        frameswidth: [80, 80, 108, 80, 108, 80, 80],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 7 + 5,
    },
    {
        name: 'kick',
        frames: 6,
        framexposition: [5, 96, 175, 269, 342, 455, 535],
        frameswidth: [73, 73, 90, 73, 101, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 8,
    },
    {
        name: 'crouch',
        frames: 4,
        framexposition: [8, 8, 88, 88, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [100, 100, 100, 100, 100, 100],
        frameyposition: spriteHeight * 5,
    },
    {
        name: 'gethit',
        frames: 3,
        framexposition: [222, 309, 398, 88, 425, 504],
        frameswidth: [73, 73, 73, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 21,
    },
    {
        name: 'ko',
        frames: 3,
        framexposition: [25, 156, 293, 88, 425, 504],
        frameswidth: [130, 130, 130, 73, 73, 73],
        framesheight: [110, 110, 110, 110, 110, 110],
        frameyposition: spriteHeight * 23,
    }
];

function drawCharacter() {
    animationStates.forEach((state, index) => {
        let frames = {
            loc: [],
        }
        for (let j = 0; j < state.frames; j++) {
            let positionx = state.framexposition[j];
            let positiony = state.frameyposition;
            frames.loc.push({ x: positionx, y: positiony, framewidth: state.frameswidth[j], frameheight: state.framesheight[j] });
        }
        spriteAnimations[state.name] = frames;
    });
    update();

}
drawCharacter();

// console.log(spriteAnimations);
// console.log(animationStates);


function update() {
    
    if (keysPressed['z']) {
        
            playerState = "kick";
            // velocityX += 30;
            // velocityX = Math.min(velocityX, 
              if(velocityX> velocityX2- CANVAS_WIDTH) {//|| velocityX< velocityX2- CANVAS_WIDTH/2);
              playerTwo.health -= 10;
              playerState2="gethit";
            playerTwo.healthBar.style.width = playerTwo.health + '%';
            playerTwo.healthBar.style.marginLeft = 100 - playerTwo.health + '%';
            
                
            }
            canvas.style.left = velocityX + 'px';
        

    }
    
    

    if (keysPressed['d']) {
        if (!keysPressed['s']) {
            playerState = "forward";
            velocityX += 30;
            velocityX = Math.min(velocityX, velocityX2 - CANVAS_WIDTH / 2);
            canvas.style.left = velocityX + 'px';
        }

    }
    if (keysPressed['a']) {
        if (!keysPressed['s']) {
            playerState = "backward";
            velocityX -= 30;
            velocityX = Math.max(velocityX, 0);
            canvas.style.left = velocityX + 'px';
        }

    }
    if (keysPressed['w']) {
        playerState = "jump";
        if (canJump) {
            canJump = false;
            let jumpUp = setInterval(function () {
                if (velocityY < 320) {
                    clearInterval(jumpUp)
                    let jumpDown = setInterval(function () {
                        if (velocityY >= 370) {
                            clearInterval(jumpDown);
                            canJump = true;
                        }
                        velocityY += 10;
                        canvas.style.top = velocityY + 'px';
                    }, 30)
                }
                velocityY -= 20;
                canvas.style.top = velocityY + 'px';
            }, 40)
        }
    }
    if (keysPressed['s']) {
        playerState = "crouch";
        keysPressed['d'] = false;
        keysPressed['a'] = false;

    }
    if (keysPressed['l']) {
        if (!keysPressed['k']) {
            playerState2 = "backward";
            velocityX2 += 30;
            velocityX2 = Math.min(velocityX2, BGcanvas.width - 300);
            canvas2.style.left = velocityX2 + 'px';
        }

    }
    if (keysPressed['j']) {
        if (!keysPressed['k']) {
            playerState2 = "forward";
            velocityX2 -= 30;
            velocityX2 = Math.max(velocityX2, velocityX + CANVAS_WIDTH / 2);
            canvas2.style.left = velocityX2 + 'px';
        }

    }
    if (keysPressed['i']) {
        playerState2 = "jump";
        if (canJump2) {
            canJump2 = false;
            let jumpUp2 = setInterval(function () {
                if (velocityY2 < 320) {
                    clearInterval(jumpUp2)
                    let jumpDown2 = setInterval(function () {
                        if (velocityY2 >= 370) {
                            clearInterval(jumpDown2);
                            canJump2 = true;
                        }
                        velocityY2 += 10;
                        canvas2.style.top = velocityY2 + 'px';
                    }, 30)
                }
                velocityY2 -= 20;
                canvas2.style.top = velocityY2 + 'px';
            }, 40)
        }
    }
    if (keysPressed['k']) {
        playerState2 = "crouch";
        keysPressed['l'] = false;
        keysPressed['j'] = false;

    }
    console.log(canvas2.style.left);

}

function animate() {

    if (playerState == "gethit" || playerState == "ko") {
        canvas.style.transform = "scale(-1,1)";
    }
    else
        canvas.style.transform = "scale(1,1)";
    if (playerState == "ko" || playerOne.health <= 0)
        cancelAnimationFrame(animater);
    prevposition = position;
    prevposition2 = position2;
    position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    position2 = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState2].loc.length;
    // let framex = spacebeginning +(spriteWidth+spacebetween) * position;
    if (prevposition != position || prevposition2 != position2) {
        let framey = spriteAnimations[playerState].loc[position].y;
        let framex = spriteAnimations[playerState].loc[position].x;
        spriteWidth = spriteAnimations[playerState].loc[position].framewidth;
        spriteHeight = spriteAnimations[playerState].loc[position].frameheight;
        let framey2 = spriteAnimations[playerState2].loc[position2].y;
        let framex2 = spriteAnimations[playerState2].loc[position2].x;
        spriteWidth2 = spriteAnimations[playerState2].loc[position2].framewidth;
        spriteHeight2 = spriteAnimations[playerState2].loc[position2].frameheight;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background();
        // ctx.drawImage(playerImage, framex, framey, spriteWidth, spriteHeight, 50, 50, spriteWidth*2.75, spriteHeight*2.75);
        ctx.drawImage(playerImage, framex, framey, spriteWidth, spriteHeight, 50, 50, CANVAS_WIDTH - 50, CANVAS_HEIGHT - 50);
        ctx2.drawImage(playerImage, framex2, framey2, spriteWidth2, spriteHeight2, 50, 50, CANVAS_WIDTH - 50, CANVAS_HEIGHT - 50);
        canvas2.style.transform = "scale(-1,1)";
        update();
    }
    gameFrame++;
    let animater = requestAnimationFrame(animate);
};
animate();
